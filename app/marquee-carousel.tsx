'use client';

// A janela de rolagem precisa de tabIndex={0}: sem isso, quem navega por
// teclado não consegue focar nem percorrer a lista horizontal.
// oxlint-disable jsx-a11y/no-noninteractive-tabindex

import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { scrollToPosition } from '@/lib/lenis-instance';


type MarqueeCarouselProps = {
  /** Nome acessível do carrossel. */
  label: string;
  children: ReactNode;
  className?: string;
  /** Cenas do mini Franco que trocam embaixo dos cards conforme o carrossel anda. */
  chibi?: readonly { src: string; fala: string }[];
};

/**
 * Carrossel horizontal conduzido pelo scroll vertical. O palco fica fixo por
 * alguns instantes e transforma o avanço da página em deslocamento lateral.
 * As setas do teclado movem a própria página até o ponto equivalente,
 * mantendo o carrossel e a rolagem sempre sincronizados.
 */
export function MarqueeCarousel({
  label,
  children,
  className = '',
  chibi = [],
}: MarqueeCarouselProps) {
  const stage = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const metrics = useRef({ start: 0, range: 1, travel: 0 });
  const chibiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = stage.current;
    const pinned = sticky.current;
    const element = viewport.current;
    if (!section || !pinned || !element) return;

    let frame = 0;
    let scrollDistance = '';
    const group = element.querySelector<HTMLElement>('.carousel-group');
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>('.carousel-group > *'),
    );
    let centers: number[] = [];
    let pose = -1;
    const guide = chibiRef.current;
    const poses = guide ? Array.from(guide.querySelectorAll('img')) : [];
    const bubble = guide?.querySelector<HTMLElement>('.chibi-fala') ?? null;
    const falas = poses.map((img) => img.dataset.fala ?? '');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const measure = () => {
      if (!group) return;

      const travel = Math.max(0, element.scrollWidth - element.clientWidth);
      const top = window.scrollY + section.getBoundingClientRect().top;
      const stickyTop = Number.parseFloat(getComputedStyle(pinned).top) || 0;
      const start = top - stickyTop;
      const range = Math.max(window.innerHeight * 0.9, travel * 0.85);

      metrics.current = { start, range, travel };
      const nextDistance = `${range + pinned.offsetHeight}px`;
      if (nextDistance !== scrollDistance) {
        scrollDistance = nextDistance;
        section.style.height = nextDistance;
      }
      centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
    };

    const render = () => {
      frame = 0;
      const { range, travel } = metrics.current;
      // O topo real acompanha também mudanças de altura das seções anteriores.
      const start =
        window.scrollY +
        section.getBoundingClientRect().top -
        (Number.parseFloat(getComputedStyle(pinned).top) || 0);
      metrics.current.start = start;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / range),
      );
      const nextPosition = progress * travel;
      if (guide) {
        // O mini Franco anda junto com o carrossel, embaixo dos cards, e troca de pose.
        guide.style.setProperty('--walk', progress.toFixed(4));
        const next = Math.min(poses.length - 1, Math.floor(progress * poses.length));
        if (next !== pose) {
          poses.forEach((img, i) => img.classList.toggle('is-active', i === next));
          if (bubble) {
            // a fala troca junto com a cena, palavra por palavra
            bubble.innerHTML = '';
            falas[next].split(' ').forEach((word, i) => {
              const span = document.createElement('span');
              span.textContent = word;
              span.style.setProperty('--w', String(i));
              bubble.appendChild(span);
              bubble.appendChild(document.createTextNode(' '));
            });
            bubble.classList.remove('is-talking');
            void bubble.offsetWidth;
            bubble.classList.add('is-talking');
          }
          if (pose !== -1) {
            guide.classList.remove('is-hop');
            void guide.offsetWidth;
            guide.classList.add('is-hop');
          }
          pose = next;
        }
      }
      if (Math.abs(element.scrollLeft - nextPosition) > 0.5) {
        element.scrollLeft = nextPosition;
      }
      const center = nextPosition + element.clientWidth / 2;
      const stepWidth = cards[0]?.offsetWidth || 320;
      cards.forEach((card, index) => {
        const step = Math.max(
          -2,
          Math.min(2, (centers[index] - center) / stepWidth),
        );
        const transform = `translate3d(0, ${step * (reducedMotion.matches ? 10 : 32)}px, 0)`;
        if (card.style.transform !== transform)
          card.style.transform = transform;
      });
    };

    const update = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(element);
    resizeObserver.observe(document.body);
    if (group) resizeObserver.observe(group);
    resizeObserver.observe(pinned);
    measure();
    render();
    window.addEventListener('scroll', update, { passive: true });
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const move = useCallback((direction: number) => {
    const element = viewport.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>('.carousel-group > *');
    const { start, range, travel } = metrics.current;
    if (travel <= 0) return;
    const step = (card?.offsetWidth ?? 320) + 20;
    const progress = Math.min(
      1,
      Math.max(0, element.scrollLeft / travel + (direction * step) / travel),
    );
    scrollToPosition(start + progress * range);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  };

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- o container precisa suspender o auto-scroll no hover/foco e aceitar as setas do teclado
    <section
      ref={stage}
      className={`carousel-stage relative z-10 ${className}`}
      aria-roledescription="carrossel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div ref={sticky} className="carousel-sticky">
        <div
          ref={viewport}
          className="carousel-window"
          tabIndex={0}
          aria-label={`${label}. Role a página ou use as setas para navegar`}
        >
          {children}
        </div>
        {chibi.length ? (
        <div ref={chibiRef} className="carousel-chibi" aria-hidden="true">
          <p className="chibi-fala" />
          {chibi.map(({ src, fala }) => (
            // oxlint-disable-next-line next/no-img-element -- personagem gerado é um PNG local com transparência
            <img key={src} src={src} alt="" data-fala={fala} loading="lazy" decoding="async" />
          ))}
        </div>
        ) : null}
      </div>
    </section>
  );
}
