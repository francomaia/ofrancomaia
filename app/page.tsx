import { ArrowUpRight, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrandMark } from './brand-mark';
import { ScrollSequence, type SequenceFrame } from './scroll-sequence';

const sequenceFrames: SequenceFrame[] = [
  {
    src: '/assets/character/franco-magic-wallpaper.avif',
    alt: 'Franco Maia usando um notebook sobre uma nuvem em um céu mágico',
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
    label: 'Especialidade principal',
    title: 'Sites & Landing Pages',
    copy: 'Estratégia, arquitetura, interface e responsividade reunidas para transformar uma marca em uma experiência digital clara e convincente.',
    skills: ['Web Design', 'UI / UX', 'Responsividade', 'Conversão'],
  },
  {
    number: '02',
    label: 'Marcas com presença',
    title: 'Branding & Identidade Visual',
    copy: 'Sistemas visuais que dão unidade à marca: conceito, direção de arte, linguagem gráfica e aplicações consistentes.',
    skills: ['Branding', 'Direção de arte', 'Identidade', 'Peças de campanha'],
  },
  {
    number: '03',
    label: 'Conteúdo em movimento',
    title: 'Design, Vídeo & Motion',
    copy: 'Conteúdo para redes, edição de vídeo, GIFs e animações que estendem a identidade para campanhas e comunicação diária.',
    skills: ['Social media', 'Edição de vídeo', 'Motion', 'Tratamento de imagem'],
  },
];

const careerChapters = [
  {
    phase: 'Origem',
    title: 'O design veio primeiro.',
    copy: 'A relação com criação começou aos 13 anos. Antes de pensar em cargo, já existia curiosidade por imagem, composição e comunicação.',
  },
  {
    phase: 'Produção',
    title: 'Aprendi fazendo existir.',
    copy: 'Na comunicação visual e na gráfica, trabalhei com impressos, adesivos, lonas, fachadas, acabamento e produção. A prática trouxe precisão e senso de material.',
  },
  {
    phase: 'Comunicação',
    title: 'Imagem, texto e contexto.',
    copy: 'Passei por mercado imobiliário e comunicação pública, criando conteúdo, vídeo, editorial, campanhas, tratamento de imagens e presença digital.',
  },
  {
    phase: 'Agências',
    title: 'Marcas em ritmo real.',
    copy: 'Em agências, conectei briefings, social media, campanhas, identidade visual, branding, motion e entregas para diferentes clientes.',
  },
  {
    phase: 'Agora · EXAS',
    title: 'Dois anos criando para crescer.',
    copy: 'Hoje atuo na EXAS Assessoria de Marketing, com visão integrada de negócio, marca e experiência digital — especialmente na criação de sites.',
  },
];

const toolkit = ['Photoshop', 'Illustrator', 'InDesign', 'CorelDRAW', 'Premiere', 'After Effects', 'CapCut Pro'];

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
              Minha especialidade é criar sites. Minha base é construir <span className="text-cyan-300">marcas completas.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Sou Franco Maia, designer gráfico e estudante de Artes Visuais. Minha trajetória atravessa produção gráfica, conteúdo, vídeo, branding e comunicação — repertório que hoje aplico para criar experiências digitais com mais intenção.
            </p>
          </div>
        </div>
      </section>

      <section id="trajetoria" className="site-shell py-28 sm:py-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <span className="eyebrow">Trajetória</span>
            <h2 className="mt-7 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Da gráfica à<br /><span className="text-cyan-300">estratégia digital.</span></h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-400 lg:justify-self-end">
            Cada etapa acrescentou uma camada: produção, conteúdo, comunicação, direção de arte e tecnologia. O resultado é um trabalho que entende tanto a marca quanto a tela.
          </p>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {careerChapters.map((chapter, index) => (
            <article
              key={chapter.phase}
              className={cn(
                'story-card group relative min-h-64 overflow-hidden rounded-[1.5rem] border border-white/10 p-7 sm:p-9',
                index === 0 && 'lg:col-span-5',
                index === 1 && 'lg:col-span-7',
                index > 1 && 'lg:col-span-4',
                index === 4 && 'story-card-featured',
              )}
            >
              <span className="relative z-10 font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">{chapter.phase}</span>
              <h3 className="relative z-10 mt-10 max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{chapter.title}</h3>
              <p className="relative z-10 mt-5 max-w-xl leading-7 text-slate-400">{chapter.copy}</p>
              <span className="story-orbit absolute -bottom-20 -right-20 size-52 rounded-full border border-cyan-200/15" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-violet-300">Formação contínua</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">Design Gráfico + Artes Visuais</h3>
          </div>
          <p className="leading-7 text-slate-400">Formação técnica em Design Gráfico pelo SENAC e graduação em Artes Visuais em andamento — estudo e prática caminhando juntos.</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050a0c] py-28 sm:py-36" aria-labelledby="servicos-titulo">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
            <span className="eyebrow">O que eu faço</span>
              <h2 id="servicos-titulo" className="mt-7 text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Sites na frente.<br /><span className="text-cyan-300">Marca em tudo.</span></h2>
            </div>
            <p className="max-w-lg text-lg leading-8 text-slate-400 lg:justify-self-end">A web é o centro do meu trabalho. Branding, identidade e conteúdo dão ao projeto a personalidade que faz alguém lembrar dele.</p>
          </div>
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.number} className={cn('service-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-7 sm:p-10', index === 0 && 'lg:col-span-2 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16')}>
                <div className="relative z-10">
                  <span className="font-mono text-xs text-cyan-300">{service.number} / {service.label}</span>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{service.title}</h3>
                </div>
                <div className="relative z-10 mt-8 lg:mt-0">
                  <p className="max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">{service.copy}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.skills.map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-slate-300">{skill}</span>)}
                  </div>
                </div>
                <div className="service-glow pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="mt-16 overflow-hidden border-y border-white/10 py-5" aria-label="Ferramentas de criação">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
              {toolkit.map((tool) => <span key={tool} className="transition-colors hover:text-cyan-200">{tool}</span>)}
            </div>
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
