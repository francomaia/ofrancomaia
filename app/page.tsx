import { ArrowUpRight, Sparkles } from 'lucide-react';
import {
  siAdobeaftereffects,
  siAdobeillustrator,
  siAdobephotoshop,
  siAdobepremierepro,
  siCoreldraw,
} from 'simple-icons';
import {
  brandingProjects,
  careerChapters,
  selectedProjects,
  services,
  site,
  socials,
} from '@/lib/site';
import { BackToTop } from './back-to-top';
import { BrandMark } from './brand-mark';
import { ContactForm } from './contact-form';
import { EditorialHero } from './editorial-hero';
import { MarqueeCarousel } from './marquee-carousel';
import { SiteHeader } from './site-header';
import { SocialIcon } from './social-icon';

type Tool =
  | { name: string; icon: { path: string }; image?: never }
  | { name: string; image: string; icon?: never };

const toolkit: Tool[] = [
  { name: 'Photoshop', icon: siAdobephotoshop },
  { name: 'Illustrator', icon: siAdobeillustrator },
  { name: 'CorelDRAW', icon: siCoreldraw },
  { name: 'Premiere Pro', icon: siAdobepremierepro },
  { name: 'After Effects', icon: siAdobeaftereffects },
  { name: 'CapCut Pro', image: '/assets/tools/capcut.svg' },
];

function ToolGlyph({ tool }: { tool: Tool }) {
  return (
    <span className="tool-logo">
      {tool.icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={tool.icon.path} />
        </svg>
      ) : (
        // oxlint-disable-next-line next/no-img-element -- marca local em SVG compacto
        <img
          src={tool.image}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
      )}
    </span>
  );
}

const marqueeItems = [
  'WEB DESIGN',
  'BRANDING',
  'UI / UX',
  'MOTION',
  'DIREÇÃO CRIATIVA',
];

function optimizedProjectImage(source: string) {
  const parts = source.split('/');
  const file = parts[parts.length - 1] || 'project';
  const name = file.replace(/\.[^.]+$/, '');

  return {
    src: `/assets/optimized/${name}-1080.jpg`,
    srcSet: `/assets/optimized/${name}-640.jpg 640w, /assets/optimized/${name}-1080.jpg 1080w`,
  };
}

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>

      <SiteHeader />

      <main
        id="conteudo"
        className="overflow-clip bg-background text-foreground"
      >
        <EditorialHero />

        <div
          className="motion-marquee border-y border-white/15 py-4"
          aria-hidden="true"
        >
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex shrink-0 items-center">
                {marqueeItems.map((item) => (
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
          className="projects-showcase editorial-section relative overflow-x-clip py-16 sm:py-36"
          aria-labelledby="trabalhos-titulo"
        >
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
          <img
            src="/assets/motifs/cursor-orb-cyan-v3.png"
            alt=""
            width={420}
            height={420}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="orbit-motif absolute right-6 top-[28rem] w-40 opacity-65"
          />
          <div className="site-shell relative z-10">
            <div className="section-heading">
              <span className="micro-label">Projetos selecionados</span>
              <h2 id="trabalhos-titulo" className="display-title">
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
          </div>
          <MarqueeCarousel
            label="Projetos selecionados"
            className="mt-14 sm:mt-20"
          >
            <div className="carousel-track">
              {[0].map((pass) => (
                <div
                  key={pass}
                  className="carousel-group"
                  aria-hidden={pass === 1 ? true : undefined}
                >
                  {selectedProjects.map((project, index) => (
                    <a
                      key={`${pass}-${project.name}`}
                      href={project.href}
                      target={project.href ? '_blank' : undefined}
                      rel={project.href ? 'noreferrer' : undefined}
                      tabIndex={pass === 1 ? -1 : undefined}
                      className={`project-item group ${project.href ? '' : 'cursor-default'}`}
                      aria-label={
                        project.href
                          ? `Abrir o site de ${project.name}, ${project.sector}`
                          : `${project.name}: ${project.status}`
                      }
                      aria-disabled={project.href ? undefined : true}
                    >
                      <div className="project-image-wrap">
                        {/* oxlint-disable-next-line next/no-img-element -- capturas locais já otimizadas */}
                        <img
                          {...optimizedProjectImage(project.image)}
                          alt={`Página inicial do projeto ${project.name}`}
                          width={1200}
                          height={760}
                          sizes="(max-width: 640px) 78vw, (max-width: 900px) 56vw, 29vw"
                          loading={pass === 0 && index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="project-image"
                        />
                        <span className="project-arrow">
                          <ArrowUpRight aria-hidden="true" className="size-5" />
                        </span>
                        {project.status ? (
                          <span className="project-status">
                            {project.status}
                          </span>
                        ) : null}
                      </div>
                      <div className="project-meta">
                        <h3>{project.name}</h3>
                        <span>{project.sector}</span>
                      </div>
                      {project.note ? (
                        <p className="project-note">{project.note}</p>
                      ) : null}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </MarqueeCarousel>
        </section>

        <section
          id="branding"
          className="behance-section relative overflow-x-clip border-y border-white/15 py-16 sm:py-36"
          aria-labelledby="branding-titulo"
        >
          <div
            className="panel-spotlight panel-spotlight-right absolute inset-0"
            aria-hidden="true"
          />
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          <div className="site-shell relative z-10">
            <div className="behance-heading">
              <div>
                <span className="micro-label">Identidades visuais</span>
                <h2 id="branding-titulo" className="display-title mt-5">
                  BRANDING.
                </h2>
              </div>
              <div className="behance-intro">
                <p>
                  Marcas construídas do conceito à aplicação, com direção
                  visual, personalidade e consistência.
                </p>
                <a
                  href={site.behance}
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
          </div>

          <MarqueeCarousel
            label="Identidades visuais"
            className="carousel-stage-branding mt-16 sm:mt-24"
          >
            <div className="carousel-track">
              {[0].map((pass) => (
                <div
                  key={pass}
                  className="carousel-group"
                  aria-hidden={pass === 1 ? true : undefined}
                >
                  {brandingProjects.map((project, index) => (
                    <a
                      key={`${pass}-${project.name}`}
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={pass === 1 ? -1 : undefined}
                      className="behance-card group"
                      aria-label={`Ver ${project.name} no Behance`}
                    >
                      <div className="behance-image-wrap">
                        {/* oxlint-disable-next-line next/no-img-element -- capas do Behance ficam armazenadas localmente */}
                        <img
                          {...optimizedProjectImage(project.image)}
                          alt={`Projeto de ${project.type.toLowerCase()} ${project.name}`}
                          width={1400}
                          height={1050}
                          sizes="(max-width: 640px) 78vw, (max-width: 900px) 56vw, 26vw"
                          loading={pass === 0 && index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="behance-image"
                        />
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
              ))}
            </div>
          </MarqueeCarousel>
        </section>

        <section
          id="sobre"
          className="editorial-panel relative min-h-screen overflow-hidden border-y border-white/15 py-16 sm:py-36"
          aria-labelledby="sobre-titulo"
        >
          <div
            className="panel-spotlight absolute inset-0"
            aria-hidden="true"
          />
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          <div
            className="section-ghost-title absolute inset-x-0 top-8 text-center"
            aria-hidden="true"
          >
            SOBRE MIM
          </div>
          {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
          <img
            src="/assets/motifs/chrome-flower-cyan-v3.png"
            alt=""
            width={460}
            height={420}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="flower-motif absolute right-[6%] top-[18%] z-30 w-[clamp(7rem,12vw,12rem)]"
          />
          <div className="site-shell relative z-20 grid min-h-[42rem] items-end gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="about-character-stage relative min-h-[38rem]">
              {/* oxlint-disable-next-line next/no-img-element -- personagem gerado é um PNG local com transparência */}
              <img
                src="/assets/character/franco-cream-cyan-cutout-v3.png"
                alt="Franco Maia com roupa clara e caderno de criação"
                width={800}
                height={1200}
                loading="lazy"
                decoding="async"
                className="reveal-character absolute left-1/2 max-w-none"
              />
            </div>
            <div className="pb-6 lg:pb-16">
              <span className="micro-label">Quem cria</span>
              <h2
                id="sobre-titulo"
                className="mt-7 text-[clamp(3rem,6.7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
              >
                Especialista em sites.
                <br />
                <span className="text-cyan-300">Designer por inteiro.</span>
              </h2>
              <div className="mt-10 grid gap-7 border-t border-white/20 pt-7 sm:grid-cols-2">
                <p className="text-lg leading-8 text-white/70">
                  Sou Franco Maia, designer gráfico e estudante de Artes
                  Visuais. Minha trajetória atravessa produção gráfica,
                  conteúdo, vídeo, branding e comunicação.
                </p>
                <p className="text-lg leading-8 text-white/70">
                  Hoje aplico esse repertório para criar sites com mais
                  intenção: experiências que equilibram estratégia, identidade e
                  uma presença visual própria.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="trajetoria"
          className="editorial-section relative py-16 sm:py-36"
          aria-labelledby="trajetoria-titulo"
        >
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          <div className="site-shell relative z-10">
            <span className="micro-label">Trajetória</span>
            <h2 id="trajetoria-titulo" className="display-title mt-5">
              NO SCRIPT.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              Não foi uma linha reta. Cada fase acrescentou produção,
              repertório, visão de marca e tecnologia ao que faço hoje.
            </p>
            <ol className="career-list mt-16 sm:mt-24">
              {careerChapters.map((chapter) => (
                <li key={chapter.phase} className="career-row">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200">
                    {chapter.phase}
                  </span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="servicos"
          className="editorial-panel relative overflow-hidden border-y border-white/15 py-16 sm:py-36"
          aria-labelledby="servicos-titulo"
        >
          <div
            className="panel-spotlight panel-spotlight-right absolute inset-0"
            aria-hidden="true"
          />
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          <div className="site-shell relative z-10">
            <span className="micro-label">O que eu faço</span>
            <h2 id="servicos-titulo" className="display-title mt-5">
              WEB FIRST.
            </h2>
            <p className="scribble-note mt-5 rotate-[-3deg] text-cyan-200">
              marca em tudo.
            </p>
            <div className="service-list mt-16 sm:mt-24">
              {services.map((service) => (
                <article key={service.title} className="service-row group">
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
            <section className="tools-universe" aria-labelledby="tools-title">
              <h3 id="tools-title" className="sr-only">
                Ferramentas de criação
              </h3>
              <div className="tools-universe-glow" aria-hidden="true" />
              <div className="tools-floating-row" aria-hidden="true">
                {toolkit.map((tool) => (
                  <span key={tool.name} className="tools-floating-item">
                    <ToolGlyph tool={tool} />
                  </span>
                ))}
              </div>
              <ul className="sr-only" aria-label="Ferramentas de criação">
                {toolkit.map((tool) => (
                  <li key={tool.name}>{tool.name}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section
          id="contato"
          className="cta-section relative overflow-hidden py-16 sm:py-36"
          aria-labelledby="contato-titulo"
        >
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          <div
            className="cta-glow absolute left-1/2 top-1/2"
            aria-hidden="true"
          />
          {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
          <img
            src="/assets/motifs/cursor-orb-cyan-v3.png"
            alt=""
            width={420}
            height={420}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="cta-orb absolute right-[8%] top-[13%] w-[clamp(8rem,15vw,15rem)]"
          />
          <div className="site-shell relative z-10">
            <span className="micro-label">Seu próximo projeto</span>
            <h2 id="contato-titulo" className="display-title mt-5 max-w-[9ch]">
              VAMOS CRIAR.
            </h2>

            <div className="contact-layout mt-12 sm:mt-16">
              <div className="contact-aside">
                <p className="text-xl leading-8 text-white/70">
                  Se a ideia precisa parecer viva, ter personalidade e funcionar
                  de verdade, a conversa começa aqui.
                </p>
                <dl className="contact-facts">
                  <div>
                    <dt>Resposta</dt>
                    <dd>Costumo responder em até 1 dia útil.</dd>
                  </div>
                  <div>
                    <dt>Atendimento</dt>
                    <dd>Remoto, para todo o Brasil.</dd>
                  </div>
                  <div>
                    <dt>Direto</dt>
                    <dd>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <ContactForm />
            </div>

            <BrandMark className="footer-brand mt-20" labelled />
          </div>
        </section>
      </main>

      <footer className="site-shell flex flex-col gap-5 border-t border-white/15 py-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="footer-socials">
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
      </footer>

      <BackToTop />
    </>
  );
}
