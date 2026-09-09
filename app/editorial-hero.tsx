'use client';

import { ArrowDownRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { site } from '@/lib/site';

/**
 * Hero com parallax preso ao scroll.
 *
 * O progresso é escrito em custom properties CSS pelo próprio rAF, sem estado
 * React: antes cada frame de scroll disparava um `setState` e re-renderizava a
 * árvore inteira. Toda a transformação mora no CSS a partir de `--p` (progresso
 * bruto) e `--exit` (progresso da saída), com a mesma matemática de antes.
 */
export function EditorialHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      // Evita escritas redundantes no style quando o scroll não moveu nada.
      if (Math.abs(progress - last) < 0.0005) return;
      last = progress;
      section.style.setProperty('--p', progress.toFixed(4));
      section.style.setProperty(
        '--exit',
        Math.max(0, (progress - 0.58) / 0.42).toFixed(4),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="editorial-hero relative min-h-[180vh]"
      style={{ '--p': 0, '--exit': 0 } as React.CSSProperties}
      aria-label={`Apresentação de ${site.name}`}
    >
      <div className="sticky top-0 min-h-[100svh] overflow-hidden bg-[#050505]">
        <div className="hero-spotlight absolute inset-0" aria-hidden="true" />
        <div className="noise-layer absolute inset-0" aria-hidden="true" />

        <div
          className="hero-name hero-name-back absolute inset-x-0 top-[19%] z-10 text-center"
          aria-hidden="true"
        >
          FRANCO
        </div>

        <div
          className="hero-name hero-name-front absolute inset-x-0 bottom-[12%] z-30 text-center"
          aria-hidden="true"
        >
          MAIA
        </div>

        {/* oxlint-disable-next-line next/no-img-element -- personagem gerado é um PNG local com transparência */}
        <img
          src="/assets/character/franco-cyan-cutout-v3.png"
          alt="Franco Maia com roupa ciano apresentando uma ideia"
          width={800}
          height={1200}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-character absolute left-1/2 z-20 max-w-none"
        />

        {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
        <img
          src="/assets/motifs/chrome-flower-cyan-v3.png"
          alt=""
          width={460}
          height={420}
          decoding="async"
          aria-hidden="true"
          className="float-button float-button-flower absolute right-[4%] top-[15%] z-40 w-[clamp(6.5rem,11vw,10rem)]"
        />

        {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
        <img
          src="/assets/motifs/cursor-orb-cyan-v3.png"
          alt=""
          width={420}
          height={420}
          decoding="async"
          aria-hidden="true"
          className="float-button float-button-orb absolute left-[4%] top-[42%] z-40 w-[clamp(6.5rem,10vw,10rem)]"
        />

        <div className="site-shell relative z-40 flex min-h-[100svh] flex-col justify-between pb-8 pt-28 sm:pb-10 sm:pt-32">
          <div className="hero-head flex items-start justify-between gap-6">
            <p className="hero-eyebrow">
              Designer gráfico · Web creator · Branding
            </p>
            <p className="scribble-note hidden rotate-[-5deg] text-right sm:block">
              ideias viram
              <br />
              experiências
            </p>
          </div>

          <h1 className="sr-only">
            {site.name}, {site.role}
          </h1>

          <div className="hero-foot grid items-end gap-6 sm:grid-cols-[1fr_auto]">
            <p className="max-w-[23rem] text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              {site.tagline}
            </p>
            <a href="#trabalhos" className="editorial-button group w-fit">
              Explorar trabalhos{' '}
              <ArrowDownRight
                aria-hidden="true"
                className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
