import type React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import {
  siAdobeaftereffects,
  siAdobeillustrator,
  siAdobephotoshop,
  siAdobepremierepro,
  siCoreldraw,
  siWhatsapp,
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
import { CycleObserver } from './cycle-observer';
import { BrandMark } from './brand-mark';
import { ContactForm } from './contact-form';
import { EditorialHero } from './editorial-hero';
import { InstagramFeed } from './instagram-feed';
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

function slideCycle(slides: readonly string[] | undefined, index: number) {
  const count = slides?.length ? slides.length + 1 : 0;
  return {
    className: count > 1 ? ` cycle cycle-${Math.min(count, 4)}` : '',
    style: count > 1 ? ({ '--o': `${(index % 5) * 1.3}s` } as React.CSSProperties) : undefined,
  };
}

function SlideImages({ slides }: { slides?: readonly string[] }) {
  if (!slides?.length) return null;
  return (
    <>
      {slides.slice(0, 3).map((src, i) => (
        // oxlint-disable-next-line next/no-img-element -- imagens extras do projeto, já otimizadas
        <img
          key={src}
          src={src}
          srcSet={`${src.replace(/\.jpg$/, '-640.jpg')} 640w, ${src} 1080w`}
          sizes="(max-width: 640px) 78vw, 28vw"
          alt=""
          aria-hidden="true"
          width={1080}
          height={810}
          loading="lazy"
          decoding="async"
          className="cycle-img"
          style={{ '--i': i + 1 } as React.CSSProperties}
        />
      ))}
    </>
  );
}

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
            chibi={[
              { src: '/assets/character/chibi/chibi-5.webp', fala: 'Deixa eu adivinhar: você quer uma marca com história?' },
              { src: '/assets/character/chibi/galinha.webp', fala: 'Calma! Sua marca não precisa sair correndo atrás de cliente.' },
              { src: '/assets/character/chibi/estudando.webp', fala: 'Antes do logo, eu estudo o seu negócio. Sério.' },
              { src: '/assets/character/chibi/chibi-4.webp', fala: 'Logo com cara de 2010? Bora reformar.' },
              { src: '/assets/character/chibi/chibi-1.webp', fala: 'Curtiu? Bora criar a sua.' },
            ]}
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
                      target={project.href.startsWith('/') ? undefined : '_blank'}
                      rel={project.href.startsWith('/') ? undefined : 'noreferrer'}
                      tabIndex={pass === 1 ? -1 : undefined}
                      className="behance-card group"
                      aria-label={
                        project.href.startsWith('/')
                          ? `Ver o projeto ${project.name}`
                          : `Ver ${project.name} no Behance`
                      }
                    >
                      <div
                        className={`behance-image-wrap${'video' in project && project.video ? '' : slideCycle('slides' in project ? project.slides : undefined, index).className}`}
                        style={'video' in project && project.video ? undefined : slideCycle('slides' in project ? project.slides : undefined, index).style}
                      >
                        {'video' in project && project.video ? (
                          <video
                            src={project.video}
                            poster={optimizedProjectImage(project.image).src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={`Motion do projeto ${project.name}`}
                            className="behance-image"
                          />
                        ) : (
                        // oxlint-disable-next-line next/no-img-element -- capas do Behance ficam armazenadas localmente
                        <img
                          {...optimizedProjectImage(project.image)}
                          alt={`Projeto de ${project.type.toLowerCase()} ${project.name}`}
                          width={1400}
                          height={1050}
                          sizes="(max-width: 640px) 78vw, (max-width: 900px) 56vw, 26vw"
                          loading={pass === 0 && index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="behance-image cycle-img"
                          style={{ '--i': 0 } as React.CSSProperties}
                        />
                        )}
                        {'slides' in project ? (
                          <SlideImages slides={project.slides} />
                        ) : null}
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
          id="web"
          className="projects-showcase editorial-section relative overflow-x-clip py-16 sm:py-36"
          aria-labelledby="trabalhos-titulo"
        >
          <div className="noise-layer absolute inset-0" aria-hidden="true" />
          {/* oxlint-disable-next-line next/no-img-element -- motivo gerado é um PNG local com transparência */}
          <img
            src="/assets/motifs/cursor-orb-cyan-v3.webp"
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
              <span className="micro-label">Sites e landing pages</span>
              <h2 id="trabalhos-titulo" className="display-title">
                WEB
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
            chibi={[
              { src: '/assets/character/chibi/chibi-3.webp', fala: 'Deixa eu adivinhar: você precisa de um site assim?' },
              { src: '/assets/character/chibi/noite-pc.webp', fala: 'Precisa de um e-commerce funcional?! Então bora.' },
              { src: '/assets/character/chibi/noite-notebook.webp', fala: 'Landing page que vende até de madrugada.' },
              { src: '/assets/character/chibi/dormindo.webp', fala: 'Site lento dá sono no cliente. O seu não vai.' },
              { src: '/assets/character/chibi/chibi-2.webp', fala: 'Curtiu algum? Me chama que a gente faz o seu.' },
            ]}
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
                      <div
                        className={`project-image-wrap${slideCycle(project.slides, index).className}`}
                        style={slideCycle(project.slides, index).style}
                      >
                        {/* oxlint-disable-next-line next/no-img-element -- capturas locais já otimizadas */}
                        <img
                          {...optimizedProjectImage(project.image)}
                          alt={`Página inicial do projeto ${project.name}`}
                          width={1200}
                          height={760}
                          sizes="(max-width: 640px) 78vw, (max-width: 900px) 56vw, 29vw"
                          loading={pass === 0 && index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="project-image cycle-img"
                          style={{ '--i': 0 } as React.CSSProperties}
                        />
                        <SlideImages slides={project.slides} />
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
            src="/assets/motifs/chrome-flower-cyan-v3.webp"
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
                src="/assets/character/franco-3d-v4-cadeira.webp"
                srcSet="/assets/character/franco-3d-v4-cadeira-480.webp 480w, /assets/character/franco-3d-v4-cadeira-768.webp 768w, /assets/character/franco-3d-v4-cadeira.webp 1024w"
                sizes="(max-width: 640px) 70vw, 34vw"
                alt="Franco Maia em 3D, trabalhando no notebook numa cadeira de escritório"
                width={1024}
                height={1536}
                loading="lazy"
                decoding="async"
                className="reveal-character float-space float-space-slow absolute left-1/2 max-w-none"
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

        <InstagramFeed />

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
            src="/assets/motifs/cursor-orb-cyan-v3.webp"
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

      <CycleObserver />
      <BackToTop />
      <a
        className="whatsapp-float"
        href="https://wa.me/5564996105683"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com Franco Maia pelo WhatsApp"
        title="Conversar pelo WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={siWhatsapp.path} />
        </svg>
      </a>
    </>
  );
}
