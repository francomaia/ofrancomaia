import { ArrowUpRight, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrandMark } from './brand-mark';
import { ScrollSequence, type SequenceFrame } from './scroll-sequence';

const sequenceFrames: SequenceFrame[] = [
  {
    src: '/assets/character/franco-cartoon-01.avif',
    alt: 'Personagem 3D de Franco Maia em pose frontal',
  },
  {
    src: '/assets/character/franco-cartoon-02.avif',
    alt: 'Personagem 3D de Franco Maia com a mão estendida',
  },
];

const selectedProjects = [
  { name: 'Exas Company', sector: 'Assessoria de Marketing', image: '/assets/cases/exas.avif', href: 'https://exascompany.com.br/' },
  { name: 'Agronova Transportes', sector: 'Logística e Transporte', image: '/assets/cases/agronova.avif', href: 'https://agronova.exascompany.com.br/' },
  { name: 'Bottega Implementos', sector: 'Implementos Agrícolas', image: '/assets/cases/bottega.avif', href: 'https://bottegaimplementos.com.br/' },
  { name: 'Realiza Multimarcas', sector: 'Revenda de Veículos', image: '/assets/cases/realiza.avif', href: 'https://seminovosrealizajti.com.br/' },
  { name: 'Immune', sector: 'Certificação Digital', image: '/assets/cases/immune.avif', href: 'https://certificadoimmune.com.br/' },
  { name: 'Tradição Indústria', sector: 'Peças Agrícolas', image: '/assets/cases/tradicao.avif', href: 'https://tradicaoind.exascompany.com.br/' },
  { name: 'Oral Implant', sector: 'Odontologia', image: '/assets/cases/oral-implant.avif', href: 'https://clinicaoralimplant.com.br/' },
  { name: 'Senna Autopeças', sector: 'Distribuição Automotiva', image: '/assets/cases/senna.avif', href: 'https://xn--sennaautopeas-sgb.exascompany.com.br/' },
  { name: 'Autopeças Piloto', sector: 'Peças Automotivas', image: '/assets/cases/piloto.avif', href: 'https://autopecaspiloto.lovable.app/' },
  { name: 'Summer Fit', sector: 'Fitness e Bem-Estar', image: '/assets/cases/summer-fit.avif', href: 'https://summerfitacademia.com.br/' },
];

const services = [
  {
    number: '01',
    title: 'UI / UX Design',
    copy: 'Interfaces centradas nas pessoas, com hierarquia clara, fluxos sem atrito e uma linguagem visual que dá personalidade ao produto.',
  },
  {
    number: '02',
    title: 'Web Design',
    copy: 'De landing pages a sites completos: experiências responsivas que capturam atenção e conduzem cada visita até uma ação concreta.',
  },
  {
    number: '03',
    title: 'Branding',
    copy: 'Identidades coesas e reconhecíveis, desenhadas para transmitir clareza e criar consistência em todos os pontos de contato.',
  },
];

export default function Home() {
  return (
    <main id="conteudo" className="overflow-clip bg-background text-foreground">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-black transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="site-shell flex h-24 items-center justify-between border-b border-white/10">
          <a href="#inicio" className="group inline-flex items-center gap-3 text-cyan-200" aria-label="O Franco Maia — início">
            <BrandMark className="size-10 drop-shadow-[0_0_14px_rgb(70_242_255/28%)]" />
            <span className="text-sm font-semibold tracking-[-0.02em] text-white">O Franco Maia</span>
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.14em] text-slate-400 md:flex">
            <a className="transition-colors hover:text-cyan-200" href="#trabalhos">Trabalhos</a>
            <a className="transition-colors hover:text-cyan-200" href="#trajetoria">Trajetória</a>
            <a className="transition-colors hover:text-cyan-200" href="#sobre">Sobre</a>
          </nav>
          <a
            href="https://www.instagram.com/ofrancomaia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-cyan-200/50 hover:bg-cyan-300/10 hover:text-cyan-200"
          >
            Vamos conversar <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </header>

      <ScrollSequence frames={sequenceFrames} />

      <div className="overflow-hidden border-y border-white/10 py-4" aria-hidden="true">
        <div className="marquee-track font-mono text-xs uppercase tracking-[0.22em] text-cyan-100/55">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 items-center">
              {['Web Design', 'UI / UX', 'Branding', 'Direção criativa', 'Experiência digital'].map((item) => (
                <span key={`${group}-${item}`} className="flex items-center gap-7 px-7">
                  {item} <Sparkles className="size-3 text-cyan-300" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="trabalhos" className="site-shell py-28 sm:py-36">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="eyebrow">Projetos selecionados</span>
            <h2 className="mt-6 text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Projetos que<br />movem marcas.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-400 lg:justify-self-end">
            Uma seleção real de sites criados para negócios de diferentes segmentos — cada um com linguagem, estrutura e prioridade próprias.
          </p>
        </div>

        <div className="mt-16 grid gap-x-5 gap-y-10 md:grid-cols-2">
          {selectedProjects.map((project, index) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={cn('group block', index % 3 === 1 && 'md:translate-y-12')}
              aria-label={`Abrir o site de ${project.name}`}
            >
              <article className="case-card min-h-0 rounded-[1.25rem] p-2">
                {/* oxlint-disable-next-line next/no-img-element -- local portfolio captures are pre-optimized AVIF assets */}
                <img
                  src={project.image}
                  alt={`Página inicial do projeto ${project.name}`}
                  width={1200}
                  height={760}
                  loading="lazy"
                  className="aspect-[30/19] w-full rounded-[0.9rem] object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </article>
              <div className="mt-5 flex items-start justify-between gap-5 px-1">
                <div>
                  <span className="text-xs uppercase tracking-[0.16em] text-cyan-300/70">{project.sector}</span>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{project.name}</h3>
                </div>
                <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-slate-400 transition-colors group-hover:border-cyan-200/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-20 text-right text-xs uppercase tracking-[0.14em] text-slate-600">Cada card abre o projeto publicado em uma nova aba.</p>
      </section>

      <section id="sobre" className="border-y border-white/10 bg-[#050a0c] py-28 sm:py-36">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="flex items-center gap-5 text-cyan-300">
            <BrandMark className="size-20 sm:size-24" labelled />
            <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Identidade / 2026</span>
          </div>
          <div>
            <span className="eyebrow">Sobre</span>
            <h2 className="mt-7 max-w-4xl text-[clamp(2.8rem,6.6vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Eu sou Franco Maia. Crio marcas e experiências digitais <span className="text-cyan-300">desde 2014.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Meu trabalho conecta estratégia, interface e identidade para transformar uma ideia em uma presença digital clara, autoral e útil.
            </p>
          </div>
        </div>
      </section>

      <section id="trajetoria" className="site-shell py-28 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Trajetória</span>
            <h2 className="mt-7 text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Desde<br /><span className="text-cyan-300">2014.</span></h2>
          </div>
          <div className="border-t border-white/15">
            <div className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-cyan-300">2014</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">O começo da prática</h3>
                <p className="mt-3 max-w-xl leading-7 text-slate-400">O ponto de partida de uma trajetória dedicada à criação de marcas e experiências para a web.</p>
              </div>
            </div>
            <div className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-cyan-300">Hoje</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">Visão integrada</h3>
                <p className="mt-3 max-w-xl leading-7 text-slate-400">UI/UX, web design e branding trabalhando juntos para criar presenças digitais mais claras, memoráveis e úteis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050a0c] py-28 sm:py-36" aria-labelledby="servicos-titulo">
        <div className="site-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">O que eu faço</span>
            <h2 id="servicos-titulo" className="mt-7 text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Forma, função<br />e direção.</h2>
          </div>
          <div className="mt-16 border-t border-white/15">
            {services.map((service) => (
              <article key={service.number} className="grid gap-6 border-b border-white/10 py-9 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-start">
                <span className="font-mono text-xs text-cyan-300">{service.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{service.title}</h3>
                <p className="max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="site-shell py-20 sm:py-28">
        <div className="glass-panel relative overflow-hidden rounded-[1.5rem] px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-cyan-300/15 blur-[90px]" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="eyebrow">Seu próximo projeto</span>
              <h2 className="mt-7 max-w-5xl text-[clamp(3.2rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.08em]">Vamos criar algo <span className="text-cyan-300">impossível de ignorar?</span></h2>
            </div>
            <a
              href="https://www.instagram.com/ofrancomaia"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'cyan-shadow h-14 rounded-full px-6 text-base')}
            >
              Falar no Instagram <ArrowUpRight aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-shell flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-8 text-cyan-300" />
          <p>© {new Date().getFullYear()} O Franco Maia</p>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em]">
          <a className="transition-colors hover:text-cyan-200" href="#inicio">Voltar ao topo</a>
          <a className="transition-colors hover:text-cyan-200" href="https://www.instagram.com/ofrancomaia" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
