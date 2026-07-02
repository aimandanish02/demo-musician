import Link from "next/link";
import {
  InstagramLogo,
  YoutubeLogo,
  TiktokLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { artist, socials } from "@/lib/data";

const SOCIAL_ICONS: Record<string, typeof InstagramLogo> = {
  Instagram: InstagramLogo,
  YouTube: YoutubeLogo,
  TikTok: TiktokLogo,
  X: XLogo,
};

export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl uppercase tracking-wide text-ink">{artist.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{artist.tagline}</p>
            <p className="mt-4 text-sm text-ink-faint">{artist.location}</p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <a href="mailto:booking@marlowevance.example" className="text-sm text-ink-muted hover:text-ink">
              booking@marlowevance.example
            </a>
            <div className="flex items-center gap-4">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    aria-label={social.platform}
                    className="text-ink-muted transition-colors hover:text-accent"
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border-subtle pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 {artist.name}. All rights reserved.</p>
          <p>Demo site, all data is fictional.</p>
        </div>
      </div>
    </footer>
  );
}
