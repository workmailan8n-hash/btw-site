import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schema';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const { RESEND_API_KEY, RESEND_FROM, RESEND_TO, TG_BOT_TOKEN, TG_OWNER_CHAT_ID } = process.env;

  // Email via Resend
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: RESEND_FROM ?? 'BTW <onboarding@resend.dev>',
        to: [RESEND_TO ?? 'hello@btw.studio'],
        subject: `New brief from ${data.name} · ${data.projectType} · ${data.budget}`,
        replyTo: data.email,
        text: [
          `From: ${data.name} <${data.email}>`,
          `Type: ${data.projectType}`,
          `Budget: ${data.budget}`,
          '',
          data.message,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[contact] Resend error:', err);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }
  } else {
    console.warn('[contact] RESEND_API_KEY missing — email not sent. Dev mode.');
  }

  // Telegram notification (best-effort, non-blocking)
  if (TG_BOT_TOKEN && TG_OWNER_CHAT_ID) {
    try {
      const isKeyst = data.projectType === 'keyst';
      const text = [
        isKeyst ? '<b>🔑 Keyst lead from btw.studio</b>' : '<b>New brief from btw.studio</b>',
        '',
        `<b>From:</b> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;`,
        `<b>Type:</b> ${data.projectType}`,
        `<b>Budget:</b> ${data.budget}`,
        '',
        escapeHtml(data.message).slice(0, 3500),
      ].join('\n');

      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_OWNER_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
    } catch (err) {
      console.error('[contact] TG notification failed:', err);
      // don't fail the request
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
