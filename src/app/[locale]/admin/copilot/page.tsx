"use client";

import { useEffect, useRef, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { Bot, Send, RefreshCw, User, Sparkles } from "lucide-react";

type ChatMessage = {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const SESSION_KEY = "sem_copilot_session";

export default function CopilotPage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    fetchHistory(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const fetchHistory = async (sid: string) => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/copilot?sessionId=${sid}`);
      const d = await res.json();
      if (!d.error) setMessages(d.data || []);
    } catch (e) {
      console.error("Failed to fetch Copilot history:", e);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setError(null);
    const optimisticUser: ChatMessage = {
      id: `temp-${Date.now()}`,
      sessionId,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticUser]);
    setSending(true);
    try {
      const res = await adminFetch("/api/admin/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const d = await res.json();
      if (d.error) {
        setError(d.error);
        setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
      } else {
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticUser.id),
          d.data.userMessage,
          d.data.assistantMessage,
        ]);
      }
    } catch (e) {
      console.error("Copilot send failed:", e);
      setError("Failed to reach Copilot. Try again.");
      setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
    } finally {
      setSending(false);
    }
  };

  const newConversation = () => {
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    setSessionId(id);
    setMessages([]);
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bot size={20} className="text-emerald-600" /> Copilot
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Paste a client/vendor message or situation — get next steps, missing questions, or a draft reply.
          </p>
        </div>
        <button
          onClick={newConversation}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <RefreshCw size={13} /> New Conversation
        </button>
      </div>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[420px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {loading ? (
            <div className="py-20 text-center text-slate-400 text-sm">Loading…</div>
          ) : messages.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles size={18} />
              </div>
              <p className="text-[13px] font-semibold text-slate-700">Ask Copilot anything about a client, vendor, or quote.</p>
              <p className="text-[12px] text-slate-400 mt-1">
                e.g. &quot;Vendor A said 35,000 SAR, client budget is 40,000 — what should I do?&quot;
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-[13px] whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-slate-800 text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-700"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))
          )}
          {sending && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-400">
                Thinking…
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="px-5 py-2 bg-rose-50 border-t border-rose-200 text-[12px] text-rose-600">{error}</div>
        )}

        <div className="border-t border-slate-100 p-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Paste a message, situation, or question… (Enter to send, Shift+Enter for new line)"
            rows={2}
            className="flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
          />
          <button
            onClick={send}
            disabled={sending || !input.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-white rounded-lg text-[12px] font-semibold hover:bg-slate-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={14} /> Send
          </button>
        </div>
      </section>
    </div>
  );
}
