import type Lenis from 'lenis';

/**
 * Referência compartilhada da instância do Lenis.
 *
 * Quem precisa rolar programaticamente (o botão de voltar ao topo, por exemplo)
 * pega a instância daqui em vez de chamar `window.scrollTo`, que competiria com
 * o rAF do Lenis e produziria um salto seco no meio da animação.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.4 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToPosition(top: number) {
  if (instance) {
    instance.scrollTo(top, { duration: 1.1 });
    return;
  }
  window.scrollTo({ top, behavior: 'smooth' });
}
