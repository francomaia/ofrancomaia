'use client';

// A janela de rolagem precisa de tabIndex={0}: sem isso, quem navega por
// teclado não consegue focar nem percorrer a lista horizontal.
// oxlint-disable jsx-a11y/no-noninteractive-tabindex

import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const AUTO_SPEED = 0.045; // px por ms

type MarqueeCarouselProps = {
  /** Nome acessível do carrossel. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Marquee infinito reutilizável: serve tanto aos sites quanto às identidades
 * visuais. O conteúdo é responsabilidade de quem chama, que só precisa entregar
 * um `.carousel-track` com dois `.carousel-group` idênticos (o segundo é a
 * cópia que fecha o laço).
 *
 * O laço de animação lê `pausedRef` e `hovering` por ref em vez de estado, então
 * o hover, o foco e a aba oculta suspendem o movimento sem recriar o rAF nem
 * perder o impulso pendente dos botões de navegação.
 */
export function MarqueeCarousel({
  label,
  children,
  className = '',
}: MarqueeCarouselProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const pending = useRef(0);
  const hovering = useRef(false);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;

    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = Math.min(now - (previous || now), 40);
      previous = now;

      const group = element.querySelector<HTMLElement>('.carousel-group');
      const track = element.querySelector<HTMLElement>('.carousel-track');
      if (!group || !track) return;

      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      const cycle = group.offsetWidth + gap;
      if (cycle <= 0) return;

      // Se o usuário arrastou a barra, adota a posição real como verdade.
      if (Math.abs(element.scrollLeft - position) > 2) {
        position = element.scrollLeft;
      }

      if (Math.abs(pending.current) > 0.5) {
        const step = pending.current * (1 - Math.exp(-elapsed / 100));
        position += step;
        pending.current -= step;
      } else if (!pausedRef.current && !hovering.current && !document.hidden) {
        position += elapsed * AUTO_SPEED;
      }

      position = ((position % cycle) + cycle) % cycle;
      element.scrollLeft = position;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const move = useCallback((direction: number) => {
    const element = viewport.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>('.carousel-group > *');
    pending.current += direction * ((card?.offsetWidth ?? 320) + 20);
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
      className={`carousel-stage relative z-10 ${className}`}
      aria-roledescription="carrossel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onPointerEnter={() => {
        hovering.current = true;
      }}
      onPointerLeave={() => {
        hovering.current = false;
      }}
      onFocusCapture={() => {
        hovering.current = true;
      }}
      onBlurCapture={() => {
        hovering.current = false;
      }}
    >
      <div className="carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Anterior">
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={
            paused
              ? 'Retomar a rolagem automática'
              : 'Pausar a rolagem automática'
          }
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Próximo">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>

      <div
        ref={viewport}
        className="carousel-window"
        tabIndex={0}
        aria-label={`${label}. Use as setas para navegar`}
      >
        {children}
      </div>
    </section>
  );
}
