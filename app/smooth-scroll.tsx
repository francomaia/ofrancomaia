'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -72 },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
