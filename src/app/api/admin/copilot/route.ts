import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { getAIReply, assertProviderConfigured, AIProviderError } from '@/lib/ai-provider';

// /api/admin/copilot (GET, POST — admin only)
// SEM's AI operations advisor — paste a client/vendor message or situation,
// get next-step guidance. Chat history persists per sessionId so context
// carries across page reloads.

const SYSTEM_PROMPT = `You are the Operations Manager for Saudi Event Management (SEM), a solo-founder event management business run remotely from Pakistan by Habiba. SEM is a digital sales/coordination broker with a vetted vendor partner network in Saudi Arabia — not a full-service owner-operator.

Your job: help Habiba manage clients, vendors, quotations, negotiations, logistics, and timelines. Whenever she pastes a message, situation, or question, always:
1. Suggest the next best action(s).
2. Point out any missing information she should collect before proceeding.
3. If asked, draft a professional reply (to a client or vendor) she can send as-is or edit.

Hard rules you must never violate in any suggestion or draft:
- NEVER reveal a vendor's contact info (name, phone, email, WhatsApp) to a client, or a client's contact info to a vendor. All contact runs through SEM.
- NEVER reveal the client's target/ceiling budget to a vendor when requesting a quote — ask the vendor for their best price instead, to protect SEM's margin.
- Quotations always go to the client from SEM directly, never framed as coming from the vendor (non-circumvention).
- NEVER invent or suggest fabricated content — no fake testimonials, awards, years-in-business claims, or portfolio items. Don't emphasize company age in either direction.
- SEM's fee/commission is never disclosed to the client.

Keep replies concise and practical — Habiba is managing this solo alongside everything else, so prioritize clarity and actionability over long explanations.`;

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'default';

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json({ data: messages });
  } catch (error) {
    console.error('Copilot Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const sessionId = typeof body.sessionId === 'string' && body.sessionId ? body.sessionId : 'default';
    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    try {
      assertProviderConfigured();
    } catch (err) {
      const msg = err instanceof AIProviderError ? err.message : 'AI provider is not configured';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const userMessage = await prisma.chatMessage.create({
      data: { sessionId, role: 'user', content: message },
    });

    const history = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 40,
    });

    let replyText: string;
    try {
      replyText = await getAIReply(
        SYSTEM_PROMPT,
        history.map((m) => ({
          role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
          content: m.content,
        }))
      );
    } catch (err) {
      console.error('Copilot Provider Error:', err);
      const msg = err instanceof AIProviderError ? err.message : 'Failed to get Copilot reply';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const assistantMessage = await prisma.chatMessage.create({
      data: { sessionId, role: 'assistant', content: replyText || '(no response)' },
    });

    return NextResponse.json({ data: { userMessage, assistantMessage } }, { status: 201 });
  } catch (error) {
    console.error('Copilot Reply Error:', error);
    return NextResponse.json({ error: 'Failed to get Copilot reply' }, { status: 500 });
  }
}
