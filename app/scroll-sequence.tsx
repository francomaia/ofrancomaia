'use client';

import { ArrowDownRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type SequenceFrame = {
  src: string;
  alt: string;
};

type ScrollSequenceProps = {
  frames: SequenceFrame[];
};

export function ScrollSequence({ frames }: ScrollSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const framePosition = frames.length > 1 ? progress * (frames.length - 1) : 0;
  const activeIndex = Math.min(Math.max(frames.length - 1, 0), Math.round(framePosition));

  return (
    <section ref={sectionRef} id="inicio" className="hero-scroll relative min-h-[220vh]" aria-label="Apresentação">
      <div className="hero-sticky sticky top-0 min-h-screen overflow-hidden pb-10 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
        <div
          className="pointer-events-none absolute left-1/2 top-[46%] size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/14 blur-[115px]"
          style={{ opacity: 0.38 + progress * 0.48, transform: `translate3d(-50%, calc(-50% + ${progress * 24}px), 0)` }}
        />

        <div className="site-shell relative min-h-[calc(100vh-9.5rem)]">
          <div className="relative z-30 flex flex-wrap items-center gap-5 pt-2">
            <span className="eyebrow">Sites · Branding · Identidade visual</span>
            <span className="text-[0.66rem] uppercase tracking-[0.18em] text-slate-500">Brasil · Projetos digitais</span>
          </div>

          <h1 className="pointer-events-none absolute inset-x-0 top-[18%] text-[clamp(4rem,10.8vw,10.4rem)] font-semibold leading-[0.78] tracking-[-0.082em] sm:top-[16%]">
            <span className="relative z-10 block max-w-[8.5ch]">Sites para marcas</span>
            <span className="outline-type relative z-30 ml-auto mt-[0.15em] block max-w-[9.8ch] text-right">impossíveis de ignorar.</span>
          </h1>

          <div
            className="pointer-events-none absolute left-1/2 top-[-7rem] z-0 h-screen w-screen overflow-hidden sm:top-[-8rem]"
            style={{ transform: `translate3d(calc(-50% + ${(progress - 0.5) * 8}px), 0, 0)` }}
          >
            {frames.length ? (
              <div className="hero-wallpaper-stage absolute -inset-[4%]">
                {frames.map((frame, index) => {
                  const distance = Math.abs(framePosition - index);
                  const opacity = Math.max(0, 1 - distance * 1.7);
                  return (
                    // oxlint-disable-next-line next/no-img-element -- generated hero scenes are pre-optimized AVIF assets
                    <img
                      key={frame.src}
                      src={frame.src}
                      alt={frame.alt}
                      width={1600}
                      height={900}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="hero-wallpaper-frame absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
                      style={{ opacity, transform: `scale(${1.04 + progress * 0.04}) translate3d(${progress * 1.2}%, ${progress * -0.8}%, 0)` }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="absolute inset-x-[12%] bottom-0 top-[7%] rounded-[48%_48%_18%_18%/28%_28%_10%_10%] border border-dashed border-cyan-200/18 bg-cyan-300/[0.025]">
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <span className="text-7xl font-bold text-cyan-300/10">3D</span>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-100/35">Personagem em produção</p>
                  </div>
                </div>
              </div>
            )}
            <div className="hero-wallpaper-overlay absolute inset-0" />
            <div className="magic-particles absolute inset-0" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
            </div>
          </div>

          <div className="absolute bottom-[1%] left-0 z-40 flex max-w-sm flex-col gap-6 sm:bottom-[4%]">
            <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Estratégia, interface e identidade reunidas em experiências digitais com presença própria.
            </p>
            <a
              href="#trabalhos"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'cyan-shadow h-12 w-fit rounded-full px-5 text-[0.92rem]')}
            >
              Ver projetos <ArrowDownRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="absolute bottom-[2%] right-0 z-40 hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-slate-600 sm:flex">
            Cena {String(activeIndex + 1).padStart(2, '0')}
            <span className="h-px w-20 bg-white/10">
              <span className="block h-full bg-cyan-300 shadow-[0_0_10px_#46f2ff]" style={{ width: `${Math.max(6, progress * 100)}%` }} />
            </span>
            {String(Math.max(frames.length, 1)).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
