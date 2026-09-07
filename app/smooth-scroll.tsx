'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import { setLenis } from '@/lib/lenis-instance';

/**
 * Rolagem suave com Lenis.
 *
 * Roda para todo mundo, de propósito. A versão anterior desistia quando o
 * sistema pedia movimento reduzido, e no Windows esse sinal vem do interruptor
 * "Efeitos de animação", que muita gente desliga por desempenho: o resultado
 * era a rolagem seca.
 *
 * `syncTouch: false` deixa o toque no celular com a rolagem nativa, que é mais
 * responsiva do que qualquer interpolação por cima.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      // Expo-out: acelera rápido e assenta devagar, sem parecer arrastado.
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
      // Compensa a altura do header fixo ao pular para uma âncora.
      anchors: { offset: -96 },
    });

    // O `scroll-behavior: smooth` nativo briga com o rAF do Lenis; a classe é
    // adicionada pelo próprio Lenis, então o CSS nativo segue valendo como
    // fallback quando o JS não roda.
    document.documentElement.classList.add('lenis-active');
    setLenis(lenis);

    return () => {
      document.documentElement.classList.remove('lenis-active');
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
