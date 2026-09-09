'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { scrollToTop } from '@/lib/lenis-instance';

/**
 * Botão flutuante de voltar ao topo, em vidro fosco, no canto da página.
 *
 * A visibilidade é alternada por classe direto no DOM: é decisão de scroll a
 * 60 fps e não deve provocar re-render do React.
 */
export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    let frame = 0;
    let lastVisible: boolean | undefined;
    const update = () => {
      frame = 0;
      const visible = window.scrollY > window.innerHeight;
      if (visible !== lastVisible) {
        button.classList.toggle('is-visible', visible);
        lastVisible = visible;
      }
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
    <button
      ref={ref}
      type="button"
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
}
