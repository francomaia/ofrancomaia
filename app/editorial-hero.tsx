'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function EditorialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
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

  const exit = Math.max(0, (progress - 0.58) / 0.42);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="editorial-hero relative min-h-[180vh]"
      aria-label="Apresentação de Franco Maia"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden bg-[#050505]">
        <div className="hero-spotlight absolute inset-0" aria-hidden="true" />
        <div className="noise-layer absolute inset-0" aria-hidden="true" />

        <div
          className="hero-name hero-name-back absolute inset-x-0 top-[19%] z-10 text-center"
          style={{
            opacity: 1 - exit * 0.72,
            filter: `blur(${exit * 14}px)`,
            transform: `translate3d(${-progress * 8}vw, ${-progress * 5}vh, 0) scale(${1 + progress * 0.09})`,
          }}
          aria-hidden="true"
        >
          FRANCO
        </div>

        <div
          className="hero-name hero-name-front absolute inset-x-0 bottom-[12%] z-30 text-center"
          style={{
            opacity: 0.82 - exit * 0.62,
            filter: `blur(${exit * 10}px)`,
            transform: `translate3d(${progress * 9}vw, ${progress * 5}vh, 0) scale(${1 + progress * 0.06})`,
          }}
          aria-hidden="true"
        >
          MAIA
        </div>

        {/* oxlint-disable-next-line next/no-img-element -- generated character is a local transparent PNG */}
        <img
          src="/assets/character/franco-cobalt-cutout.png"
          alt="Franco Maia com roupa azul apresentando uma ideia"
          width={800}
          height={1200}
          loading="eager"
          className="hero-character absolute bottom-[-16%] left-1/2 z-20 w-[clamp(25rem,48vw,46rem)] max-w-none"
          style={{
            opacity: 1 - exit * 0.92,
            filter: `drop-shadow(0 2rem 4rem rgb(0 0 0 / 75%)) blur(${exit * 7}px)`,
            transform: `translate3d(-50%, ${progress * 7}vh, 0) scale(${1 + progress * 0.14}) rotate(${progress * 1.5}deg)`,
          }}
        />

        {/* oxlint-disable-next-line next/no-img-element -- generated floating motif is a local transparent PNG */}
        <img
          src="/assets/motifs/chrome-flower.png"
          alt=""
          width={460}
          height={420}
          aria-hidden="true"
          className="float-button float-button-flower absolute right-[3%] top-[14%] z-40 w-[clamp(7rem,13vw,13rem)]"
          style={{
            transform: `translate3d(0, ${progress * -9}vh, 0) rotate(${progress * 85}deg)`,
          }}
        />

        {/* oxlint-disable-next-line next/no-img-element -- generated floating motif is a local transparent PNG */}
        <img
          src="/assets/motifs/cursor-orb.png"
          alt=""
          width={420}
          height={420}
          aria-hidden="true"
          className="float-button float-button-orb absolute left-[4%] top-[42%] z-40 w-[clamp(6.5rem,10vw,10rem)]"
          style={{
            transform: `translate3d(0, ${progress * 12}vh, 0) rotate(${-progress * 55}deg)`,
          }}
        />

        <div className="site-shell relative z-40 flex min-h-screen flex-col justify-between pb-8 pt-28 sm:pb-10 sm:pt-32">
          <div className="flex items-start justify-between gap-6">
            <p className="micro-label max-w-[15rem]">
              Designer gráfico · Web creator · Diretor de arte
            </p>
            <p className="scribble-note hidden rotate-[-5deg] text-right sm:block">
              ideias viram
              <br />
              experiências
            </p>
          </div>

          <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
            <p className="max-w-[23rem] text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Sites, marcas e experiências digitais construídas com direção,
              personalidade e movimento.
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

        <div className="absolute right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35 sm:flex">
          <span>Scroll</span>
          <span className="relative h-24 w-px overflow-hidden bg-white/15">
            <span
              className="absolute inset-x-0 top-0 bg-violet-400"
              style={{ height: `${Math.max(8, progress * 100)}%` }}
            />
          </span>
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </div>
      </div>
    </section>
  );
}
