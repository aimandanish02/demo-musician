"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import { artist } from "@/lib/data";

const NAV_LINKS = [
  { label: "Music", href: "#discography" },
  { label: "Tour Dates", href: "#tour" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray<HTMLElement>(".mobile-nav-link");
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        panelRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
      ).fromTo(
        links,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power3.out" },
        "-=0.1",
      );

      if (isOpen) {
        tl.play(0);
      } else {
        tl.reverse();
      }
    }, panelRef);

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link href="#top" className="font-display text-xl uppercase tracking-wide text-ink">
          {artist.name}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="#tour"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent/90"
          >
            Tour Dates
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      <div
        ref={panelRef}
        className="invisible fixed inset-x-0 top-16 z-40 border-b border-border-subtle bg-surface px-5 pb-8 pt-2 opacity-0 lg:hidden"
        style={{ height: isOpen ? "auto" : 0, overflow: isOpen ? "visible" : "hidden" }}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="mobile-nav-link border-b border-border-subtle py-4">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mobile-nav-link pt-4">
            <Link
              href="#tour"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink"
            >
              Tour Dates
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
