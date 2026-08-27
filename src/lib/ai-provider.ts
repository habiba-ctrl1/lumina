// Provider-agnostic AI chat abstraction. Callers (e.g. /api/admin/copilot)
// never import a specific vendor SDK — they only call getAIReply(). Switch
// providers by changing AI_PROVIDER in .env, no code changes required.
//
// Supported: anthropic, openai, gemini. Each vendor SDK is loaded via a
// dynamic import so only the provider actually selected is touched at
// runtime, and this file stays the single place that knows these SDKs exist.

// Type-only import — erased at compile time, does not force-load the SDK
// at runtime. The actual runtime import happens inside callAnthropic().
import type Anthropic from "@anthropic-ai/sdk";

export type ChatRole = "user" | "assistant";
export type ChatMsg = { role: ChatRole; content: string };

export class AIProviderError extends Error {}

type ProviderName = "anthropic" | "openai" | "gemini";

const PROVIDER_KEY_ENV: Record<ProviderName, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
};

// Fallback model ids used only when AI_MODEL is not set. These are best-effort
// defaults, not guarantees — if a provider changes/retires a model name,
// override it via AI_MODEL rather than editing this file.
const DEFAULT_MODELS: Record<ProviderName, string> = {
  anthropic: "claude-sonnet-5",
  openai: "gpt-4.1",
  gemini: "gemini-2.5-pro",
};

// Read an env var with surrounding whitespace stripped. Dashboard-pasted
// values (Vercel, etc.) very commonly carry a stray trailing space or newline,
// which would otherwise break exact-match comparisons and API auth.
function envTrimmed(name: string): string {
  return (process.env[name] || "").trim();
}

function getProviderName(): ProviderName {
  const raw = (envTrimmed("AI_PROVIDER") || "anthropic").toLowerCase();
  if (raw === "anthropic" || raw === "openai" || raw === "gemini") return raw;
  throw new AIProviderError(
    `Unknown AI_PROVIDER "${raw}" — expected "anthropic", "openai", or "gemini"`
  );
}

/**
 * Throws if the currently-selected provider has no API key configured.
 * Call this before writing anything to the DB so a missing key never leaves
 * behind a saved user message with no reply.
 */
export function assertProviderConfigured(): void {
  const provider = getProviderName();
  const keyEnv = PROVIDER_KEY_ENV[provider];
  if (!envTrimmed(keyEnv)) {
    throw new AIProviderError(`${keyEnv} is not configured on the server`);
  }
}

export async function getAIReply(systemPrompt: string, messages: ChatMsg[]): Promise<string> {
  const provider = getProviderName();
  const model = envTrimmed("AI_MODEL") || DEFAULT_MODELS[provider];

  switch (provider) {
    case "anthropic":
      return callAnthropic(systemPrompt, messages, model);
    case "openai":
      return callOpenAI(systemPrompt, messages, model);
    case "gemini":
      return callGemini(systemPrompt, messages, model);
  }
}

async function callAnthropic(systemPrompt: string, messages: ChatMsg[], model: string): Promise<string> {
  const apiKey = envTrimmed("ANTHROPIC_API_KEY");
  if (!apiKey) throw new AIProviderError("ANTHROPIC_API_KEY is not configured on the server");

  const { default: AnthropicClient } = await import("@anthropic-ai/sdk");
  const client = new AnthropicClient({ apiKey });
  const response = await client.messages.create({
    model,
    max_tokens: 2048,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

async function callOpenAI(systemPrompt: string, messages: ChatMsg[], model: string): Promise<string> {
  const apiKey = envTrimmed("OPENAI_API_KEY");
  if (!apiKey) throw new AIProviderError("OPENAI_API_KEY is not configured on the server");

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });
  const response = await client.chat.completions.create({
    model,
    max_tokens: 2048,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  });

  return response.choices[0]?.message?.content || "";
}

async function callGemini(systemPrompt: string, messages: ChatMsg[], model: string): Promise<string> {
  const apiKey = envTrimmed("GEMINI_API_KEY");
  if (!apiKey) throw new AIProviderError("GEMINI_API_KEY is not configured on the server");
  if (messages.length === 0) return "";

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const client = new GoogleGenerativeAI(apiKey);
  const genModel = client.getGenerativeModel({ model, systemInstruction: systemPrompt });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const last = messages[messages.length - 1];

  const chat = genModel.startChat({ history });
  const result = await chat.sendMessage(last.content);
  return result.response.text();
}
