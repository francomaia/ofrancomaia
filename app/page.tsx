import { ArrowUpRight, Sparkles } from 'lucide-react';
import {
  siAdobeaftereffects,
  siAdobeillustrator,
  siAdobeindesign,
  siAdobephotoshop,
  siAdobepremierepro,
  siCoreldraw,
} from 'simple-icons';
import { BrandMark } from './brand-mark';
import { EditorialHero } from './editorial-hero';

const selectedProjects = [
  {
    name: 'Exas Company',
    sector: 'Assessoria de Marketing',
    image: '/assets/cases/exas.avif',
    href: 'https://exascompany.com.br/',
  },
  {
    name: 'Agronova Transportes',
    sector: 'Logística e Transporte',
    image: '/assets/cases/agronova.avif',
    href: 'https://agronova.exascompany.com.br/',
  },
  {
    name: 'Realiza Multimarcas',
    sector: 'Revenda de Veículos',
    image: '/assets/cases/realiza.avif',
    href: 'https://seminovosrealizajti.com.br/',
  },
  {
    name: 'Immune',
    sector: 'Certificação Digital',
    image: '/assets/cases/immune.avif',
    href: 'https://certificadoimmune.com.br/',
  },
  {
    name: 'Tradição Indústria',
    sector: 'Peças Agrícolas',
    image: '/assets/cases/tradicao.avif',
    href: 'https://tradicaoind.exascompany.com.br/',
  },
  {
    name: 'Oral Implant',
    sector: 'Odontologia',
    image: '/assets/cases/oral-implant.avif',
    href: 'https://clinicaoralimplant.com.br/',
  },
];

const brandingProjects = [
  {
    name: 'GR Treinador',
    type: 'Branding',
    image: '/assets/behance/gr-treinador.png',
    href: 'https://www.behance.net/gallery/243778083/GR-Treinador-(Gabriel-Rezende)-BRAND',
  },
  {
    name: 'Banda Rota Zero 60',
    type: 'Logotipo',
    image: '/assets/behance/rota-zero-60.png',
    href: 'https://www.behance.net/gallery/223102331/BANDA-ROTA-ZERO-60-LOGOTIPO',
  },
  {
    name: 'Wave Publicidade',
    type: 'Identidade visual',
    image: '/assets/behance/wave-publicidade.png',
    href: 'https://www.behance.net/gallery/212088005/IDENTIDADE-VISUAL-WAVE-PUBLICIDADE',
  },
  {
    name: 'Westbull Churrascaria',
    type: 'Identidade visual',
    image: '/assets/behance/westbull.png',
    href: 'https://www.behance.net/gallery/220994247/WESTBULL-CHURRASCARIA-IDENTIDADE',
  },
  {
    name: 'Ottoneli Beauty',
    type: 'Identidade visual',
    image: '/assets/behance/ottoneli-beauty.png',
    href: 'https://www.behance.net/gallery/222989543/CARTAO-DE-VISITA-OTTONELI-BEAUTY',
  },
  {
    name: 'West Burguer',
    type: 'Identidade visual',
    image: '/assets/behance/west-burguer.png',
    href: 'https://www.behance.net/gallery/217884215/WEST-BURGUER-ID',
  },
  {
    name: 'Jânio Eduardo',
    type: 'Posicionamento de imagem',
    image: '/assets/behance/janio-eduardo.jpg',
    href: 'https://www.behance.net/gallery/192031601/JANIO-EDUARDO-POSICIONAMENTO-DE-IMAGEM',
  },
  {
    name: 'Via Animale',
    type: 'Identidade visual',
    image: '/assets/behance/via-animale.png',
    href: 'https://www.behance.net/gallery/213802223/VIA-ANIMALE-IDENTIDADE',
  },
];

const services = [
  {
    number: '01',
    title: 'Sites & Landing Pages',
    copy: 'Estratégia, arquitetura, interface e responsividade para transformar uma marca em uma experiência digital clara e convincente.',
    skills: ['Web design', 'UI / UX', 'Responsividade', 'Conversão'],
  },
  {
    number: '02',
    title: 'Branding & Identidade',
    copy: 'Conceito, direção de arte e sistemas visuais que fazem a marca ser reconhecida antes mesmo de alguém ler o nome.',
    skills: ['Branding', 'Direção de arte', 'Identidade', 'Campanhas'],
  },
  {
    number: '03',
    title: 'Motion & Conteúdo',
    copy: 'Vídeos, animações e peças digitais que estendem a personalidade da marca e colocam a comunicação em movimento.',
    skills: ['Social media', 'Edição', 'Motion', 'Imagem'],
  },
];

const careerChapters = [
  {
    phase: '01 / Origem',
    title: 'O design veio primeiro.',
    copy: 'Comecei a criar aos 13 anos, movido por imagem, composição e curiosidade.',
  },
  {
    phase: '02 / Produção',
    title: 'Aprendi fazendo existir.',
    copy: 'Comunicação visual, gráfica, impressos, adesivos, fachadas e acabamento trouxeram precisão.',
  },
  {
    phase: '03 / Comunicação',
    title: 'Imagem, texto e contexto.',
    copy: 'Passei por conteúdo, vídeo, editorial, campanhas, mercado imobiliário e comunicação pública.',
  },
  {
    phase: '04 / Agências',
    title: 'Marcas em ritmo real.',
    copy: 'Conectei briefing, social, branding, motion e entregas para negócios de diferentes segmentos.',
  },
  {
    phase: '05 / Agora',
    title: 'Há cerca de um ano e meio na EXAS.',
    copy: 'Hoje uno negócio, marca e experiência digital, com a criação de sites no centro do meu trabalho.',
  },
];

const toolkit = [
  { name: 'Photoshop', icon: siAdobephotoshop },
  { name: 'Illustrator', icon: siAdobeillustrator },
  { name: 'InDesign', icon: siAdobeindesign },
  { name: 'CorelDRAW', icon: siCoreldraw },
  { name: 'Premiere Pro', icon: siAdobepremierepro },
  { name: 'After Effects', icon: siAdobeaftereffects },
  { name: 'CapCut Pro', image: '/assets/tools/capcut.svg' },
];

export default function Home() {
  return (
    <main id="conteudo" className="overflow-clip bg-background text-foreground">
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-[100]">
        <div className="site-shell flex h-20 items-center justify-between border-b border-white/15">
          <a href="#inicio" aria-label="Franco Maia — início">
            <BrandMark className="h-11 w-auto" />
          </a>
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/55 md:flex"
          >
            <a href="#trabalhos">Trabalhos</a>
            <a href="#branding">Branding</a>
            <a href="#sobre">Sobre</a>
            <a href="#trajetoria">Trajetória</a>
          </nav>
          <a
            href="https://www.instagram.com/ofrancomaia"
            target="_blank"
            rel="noreferrer"
            className="header-contact group"
          >
            Contato{' '}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </a>
        </div>
      </header>

      <EditorialHero />

      <div
        className="motion-marquee border-y border-white/15 py-4"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 items-center">
              {[
                'WEB DESIGN',
                'BRANDING',
                'UI / UX',
                'MOTION',
                'DIREÇÃO CRIATIVA',
              ].map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-8 px-8"
                >
                  {item} <Sparkles className="size-4 text-cyan-300" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section
        id="trabalhos"
        className="editorial-section relative py-24 sm:py-36"
      >
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        {/* oxlint-disable-next-line next/no-img-element -- generated motif is a local transparent PNG */}
        <img
          src="/assets/motifs/cursor-orb-cyan-v3.png"
          alt=""
          width={420}
          height={420}
          loading="lazy"
          aria-hidden="true"
          className="orbit-motif absolute right-6 top-[28rem] w-40 opacity-65"
        />
        <div className="site-shell relative z-10">
          <div className="section-heading">
            <span className="micro-label">01 / Projetos selecionados</span>
            <h2 className="display-title">
              TRABA
              <br className="sm:hidden" />
              LHOS
            </h2>
            <p className="scribble-note ml-auto max-w-[14rem] rotate-[-4deg] text-right">
              sites reais.
              <br />
              problemas diferentes.
            </p>
          </div>
          <div className="project-grid mt-16 sm:mt-24">
            {selectedProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={`project-item project-item-${(index % 4) + 1} group`}
                aria-label={`Abrir o site de ${project.name}`}
              >
                <div className="project-image-wrap">
                  {/* oxlint-disable-next-line next/no-img-element -- local portfolio capture is pre-optimized AVIF */}
                  <img
                    src={project.image}
                    alt={`Página inicial do projeto ${project.name}`}
                    width={1200}
                    height={760}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="project-image"
                  />
                  <span className="project-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-arrow">
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <div className="project-meta mt-4 flex items-start justify-between gap-4 border-t border-white/20 pt-4">
                  <h3 className="text-xl font-bold uppercase tracking-[-0.04em] sm:text-2xl">
                    {project.name}
                  </h3>
                  <span className="text-right font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/40">
                    {project.sector}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="branding"
        className="behance-section relative overflow-hidden border-y border-white/15 py-24 sm:py-36"
      >
        <div className="panel-spotlight panel-spotlight-right absolute inset-0" aria-hidden="true" />
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        <div className="site-shell relative z-10">
          <div className="behance-heading">
            <div>
              <span className="micro-label">02 / Identidades visuais</span>
              <h2 className="display-title mt-5">BRANDING.</h2>
            </div>
            <div className="behance-intro">
              <p>
                Marcas construídas do conceito à aplicação, com direção visual,
                personalidade e consistência.
              </p>
              <a
                href="https://www.behance.net/francomaia"
                target="_blank"
                rel="noreferrer"
                className="editorial-button group"
              >
                Ver perfil no Behance
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            </div>
          </div>

          <div className="behance-grid mt-16 sm:mt-24">
            {brandingProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="behance-card group"
                aria-label={`Ver ${project.name} no Behance`}
              >
                <div className="behance-image-wrap">
                  {/* oxlint-disable-next-line next/no-img-element -- Behance project covers are stored locally */}
                  <img
                    src={project.image}
                    alt={`Projeto de ${project.type.toLowerCase()} ${project.name}`}
                    width={1400}
                    height={1050}
                    loading="lazy"
                    className="behance-image"
                  />
                  <span className="behance-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="behance-arrow">
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <div className="behance-meta">
                  <h3>{project.name}</h3>
                  <span>{project.type}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="editorial-panel relative min-h-screen overflow-hidden border-y border-white/15 py-24 sm:py-36"
      >
        <div className="panel-spotlight absolute inset-0" aria-hidden="true" />
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        <div
          className="section-ghost-title absolute inset-x-0 top-8 text-center"
          aria-hidden="true"
        >
          SOBRE MIM
        </div>
        {/* oxlint-disable-next-line next/no-img-element -- generated motif is a local transparent PNG */}
        <img
          src="/assets/motifs/chrome-flower-cyan-v3.png"
          alt=""
          width={460}
          height={420}
          loading="lazy"
          aria-hidden="true"
          className="flower-motif absolute right-[6%] top-[18%] z-30 w-[clamp(7rem,12vw,12rem)]"
        />
        <div className="site-shell relative z-20 grid min-h-[42rem] items-end gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="about-character-stage relative min-h-[38rem]">
            {/* oxlint-disable-next-line next/no-img-element -- generated character is a local transparent PNG */}
            <img
              src="/assets/character/franco-cream-cyan-cutout-v3.png"
              alt="Franco Maia com roupa clara e caderno de criação"
              width={800}
              height={1200}
              loading="lazy"
              className="reveal-character absolute left-1/2 max-w-none"
            />
          </div>
          <div className="pb-6 lg:pb-16">
            <span className="micro-label">03 / Quem cria</span>
            <h2 className="mt-7 text-[clamp(3rem,6.7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
              Especialista em sites.
              <br />
              <span className="text-cyan-300">Designer por inteiro.</span>
            </h2>
            <div className="mt-10 grid gap-7 border-t border-white/20 pt-7 sm:grid-cols-2">
              <p className="text-lg leading-8 text-white/70">
                Sou Franco Maia, designer gráfico e estudante de Artes Visuais.
                Minha trajetória atravessa produção gráfica, conteúdo, vídeo,
                branding e comunicação.
              </p>
              <p className="text-lg leading-8 text-white/70">
                Hoje aplico esse repertório para criar sites com mais intenção —
                experiências que equilibram estratégia, identidade e uma
                presença visual própria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="trajetoria"
        className="editorial-section relative py-24 sm:py-36"
      >
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        <div className="site-shell relative z-10">
          <span className="micro-label">04 / Trajetória</span>
          <h2 className="display-title mt-5">NO SCRIPT.</h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
            Não foi uma linha reta. Cada fase acrescentou produção, repertório,
            visão de marca e tecnologia ao que faço hoje.
          </p>
          <div className="career-list mt-16 sm:mt-24">
            {careerChapters.map((chapter) => (
              <article key={chapter.phase} className="career-row">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200">
                  {chapter.phase}
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="editorial-panel relative overflow-hidden border-y border-white/15 py-24 sm:py-36"
        aria-labelledby="servicos-titulo"
      >
        <div
          className="panel-spotlight panel-spotlight-right absolute inset-0"
          aria-hidden="true"
        />
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        <div className="site-shell relative z-10">
          <span className="micro-label">05 / O que eu faço</span>
          <h2 id="servicos-titulo" className="display-title mt-5">
            WEB FIRST.
          </h2>
          <p className="scribble-note mt-5 rotate-[-3deg] text-cyan-200">
            marca em tudo.
          </p>
          <div className="service-list mt-16 sm:mt-24">
            {services.map((service) => (
              <article key={service.number} className="service-row group">
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <div className="service-skills">
                  {service.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <ArrowUpRight aria-hidden="true" className="service-icon" />
              </article>
            ))}
          </div>
          <ul className="tool-strip mt-20" aria-label="Ferramentas de criação">
            {toolkit.map((tool) => (
              <li key={tool.name} className="tool-item">
                <span className="tool-logo" aria-hidden="true">
                  {'icon' in tool ? (
                    <svg viewBox="0 0 24 24" role="img">
                      <path fill="currentColor" d={tool.icon.path} />
                    </svg>
                  ) : (
                    // oxlint-disable-next-line next/no-img-element -- local brand mark is a compact SVG asset
                    <img src={tool.image} alt="" width={48} height={48} />
                  )}
                </span>
                <span>{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contato"
        className="cta-section relative min-h-screen overflow-hidden py-24 sm:py-36"
      >
        <div className="noise-layer absolute inset-0" aria-hidden="true" />
        <div
          className="cta-glow absolute left-1/2 top-1/2"
          aria-hidden="true"
        />
        {/* oxlint-disable-next-line next/no-img-element -- generated floating motif is a local transparent PNG */}
        <img
          src="/assets/motifs/cursor-orb-cyan-v3.png"
          alt=""
          width={420}
          height={420}
          loading="lazy"
          aria-hidden="true"
          className="cta-orb absolute right-[8%] top-[13%] w-[clamp(8rem,15vw,15rem)]"
        />
        <div className="site-shell relative z-10 flex min-h-[70vh] flex-col justify-between">
          <span className="micro-label">06 / Seu próximo projeto</span>
          <div>
            <h2 className="display-title max-w-[9ch]">VAMOS CRIAR.</h2>
            <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-white/20 pt-8 sm:flex-row sm:items-end">
              <p className="max-w-xl text-xl leading-8 text-white/65">
                Se a ideia precisa parecer viva, ter personalidade e funcionar
                de verdade, a conversa começa aqui.
              </p>
              <a
                href="https://www.instagram.com/ofrancomaia"
                target="_blank"
                rel="noreferrer"
                className="editorial-button editorial-button-light group"
              >
                Falar no Instagram{' '}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            </div>
          </div>
          <BrandMark className="footer-brand mt-16" labelled />
        </div>
      </section>

      <footer className="site-shell flex flex-col gap-5 border-t border-white/15 py-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Franco Maia</p>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em]">
          <a href="#inicio">Voltar ao topo</a>
          <a
            href="https://www.instagram.com/ofrancomaia"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </footer>
    </main>
  );
}
