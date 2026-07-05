import { Reveal } from "@/components/ui/Reveal";
import { streamingPlatforms } from "@/lib/data";

export function LogoWall() {
  return (
    <section className="border-y border-border-subtle bg-surface-raised/40">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between">
          {streamingPlatforms.map((platform) => (
            <a
              key={platform.slug}
              href={platform.url}
              aria-label={platform.name}
              style={{ "--brand": platform.color } as React.CSSProperties}
              className="grayscale opacity-60 transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 motion-safe:hover:scale-125 motion-safe:hover:drop-shadow-[0_0_18px_var(--brand)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${platform.slug}`}
                alt={platform.name}
                width={112}
                height={28}
                loading="lazy"
                className="h-6 w-auto md:h-7"
              />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
