import { NextResponse } from "next/server";
import { contactSchema, HONEYPOT_FIELD } from "@/lib/contact-schema";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured");
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return false;
  const data: { success?: boolean } = await res.json();
  return data.success === true;
}

async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Email sending is not configured");
  }

  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safePhone = input.phone ? escapeHtml(input.phone) : "Not provided";
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br />");

  const res = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Website Contact Form" },
      to: [{ email: toEmail }],
      replyTo: { email: input.email, name: input.name },
      subject: `New contact form message from ${safeName}`,
      htmlContent: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Brevo send failed (${res.status}): ${errorBody}`);
  }
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const honeypotValue = raw[HONEYPOT_FIELD];
  if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 },
    );
  }

  try {
    const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const verified = await verifyTurnstile(parsed.data.turnstileToken, remoteIp);
    if (!verified) {
      return NextResponse.json(
        { ok: false, error: "Verification failed. Please try again." },
        { status: 400 },
      );
    }

    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("[contact] send failed", message);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again later." },
      { status: 500 },
    );
  }
}
