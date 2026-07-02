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
              className="opacity-60 grayscale transition-opacity duration-200 hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${platform.slug}/f4efe4`}
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
