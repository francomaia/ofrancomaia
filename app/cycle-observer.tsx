'use client';

import { useEffect } from 'react';

/**
 * Liga a troca de imagens dos cards só enquanto eles estão na tela.
 * Fora da tela a animação fica pausada e o celular não gasta processamento.
 */
export function CycleObserver() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.cycle');
    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-live'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-live', entry.isIntersecting);
        }
      },
      { rootMargin: '0px 200px' },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return null;
}
