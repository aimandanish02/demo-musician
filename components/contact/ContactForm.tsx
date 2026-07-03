"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { Reveal } from "@/components/ui/Reveal";
import { contactSchema, HONEYPOT_FIELD } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void;
    };
    onTurnstileVerify?: (token: string) => void;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.onTurnstileVerify = (token: string) => setTurnstileToken(token);
    return () => {
      delete window.onTurnstileVerify;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      turnstileToken,
      [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ""),
    };

    const validation = contactSchema.safeParse(payload);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message ?? "Please check the form and try again.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? "Could not send your message. Please try again later.");
        setStatus("error");
        window.turnstile?.reset();
        setTurnstileToken("");
        return;
      }

      setStatus("success");
      form.reset();
      setTurnstileToken("");
      window.turnstile?.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
      window.turnstile?.reset();
      setTurnstileToken("");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" async defer />
      <Reveal className="rounded-[32px] border border-border-subtle bg-surface-raised px-6 py-14 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-display uppercase tracking-tight text-ink">Get in touch</h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted">
            Booking, press, or just want to say hi — send a message.
          </p>
        </div>

        {status === "success" ? (
          <p role="status" className="mx-auto mt-8 max-w-md text-center text-base text-ink">
            Thanks — your message is on its way. We&apos;ll get back to you soon.
          </p>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left"
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <label htmlFor={HONEYPOT_FIELD}>Leave this field blank</label>
              <input
                id={HONEYPOT_FIELD}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
              />
            </div>

            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-2xl border border-border-strong bg-surface-raised-2 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-border-strong bg-surface-raised-2 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
                placeholder="Phone (optional)"
                className="w-full rounded-2xl border border-border-strong bg-surface-raised-2 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={4000}
                rows={5}
                placeholder="Your message"
                className="w-full resize-none rounded-2xl border border-border-strong bg-surface-raised-2 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>

            <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-callback="onTurnstileVerify" />

            {status === "error" && errorMessage ? (
              <p role="alert" className="text-sm text-red-400">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.98] disabled:opacity-70"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
