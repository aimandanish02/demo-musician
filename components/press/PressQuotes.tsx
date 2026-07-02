import { Reveal } from "@/components/ui/Reveal";
import { pressQuotes } from "@/lib/data";

export function PressQuotes() {
  return (
    <section id="press" className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pressQuotes.map((item, i) => (
          <Reveal key={item.author} delay={0.06 * i}>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-[24px] border border-border-subtle bg-surface-raised p-7">
              <blockquote className="text-lg leading-snug text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{item.author}</span>
                <span> - {item.source}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
