'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navLinks, site, socials } from '@/lib/site';
import { BrandMark } from './brand-mark';
import { SocialIcon } from './social-icon';

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Progresso, sombra do header e seção ativa em um único laço de rAF.
  // Progresso e classe vão direto ao DOM (60 fps não deve re-renderizar o
  // React); só a seção ativa usa estado, e ela muda poucas vezes por página.
  useEffect(() => {
    const header = headerRef.current;
    const bar = progressRef.current;
    if (!header || !bar) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    let frame = 0;
    let current: string | null = null;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      header.classList.toggle('is-scrolled', window.scrollY > 24);

      // Sonda a 35% da altura da viewport: vale a última seção cujo topo já
      // passou por ela. Comparar `intersectionRatio` não serve, porque seções altas
      // sempre perderiam para as curtas.
      const probe = window.scrollY + window.innerHeight * 0.35;
      let found: string | null = null;
      for (const section of sections) {
        if (section.offsetTop <= probe) found = section.id;
      }
      // No fim da página a última seção é sempre a ativa, mesmo que curta.
      if (ratio > 0.99 && sections.length > 0) {
        found = sections[sections.length - 1].id;
      }
      if (found !== current) {
        current = found;
        setActive(found);
      }
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

  // Menu aberto: trava o scroll, fecha no Escape e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="site-header fixed inset-x-0 top-0 z-[100]"
      >
        <div className="site-shell flex h-20 items-center justify-between border-b border-white/15">
          <a
            href="#inicio"
            aria-label={`${site.name}, início`}
            className="shrink-0"
          >
            <BrandMark className="h-11 w-auto" />
          </a>

          <nav aria-label="Navegação principal" className="site-nav">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  active === link.href.slice(1) ? 'true' : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contato" className="header-contact group">
              Contato{' '}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:rotate-45"
              />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          className="scroll-progress"
          aria-hidden="true"
          style={{ transform: 'scaleX(0)' }}
        />
      </header>

      {/*
        Fora do <header> de propósito: o `backdrop-filter` do header cria um
        bloco de contenção, e um filho `position: fixed` ficaria preso à altura
        da barra em vez de cobrir a tela.
      */}
      <div
        id="menu-mobile"
        ref={menuRef}
        className={`nav-drawer ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <div className="nav-drawer-inner site-shell">
          <div className="nav-drawer-top">
            <a
              href="#inicio"
              onClick={() => setOpen(false)}
              aria-label={`${site.name}, início`}
            >
              <BrandMark className="h-12 w-auto" />
            </a>
            <button
              type="button"
              className="nav-drawer-close"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Fechar menu"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navegação mobile" className="nav-drawer-links">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={
                  active === link.href.slice(1) ? 'true' : undefined
                }
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-drawer-foot">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
