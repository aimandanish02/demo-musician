"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
      <Reveal className="rounded-[32px] border border-border-subtle bg-surface-raised px-6 py-14 text-center sm:px-12">
        <h2 className="font-display text-display uppercase tracking-tight text-ink">
          Never miss a show
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted">
          One email a month. New releases, tour dates, and the occasional unreleased demo.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 text-left">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "email-error" : undefined}
              className="w-full rounded-full border border-border-strong bg-surface-raised-2 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
            {status === "error" ? (
              <p id="email-error" className="mt-2 px-2 text-sm text-left text-red-400">
                Enter a valid email address.
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.98] disabled:opacity-70"
          >
            {status === "loading" ? "Joining..." : status === "success" ? "You're in" : "Subscribe"}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
