import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name required").max(100),
  email: z.string().email("Invalid email").max(200),
  message: z.string().min(1, "Message required").max(2000),
  website: z.string().optional().default(""), // honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot: if filled, pretend success (trap bots)
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const to = (process.env.CONTACT_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!to.length) {
      return NextResponse.json({ ok: false, error: "No recipients configured" }, { status: 500 });
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
        <p><strong>From:</strong> ${escapeHtml(name)}</p>
        <p><strong>Sender Email:</strong>&lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</div>
        <hr />
        <p style="color:#666;font-size:12px">Sent via the Student Council contact form (sc.nais.fun).</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to,
      // If you need privacy among recipients:
      // bcc: process.env.BCC,
      replyTo: email,
      subject: `New Student Council Message — ${name}`,
      html,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Email send failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}