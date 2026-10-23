import React from 'react';
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  Sequence,
  interpolate,
  registerRoot,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ==========================================================================
   Brand reel — ofrancomaia.com como plataforma
   1080 × 1920, 30 fps, 30 s

   Tudo vem do site: cores (#050505, #f8f7f4, ciano #67e8f9), Archivo,
   nome em contorno, cards com thumb + nome light, balão de fala de vidro,
   mini Franco, logos e capturas reais da versão celular.

   Área segura de Reels: textos entre y 250 e y 1480, x 90 a 990.
   ========================================================================== */

const W = 1080;
const H = 1920;
const FPS = 30;
const DUR = 900;

const PRETO = '#050505';
const BRANCO = '#f8f7f4';
const CIANO = '#67e8f9';

const fonte = staticFile('reel/fonts/Archivo-Variable.ttf');
const FontFace = () => (
  <style>{`@font-face{font-family:'Archivo';src:url('${fonte}') format('truetype');font-weight:100 900;font-stretch:62% 125%;}`}</style>
);

const ease = Easing.bezier(0.2, 0.8, 0.2, 1);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const lerp = (f: number, a: number, b: number, from: number, to: number, e = ease) =>
  interpolate(f, [a, b], [from, to], { ...clamp, easing: e });

/** Entra e sai suavemente: a cena que sai some antes da próxima ganhar corpo, sem fantasmas sobrepostos. */
const janela = (f: number, dur: number, entrada = 14, saida = 8) =>
  interpolate(f, [5, 5 + entrada, dur - 6 - saida, dur - 6], [0, 1, 1, 0], clamp);

/* ---------------------------- elementos comuns ---------------------------- */

const Fundo: React.FC = () => {
  const f = useCurrentFrame();
  const x = 50 + Math.sin(f / 90) * 18;
  const y = 38 + Math.cos(f / 110) * 10;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 38% at ${x}% ${y}%, rgba(34,211,238,0.16), transparent 70%),
                     radial-gradient(50% 30% at ${100 - x}% 82%, rgba(103,232,249,0.07), transparent 70%), ${PRETO}`,
      }}
    />
  );
};

/** Grão leve, igual à `noise-layer` do site. */
const Grao: React.FC = () => (
  <AbsoluteFill
    style={{
      opacity: 0.07,
      mixBlendMode: 'overlay',
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
);

const Kicker: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      fontFamily: 'Archivo',
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: CIANO,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Título grande do site: Archivo black, caixa alta, tracking apertado. */
const Display: React.FC<{ children: React.ReactNode; size: number; outline?: boolean; style?: React.CSSProperties }> = ({
  children,
  size,
  outline,
  style,
}) => (
  <div
    style={{
      fontFamily: 'Archivo',
      fontWeight: 900,
      fontSize: size,
      lineHeight: 0.86,
      letterSpacing: '-0.06em',
      textTransform: 'uppercase',
      color: outline ? 'transparent' : BRANCO,
      WebkitTextStroke: outline ? `3px ${BRANCO}` : undefined,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Revela um texto de baixo para cima, por máscara. */
const Mascara: React.FC<{ progresso: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  progresso,
  children,
  style,
}) => (
  <div style={{ overflow: 'hidden', paddingBottom: '0.08em', ...style }}>
    <div style={{ transform: `translateY(${(1 - progresso) * 105}%)` }}>{children}</div>
  </div>
);

/** Fala do mini Franco: balão de vidro, palavra por palavra, igual ao site. */
const Fala: React.FC<{ texto: string; inicio: number; style?: React.CSSProperties }> = ({ texto, inicio, style }) => {
  const f = useCurrentFrame() - inicio;
  const palavras = texto.split(' ');
  const caixa = interpolate(f, [0, 10], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        maxWidth: 560,
        padding: '22px 30px',
        borderRadius: '30px 30px 30px 8px',
        border: '1.5px solid rgba(255,255,255,0.18)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.2), 0 24px 50px -24px rgba(0,0,0,0.85)',
        backdropFilter: 'blur(18px)',
        fontFamily: 'Archivo',
        fontWeight: 300,
        fontSize: 38,
        lineHeight: 1.3,
        color: '#fff',
        opacity: caixa,
        transform: `translateY(${(1 - caixa) * 14}px)`,
        ...style,
      }}
    >
      {palavras.map((p, i) => {
        const t = interpolate(f, [6 + i * 2.2, 14 + i * 2.2], [0, 1], clamp);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              opacity: t,
              filter: `blur(${(1 - t) * 6}px)`,
              transform: `translateY(${(1 - t) * 0.35}em)`,
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

/** Card do site: thumb arredondada, sombra embaixo, nome light por cima. */
const Card: React.FC<{
  imagens: string[];
  nome: string;
  largura: number;
  f: number;
  ritmo?: number;
  atraso?: number;
}> = ({ imagens, nome, largura, f, ritmo = 54, atraso = 0 }) => {
  const altura = largura * 0.75;
  const local = Math.max(0, f + atraso);
  const idx = Math.floor(local / ritmo) % imagens.length;
  const fase = (local % ritmo) / ritmo;
  const entrada = interpolate(fase, [0, 0.16], [0, 1], clamp);
  const brilho = interpolate(fase, [0, 0.22], [0.75, 0], clamp);
  const anterior = imagens[(idx - 1 + imagens.length) % imagens.length];
  return (
    <div style={{ position: 'relative', width: largura, height: altura, flex: 'none' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 34,
          overflow: 'hidden',
          boxShadow: '0 50px 60px -40px rgba(0,0,0,0.95), 0 20px 40px -26px rgba(0,0,0,0.8)',
          background: '#111',
        }}
      >
        <Img src={staticFile(anterior)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Img
          src={staticFile(imagens[idx])}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: imagens.length > 1 ? entrada : 1 }}
        />
        {imagens.length > 1 ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              mixBlendMode: 'screen',
              background: 'radial-gradient(circle at 50% 55%, rgba(103,232,249,0.55), rgba(255,255,255,0.1) 40%, transparent 70%)',
              opacity: brilho,
            }}
          />
        ) : null}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.66), rgba(0,0,0,0.15) 36%, transparent 60%)' }} />
        <div
          style={{
            position: 'absolute',
            left: 32,
            right: 32,
            bottom: 26,
            fontFamily: 'Archivo',
            fontWeight: 300,
            fontSize: 38,
            color: '#fff',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 14px rgba(0,0,0,0.5)',
          }}
        >
          {nome}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- cenas -------------------------------- */

/** 1. Abertura: assinatura, FRANCO / MAIA e o personagem 3D subindo. */
const Abertura: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const linha = lerp(f, 4, 26, 0, 1);
  const assinatura = lerp(f, 12, 40, 0, 1);
  const franco = spring({ frame: f - 30, fps, config: { damping: 200, mass: 0.9 } });
  const maia = spring({ frame: f - 42, fps, config: { damping: 200, mass: 0.9 } });
  const boneco = spring({ frame: f - 50, fps, config: { damping: 22, stiffness: 70 } });
  const flutua = Math.sin(f / 16) * 10;
  const saida = interpolate(f, [dur - 18, dur - 7], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: 1 - saida, transform: `scale(${1 - saida * 0.06})` }}>
      <div
        style={{
          position: 'absolute',
          left: W / 2 - 300,
          top: 300,
          width: 600,
          height: 2,
          background: CIANO,
          boxShadow: `0 0 18px ${CIANO}`,
          transform: `scaleX(${linha})`,
          opacity: 1 - lerp(f, 40, 60, 0, 1),
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 200,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          clipPath: `inset(0 ${(1 - assinatura) * 100}% 0 0)`,
        }}
      >
        <Img src={staticFile('assets/brand/franco-signature-white.png')} style={{ width: 360 }} />
      </div>
      <div style={{ position: 'absolute', top: 520, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Mascara progresso={franco}>
          <Display size={208}>Franco</Display>
        </Mascara>
      </div>
      <Img
        src={staticFile('assets/character/franco-3d-v4.webp')}
        style={{
          position: 'absolute',
          left: W / 2 - 300,
          top: 640,
          width: 600,
          transform: `translateY(${(1 - boneco) * 520 + flutua}px) rotate(${Math.sin(f / 22) * 1.4}deg)`,
          filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.75))',
        }}
      />
      <div style={{ position: 'absolute', top: 1180, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Mascara progresso={maia}>
          <Display size={208} outline>
            Maia
          </Display>
        </Mascara>
      </div>
      <Img
        src={staticFile('assets/motifs/chrome-flower-cyan-v3.webp')}
        style={{
          position: 'absolute',
          right: 70,
          top: 430 - f * 0.6,
          width: 190,
          opacity: lerp(f, 56, 76, 0, 1),
          transform: `rotate(${f * 0.8}deg)`,
        }}
      />
      <Img
        src={staticFile('assets/motifs/cursor-orb-cyan-v3.webp')}
        style={{
          position: 'absolute',
          left: 60,
          top: 980 + f * 0.4,
          width: 170,
          opacity: lerp(f, 62, 82, 0, 1),
        }}
      />
    </AbsoluteFill>
  );
};

/** 2. Proposta: a frase do site, palavra por palavra. */
const Proposta: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const frase = 'Sites, marcas e experiências digitais construídas com direção, personalidade e movimento.'.split(' ');
  const destaque = new Set(['direção,', 'personalidade', 'movimento.']);
  const pilula = lerp(f, 6, 22, 0, 1);
  return (
    <AbsoluteFill style={{ opacity: janela(f, dur), padding: '0 100px', justifyContent: 'center' }}>
      <Kicker style={{ opacity: lerp(f, 0, 14, 0, 1), marginBottom: 40 }}>Designer gráfico · Web creator · Branding</Kicker>
      <div style={{ fontFamily: 'Archivo', fontWeight: 300, fontSize: 76, lineHeight: 1.12, color: BRANCO, letterSpacing: '-0.02em' }}>
        {frase.map((p, i) => {
          const t = interpolate(f, [12 + i * 4, 24 + i * 4], [0, 1], clamp);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.24em',
                opacity: t,
                filter: `blur(${(1 - t) * 10}px)`,
                transform: `translateY(${(1 - t) * 0.4}em)`,
                color: destaque.has(p) ? CIANO : BRANCO,
                fontWeight: destaque.has(p) ? 500 : 300,
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 60,
          alignSelf: 'flex-start',
          padding: '22px 34px',
          borderRadius: 999,
          border: '1.5px solid rgba(255,255,255,0.22)',
          background: 'rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.18)',
          fontFamily: 'Archivo',
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: BRANCO,
          opacity: interpolate(f, [70, 86], [0, 1], clamp) * pilula,
          transform: `translateY(${(1 - interpolate(f, [70, 86], [0, 1], clamp)) * 20}px)`,
        }}
      >
        Web designer &amp; diretor de arte
      </div>
    </AbsoluteFill>
  );
};

/** 3. O site de verdade: o celular rolando pelas seções. */
const telas = [
  { src: 'reel-brand/tela-hero.png', rotulo: 'Início' },
  { src: 'reel-brand/tela-branding-titulo.png', rotulo: 'Branding' },
  { src: 'reel-brand/tela-branding-carrossel.png', rotulo: 'Projetos' },
  { src: 'reel-brand/tela-web-carrossel.png', rotulo: 'Web' },
  { src: 'reel-brand/tela-sobre.png', rotulo: 'Sobre' },
];
const Celular: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame: f, fps, config: { damping: 200 } });
  const larguraTela = 520;
  const alturaTela = larguraTela * (844 / 390);
  const porTela = (dur - 24) / telas.length;
  // rolagem contínua: cada tela sobe para dar lugar à próxima
  const atual = Math.min(telas.length - 1, Math.max(0, Math.floor((f - 12) / porTela)));
  const dentro = ((f - 12) % porTela) / porTela;
  const troca = interpolate(dentro, [0.66, 1], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const deslocamento = (atual + (atual < telas.length - 1 ? troca : 0)) * alturaTela;
  const giro = Math.sin(f / 40) * 3;
  return (
    <AbsoluteFill style={{ opacity: janela(f, dur, 16) }}>
      <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center' }}>
        <Kicker>O site no celular</Kicker>
        <div style={{ height: 70, overflow: 'hidden', marginTop: 16 }}>
          <div style={{ transform: `translateY(${-(atual + (atual < telas.length - 1 ? troca : 0)) * 70}px)` }}>
            {telas.map((t) => (
              <div key={t.src} style={{ height: 70, fontFamily: 'Archivo', fontWeight: 900, fontSize: 60, letterSpacing: '-0.04em', textTransform: 'uppercase', color: BRANCO }}>
                {t.rotulo}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: W / 2 - larguraTela / 2 - 18,
          top: 400,
          width: larguraTela + 36,
          height: alturaTela + 36,
          borderRadius: 86,
          padding: 18,
          background: 'linear-gradient(160deg, #2a2d31, #0c0d0f 40%, #1b1d20)',
          boxShadow: `0 80px 120px -50px rgba(0,0,0,0.95), 0 0 0 2px rgba(255,255,255,0.08), 0 0 90px -30px ${CIANO}`,
          transform: `perspective(2200px) rotateY(${giro}deg) translateY(${(1 - entrada) * 900}px) scale(${0.86 + entrada * 0.14})`,
        }}
      >
        <div style={{ position: 'relative', width: larguraTela, height: alturaTela, borderRadius: 70, overflow: 'hidden', background: PRETO }}>
          <div style={{ transform: `translateY(${-deslocamento}px)` }}>
            {telas.map((t) => (
              <Img key={t.src} src={staticFile(t.src)} style={{ display: 'block', width: larguraTela, height: alturaTela }} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 4. Branding: carrossel com imagens trocando, logos ganhando cor e o mini Franco. */
const brandingCards = [
  { nome: 'Estância Casa de Carnes', imagens: ['assets/optimized/branding-estancia-1080.jpg', 'assets/slides/estancia-2.jpg', 'assets/slides/estancia-3.jpg'] },
  { nome: 'Araguaia Consult', imagens: ['assets/optimized/branding-araguaia-1080.jpg', 'assets/slides/araguaia-3.jpg', 'assets/slides/araguaia-2.jpg'] },
  { nome: 'Maia & Fagundes', imagens: ['assets/optimized/rebranding-maia-fagundes-1080.jpg', 'assets/slides/maia-fagundes-2.jpg', 'assets/slides/maia-fagundes-4.jpg'] },
  { nome: 'Autopeças Piloto', imagens: ['assets/optimized/rebranding-piloto-1080.jpg', 'assets/slides/piloto-2.jpg', 'assets/slides/piloto-4.jpg'] },
  { nome: 'Senna Autopeças', imagens: ['assets/optimized/rebranding-senna-1080.jpg', 'assets/slides/senna-3.jpg', 'assets/slides/senna-4.jpg'] },
];
const logos = ['easycrm', 'estancia', 'araguaia', 'maia-fagundes', 'piloto', 'pedrosa', 'flor-e-ser', 'senna'];

const Branding: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titulo = spring({ frame: f - 2, fps, config: { damping: 200 } });
  const largura = 700;
  const gap = 46;
  const trilho = interpolate(f, [0, dur], [150, -(largura + gap) * 2.4], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const corrida = interpolate(f, [40, dur], [-420, W + 60], clamp);
  return (
    <AbsoluteFill style={{ opacity: janela(f, dur) }}>
      <div style={{ position: 'absolute', top: 230, left: 100 }}>
        <Kicker style={{ opacity: titulo }}>Identidades visuais</Kicker>
        <Mascara progresso={titulo} style={{ marginTop: 14 }}>
          <Display size={150}>Branding.</Display>
        </Mascara>
      </div>
      <div style={{ position: 'absolute', top: 520, left: 0, display: 'flex', gap, transform: `translateX(${trilho}px)` }}>
        {brandingCards.map((c, i) => (
          <div key={c.nome} style={{ transform: `translateY(${Math.sin((f + i * 20) / 24) * 10}px)` }}>
            <Card imagens={c.imagens} nome={c.nome} largura={largura} f={f} atraso={i * 17} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 1095, left: 0, width: '100%', overflow: 'hidden', height: 110 }}>
        <div style={{ display: 'flex', gap: 80, alignItems: 'center', height: 110, transform: `translateX(${80 - f * 2.2}px)` }}>
          {[...logos, ...logos].map((l, i) => {
            const centro = 80 - f * 2.2 + i * 300 + 110;
            const foco = interpolate(Math.abs(centro - W / 2), [0, 260], [1, 0], clamp);
            return (
              <Img
                key={i}
                src={staticFile(`branding/logos/${l}-dark.webp`)}
                style={{ height: 78, width: 220, objectFit: 'contain', filter: `grayscale(${1 - foco})`, opacity: 0.5 + foco * 0.5 }}
              />
            );
          })}
        </div>
      </div>
      <Img
        src={staticFile('assets/character/chibi/galinha.webp')}
        style={{ position: 'absolute', top: 1400, left: corrida, width: 330, filter: 'drop-shadow(0 24px 30px rgba(0,0,0,0.6))', transform: `translateY(${Math.abs(Math.sin(f / 4)) * -10}px)` }}
      />
      <Sequence from={30} layout="none">
        <Fala texto="Calma! Sua marca não precisa sair correndo atrás de cliente." inicio={0} style={{ left: 100, top: 1245 }} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** 5. Web: cards de sites e o mini Franco de madrugada no PC gamer. */
const webCards = [
  { nome: 'Torra Tudo', imagens: ['assets/optimized/torra-tudo-screen-1080.jpg', 'assets/slides/site-torratudo-2.jpg', 'assets/slides/site-torratudo-3.jpg'] },
  { nome: 'DOM Estética Automotiva', imagens: ['assets/optimized/dom-automotiva-screen-1080.jpg', 'assets/slides/site-domautomotiva-2.jpg', 'assets/slides/site-domautomotiva-3.jpg'] },
  { nome: 'Pet Campos', imagens: ['assets/optimized/pet-campos-interface-1080.jpg', 'assets/slides/site-petcampos-2.jpg', 'assets/slides/site-petcampos-3.jpg'] },
  { nome: 'Summer Fit Academia', imagens: ['assets/optimized/summer-fit-site-screen-1080.jpg', 'assets/slides/site-summerfitacademia-2.jpg', 'assets/slides/site-summerfitacademia-3.jpg'] },
];

const Web: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titulo = spring({ frame: f - 2, fps, config: { damping: 200 } });
  const largura = 760;
  const gap = 46;
  const trilho = interpolate(f, [0, dur], [160, -(largura + gap) * 1.7], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const boneco = spring({ frame: f - 34, fps, config: { damping: 18, stiffness: 90 } });
  return (
    <AbsoluteFill style={{ opacity: janela(f, dur) }}>
      <div style={{ position: 'absolute', top: 230, left: 100 }}>
        <Kicker style={{ opacity: titulo }}>Sites e landing pages</Kicker>
        <Mascara progresso={titulo} style={{ marginTop: 14 }}>
          <Display size={190}>Web</Display>
        </Mascara>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 0, display: 'flex', gap, transform: `translateX(${trilho}px)` }}>
        {webCards.map((c, i) => (
          <div key={c.nome} style={{ transform: `translateY(${Math.sin((f + i * 20) / 24) * 10}px)` }}>
            <Card imagens={c.imagens} nome={c.nome} largura={largura} f={f} atraso={i * 19} />
          </div>
        ))}
      </div>
      <Img
        src={staticFile('assets/character/chibi/noite-pc.webp')}
        style={{
          position: 'absolute',
          top: 1250,
          left: 500,
          width: 440,
          opacity: boneco,
          transform: `translateY(${(1 - boneco) * 60}px) scale(${0.9 + boneco * 0.1})`,
          filter: 'drop-shadow(0 0 40px rgba(255,212,0,0.18)) drop-shadow(0 26px 30px rgba(0,0,0,0.6))',
        }}
      />
      <Sequence from={44} layout="none">
        <Fala texto="Precisa de um e-commerce funcional?! Então bora." inicio={0} style={{ left: 100, top: 1200, maxWidth: 440 }} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** 6. Serviços: os três, com as pílulas. */
const servicos = [
  { titulo: 'Sites & Landing Pages', skills: ['Web design', 'UI / UX', 'Conversão'] },
  { titulo: 'Branding & Identidade', skills: ['Branding', 'Direção de arte', 'Campanhas'] },
  { titulo: 'Motion & Conteúdo', skills: ['Social media', 'Motion', 'Imagem'] },
];
const Servicos: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: janela(f, dur), padding: '0 100px', justifyContent: 'center' }}>
      <Kicker style={{ opacity: lerp(f, 0, 12, 0, 1), marginBottom: 30 }}>Web first · marca em tudo</Kicker>
      {servicos.map((s, i) => {
        const t = lerp(f, 6 + i * 12, 30 + i * 12, 0, 1);
        return (
          <div key={s.titulo} style={{ padding: '38px 0', borderTop: '1.5px solid rgba(255,255,255,0.18)', opacity: t, transform: `translateX(${(1 - t) * 80}px)` }}>
            <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 82, lineHeight: 0.92, letterSpacing: '-0.05em', textTransform: 'uppercase', color: BRANCO }}>
              {s.titulo}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              {s.skills.map((k, j) => {
                const p = lerp(f, 22 + i * 12 + j * 4, 34 + i * 12 + j * 4, 0, 1);
                return (
                  <span
                    key={k}
                    style={{
                      padding: '12px 22px',
                      borderRadius: 999,
                      border: '1.5px solid rgba(255,255,255,0.22)',
                      background: 'rgba(255,255,255,0.05)',
                      fontFamily: 'Archivo',
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.85)',
                      opacity: p,
                      transform: `scale(${0.85 + p * 0.15})`,
                    }}
                  >
                    {k}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** 7. Encerramento: VAMOS CRIAR., o personagem e os contatos. */
const Encerramento: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vamos = spring({ frame: f - 4, fps, config: { damping: 200 } });
  const criar = spring({ frame: f - 14, fps, config: { damping: 200 } });
  const boneco = spring({ frame: f - 20, fps, config: { damping: 20, stiffness: 70 } });
  const info = lerp(f, 40, 60, 0, 1);
  return (
    <AbsoluteFill style={{ opacity: interpolate(f, [6, 18], [0, 1], clamp) }}>
      <Img
        src={staticFile('assets/character/franco-3d-v4-cadeira.webp')}
        style={{
          position: 'absolute',
          left: 320,
          top: 600,
          width: 470,
          opacity: boneco,
          transform: `translateY(${(1 - boneco) * 200 + Math.sin(f / 16) * 8}px)`,
          filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.75))',
        }}
      />
      <div style={{ position: 'absolute', top: 250, left: 100 }}>
        <Kicker style={{ opacity: vamos }}>Contato</Kicker>
        <Mascara progresso={vamos} style={{ marginTop: 14 }}>
          <Display size={176}>Vamos</Display>
        </Mascara>
        <Mascara progresso={criar}>
          <Display size={176} outline>
            Criar.
          </Display>
        </Mascara>
      </div>
      <div style={{ position: 'absolute', top: 1330, left: 100, right: 100, opacity: info, transform: `translateY(${(1 - info) * 24}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Img src={staticFile('assets/brand/favicon-gelo-192.png')} style={{ width: 70, transform: `rotate(${Math.sin(f / 18) * 6}deg)` }} />
          <div style={{ fontFamily: 'Archivo', fontWeight: 300, fontSize: 52, color: BRANCO }}>@ofrancomaia</div>
        </div>
        <div style={{ marginTop: 18, fontFamily: 'Archivo', fontWeight: 700, fontSize: 30, letterSpacing: '0.16em', textTransform: 'uppercase', color: CIANO }}>
          ofrancomaia.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------- montagem ------------------------------- */

const roteiro: { de: number; dur: number; C: React.FC<{ dur: number }> }[] = [
  { de: 0, dur: 140, C: Abertura },
  { de: 128, dur: 132, C: Proposta },
  { de: 246, dur: 200, C: Celular },
  { de: 432, dur: 168, C: Branding },
  { de: 586, dur: 150, C: Web },
  { de: 722, dur: 96, C: Servicos },
  { de: 804, dur: 96, C: Encerramento },
];

export const BrandReel: React.FC = () => (
  <AbsoluteFill style={{ background: PRETO, fontFamily: 'Archivo' }}>
    <FontFace />
    <Fundo />
    {roteiro.map(({ de, dur, C }) => (
      <Sequence key={de} from={de} durationInFrames={dur}>
        <C dur={dur} />
      </Sequence>
    ))}
    <Grao />
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition id="BrandReel" component={BrandReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
);

registerRoot(Root);
