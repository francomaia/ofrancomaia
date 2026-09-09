'use client';

// A janela de rolagem precisa de tabIndex={0}: sem isso, quem navega por
// teclado não consegue focar nem percorrer a lista horizontal.
// oxlint-disable jsx-a11y/no-noninteractive-tabindex

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { scrollToPosition } from '@/lib/lenis-instance';

type MarqueeCarouselProps = {
  /** Nome acessível do carrossel. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Carrossel horizontal conduzido pelo scroll vertical. O palco fica fixo por
 * alguns instantes e transforma o avanço da página em deslocamento lateral.
 * Os botões movem a própria página até o ponto equivalente, mantendo o carrossel
 * e a rolagem sempre sincronizados.
 */
export function MarqueeCarousel({
  label,
  children,
  className = '',
}: MarqueeCarouselProps) {
  const stage = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const metrics = useRef({ start: 0, range: 1, travel: 0 });

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
        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Anterior">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Próximo">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div
          ref={viewport}
          className="carousel-window"
          tabIndex={0}
          aria-label={`${label}. Role a página ou use as setas para navegar`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
