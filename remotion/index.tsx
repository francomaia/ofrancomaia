import React from 'react';
import { CameraMotionBlur } from '@remotion/motion-blur';
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  Sequence,
  interpolate,
  registerRoot,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import mapa from '../public/reel/mapa.json';

/* ==========================================================================
   Reel do portfólio — 1080 × 1440, 30 fps, 20 s

   A regra que rege tudo: nenhum plano desacelera até parar. Cada movimento
   entra rápido, atravessa em velocidade constante e sai acelerando. Os planos
   se sobrepõem, então o corte cai com os dois em movimento — é isso que
   impede a sensação de estagnação.

   Geometria: telas de 960-1000 (desktop) e 330-400 (mobile) cabem no quadro de
   1080 com margem. Em cada `travessia`, os valores 1 e 2 são o enquadramento
   bom; 0 e 3 ficam fora do quadro, para entrar e sair.
   ========================================================================== */

const LARGURA = 1080;
const ALTURA = 1440;
const FPS = 30;
const DURACAO = 600;

const CIANO = '#67e8f9';
const PRETO = '#050505';

type Formato = 'desktop' | 'mobile';
type Secao = keyof (typeof mapa)['desktop']['secoes'];

/**
 * Curva de travessia. Entrada em 8 frames, meio linear, saída acelerada nos
 * últimos 12 — o oposto de um ease-in-out, que pararia no meio do plano.
 */
function travessia(
  f: number,
  dur: number,
  valores: [number, number, number, number],
) {
  return interpolate(f, [0, 8, dur - 12, dur], valores, {
    easing: [Easing.out(Easing.cubic), Easing.linear, Easing.in(Easing.quad)],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Aparece e some sem segurar, para o corte cair em movimento. */
function presenca(f: number, dur: number) {
  return interpolate(f, [0, 7, dur - 9, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

const inicio = (formato: Formato, secao: Secao) => mapa[formato].secoes[secao];

/**
 * Um dispositivo com a página rolando por dentro.
 *
 * A tira alta capturada do site é deslocada em Y dentro de uma caixa do
 * tamanho da viewport: o site rola de verdade, em vez de cortar entre telas
 * paradas.
 */
function Tela({
  formato,
  largura,
  de,
  para,
  progresso,
  estilo = {},
}: {
  formato: Formato;
  largura: number;
  /** Offset inicial e final do scroll, em pixels da tira. */
  de: number;
  para: number;
  /** 0 a 1 dentro do plano. */
  progresso: number;
  estilo?: React.CSSProperties;
}) {
  const f = useCurrentFrame();
  const info = mapa[formato];
  const movel = formato === 'mobile';
  const recheio = largura * (movel ? 0.024 : 0.006);
  const larguraInterna = largura - recheio * 2;
  const escala = larguraInterna / info.largura;
  const alturaTela = info.viewport * escala;
  const limite = Math.max(0, info.altura - info.viewport);
  const scroll = Math.min(Math.max(de + (para - de) * progresso, 0), limite);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: largura,
        padding: recheio,
        background: movel ? '#16181a' : '#1c1e20',
        border: `1px solid ${movel ? '#3a4145' : '#33383b'}`,
        borderRadius: movel ? largura * 0.11 : largura * 0.014,
        boxShadow: `0 ${52 + Math.sin(f / 30) * 12}px ${90 + Math.sin(f / 30) * 18}px -30px #000c, 0 2px 0 #ffffff14 inset`,
        ...estilo,
      }}
    >
      {!movel && (
        <div
          style={{
            height: 18,
            display: 'flex',
            gap: 5,
            alignItems: 'center',
            paddingLeft: 10,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#5a6165' }}
            />
          ))}
        </div>
      )}
      <div
        style={{
          position: 'relative',
          height: alturaTela,
          overflow: 'hidden',
          background: PRETO,
          borderRadius: movel ? largura * 0.088 : largura * 0.008,
        }}
      >
        <Img
          src={staticFile(`reel/${formato}-pagina.png`)}
          style={{
            position: 'absolute',
            left: 0,
            top: -scroll * escala,
            width: larguraInterna,
          }}
        />
        {/* Reflexo de vidro atravessando a tela. */}
        <div
          style={{
            position: 'absolute',
            inset: '-40%',
            pointerEvents: 'none',
            background:
              'linear-gradient(108deg, transparent 38%, #ffffff10 47%, #ffffff26 50%, transparent 60%)',
            transform: `translateX(${interpolate(progresso, [0, 1], [-90, 90])}%)`,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
}

/** Assets 3D da marca, soltos entre as telas. */
function Motivo({
  arquivo,
  largura,
  estilo,
}: {
  arquivo: string;
  largura: number;
  estilo: React.CSSProperties;
}) {
  return (
    <Img
      src={staticFile(arquivo)}
      style={{
        position: 'absolute',
        width: largura,
        filter: 'drop-shadow(0 30px 60px #0009)',
        ...estilo,
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   Planos
   -------------------------------------------------------------------------- */

function Abertura({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ alignItems: 'center', justifyContent: 'center', opacity: presenca(f, dur) }}
    >
      <Img
        src={staticFile('assets/brand/franco-signature-white.png')}
        style={{
          width: travessia(f, dur, [360, 450, 490, 580]),
          filter: `drop-shadow(0 0 ${34 + (f / dur) * 55}px ${CIANO}88)`,
          transform: `rotate(${travessia(f, dur, [-6, -2, 1, 4])}deg)`,
        }}
      />
      <Motivo
        arquivo="assets/motifs/chrome-flower-cyan-v3.png"
        largura={190}
        estilo={{
          right: travessia(f, dur, [-190, 95, 130, 330]),
          top: 330,
          transform: `rotate(${f * 3}deg)`,
        }}
      />
      <Motivo
        arquivo="assets/motifs/cursor-orb-cyan-v3.png"
        largura={160}
        estilo={{
          left: travessia(f, dur, [-180, 85, 120, 310]),
          bottom: 340,
          transform: `rotate(${-f * 2.4}deg)`,
        }}
      />
    </AbsoluteFill>
  );
}

function HeroDesktop({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1600, opacity: presenca(f, dur) }}>
      <Tela
        formato="desktop"
        largura={960}
        de={0}
        para={640}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: 60,
          top: travessia(f, dur, [1280, 425, 375, -340]),
          transform: `rotateX(${travessia(f, dur, [14, 5, -3, -11])}deg) rotateY(${travessia(f, dur, [-20, -7, 5, 18])}deg) rotateZ(${travessia(f, dur, [-6, -2, 1, 5])}deg) scale(${travessia(f, dur, [0.86, 1, 1.03, 1.16])})`,
        }}
      />
    </AbsoluteFill>
  );
}

function HeroMobile({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1600, opacity: presenca(f, dur) }}>
      <Motivo
        arquivo="assets/character/franco-cyan-cutout-v3.png"
        largura={travessia(f, dur, [560, 620, 645, 700])}
        estilo={{ left: travessia(f, dur, [-580, -170, -120, 190]), bottom: -70 }}
      />
      <Tela
        formato="mobile"
        largura={380}
        de={0}
        para={780}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: 600,
          top: 300,
          transform: `translate(${travessia(f, dur, [520, 10, -40, -560])}px, ${travessia(f, dur, [190, 10, -20, -200])}px) rotateY(${travessia(f, dur, [30, 10, -8, -28])}deg) rotateZ(${travessia(f, dur, [11, 4, -3, -11])}deg) scale(${travessia(f, dur, [0.9, 1, 1.03, 1.14])})`,
        }}
      />
    </AbsoluteFill>
  );
}

function Trabalhos({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1700, opacity: presenca(f, dur) }}>
      <Tela
        formato="desktop"
        largura={1000}
        de={inicio('desktop', 'trabalhos') - 110}
        para={inicio('desktop', 'trabalhos') + 640}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: 40,
          top: travessia(f, dur, [1200, 415, 365, -330]),
          transform: `rotateY(${travessia(f, dur, [-16, -6, 4, 15])}deg) rotateZ(-4deg) scale(${travessia(f, dur, [0.92, 1, 1.03, 1.12])})`,
        }}
      />
      <Motivo
        arquivo="assets/motifs/cursor-orb-cyan-v3.png"
        largura={185}
        estilo={{
          right: travessia(f, dur, [-200, 55, 90, 300]),
          top: 200,
          transform: `rotate(${f * 2}deg)`,
        }}
      />
    </AbsoluteFill>
  );
}

function Branding({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  const p = f / dur;
  // Entradas escalonadas: os dois cards nunca chegam juntos.
  const atraso = (n: number) => Math.max(0, f - n * 8);
  return (
    <AbsoluteFill style={{ perspective: 1600, opacity: presenca(f, dur) }}>
      <Tela
        formato="mobile"
        largura={330}
        de={inicio('mobile', 'branding') - 50}
        para={inicio('mobile', 'branding') + 540}
        progresso={p}
        estilo={{
          position: 'absolute',
          left: 62,
          top: travessia(atraso(0), dur, [1350, 300, 250, -640]),
          transform: `rotateY(${travessia(f, dur, [18, 6, 1, -8])}deg) rotateZ(4deg)`,
        }}
      />
      <Tela
        formato="mobile"
        largura={330}
        de={inicio('mobile', 'branding') + 300}
        para={inicio('mobile', 'branding') + 890}
        progresso={p}
        estilo={{
          position: 'absolute',
          right: 62,
          top: travessia(atraso(2), dur, [1440, 430, 380, -520]),
          transform: `rotateY(${travessia(f, dur, [-17, -6, -1, 9])}deg) rotateZ(-5deg)`,
        }}
      />
      <Motivo
        arquivo="assets/motifs/chrome-flower-cyan-v3.png"
        largura={200}
        estilo={{
          left: 440,
          top: travessia(f, dur, [1250, 120, 40, -300]),
          transform: `rotate(${f * 2.6}deg)`,
        }}
      />
    </AbsoluteFill>
  );
}

function Sobre({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1600, opacity: presenca(f, dur) }}>
      <Tela
        formato="desktop"
        largura={980}
        de={inicio('desktop', 'sobre') - 90}
        para={inicio('desktop', 'sobre') + 680}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: travessia(f, dur, [-980, 30, 70, 1000]),
          top: 410,
          transform: `rotateY(${travessia(f, dur, [22, 8, -2, -16])}deg) rotateX(${travessia(f, dur, [-8, -3, 2, 8])}deg) rotateZ(4deg) scale(${travessia(f, dur, [0.9, 1, 1.03, 1.12])})`,
        }}
      />
    </AbsoluteFill>
  );
}

function TrajetoriaServicos({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1700, opacity: presenca(f, dur) }}>
      <Tela
        formato="desktop"
        largura={1000}
        de={inicio('desktop', 'trajetoria') - 70}
        para={inicio('desktop', 'servicos') + 520}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: 40,
          top: travessia(f, dur, [1220, 400, 350, -340]),
          transform: `rotateX(${travessia(f, dur, [13, 5, -2, -10])}deg) rotateY(${travessia(f, dur, [11, 4, -3, -11])}deg) rotateZ(-3deg)`,
        }}
      />
    </AbsoluteFill>
  );
}

function Contato({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 1500, opacity: presenca(f, dur) }}>
      <Motivo
        arquivo="assets/character/franco-cream-cyan-cutout-v3.png"
        largura={travessia(f, dur, [580, 630, 655, 710])}
        estilo={{ right: travessia(f, dur, [-620, -210, -160, 150]), bottom: -60 }}
      />
      <Tela
        formato="mobile"
        largura={400}
        de={inicio('mobile', 'contato') - 50}
        para={inicio('mobile', 'contato') + 800}
        progresso={f / dur}
        estilo={{
          position: 'absolute',
          left: 55,
          top: travessia(f, dur, [1350, 300, 250, -780]),
          transform: `rotateY(${travessia(f, dur, [-24, -9, 5, 21])}deg) rotateZ(${travessia(f, dur, [-9, -3, 2, 9])}deg) scale(${travessia(f, dur, [0.92, 1, 1.03, 1.12])})`,
        }}
      />
    </AbsoluteFill>
  );
}

/** Câmera afastando com as seções em miniatura. */
function GradeFinal({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  const secoes: Secao[] = [
    'inicio',
    'trabalhos',
    'branding',
    'sobre',
    'trajetoria',
    'servicos',
  ];
  return (
    <AbsoluteFill style={{ perspective: 2200, opacity: presenca(f, dur) }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignContent: 'center',
          gap: 22,
          padding: 46,
          transform: `perspective(2200px) rotateX(${travessia(f, dur, [18, 9, 3, -6])}deg) rotateZ(${travessia(f, dur, [-8, -4, -1, 3])}deg) scale(${travessia(f, dur, [1.42, 1.05, 0.94, 0.74])}) translateY(${travessia(f, dur, [170, 35, -10, -150])}px)`,
        }}
      >
        {secoes.map((secao, i) => (
          <div
            key={secao}
            style={{
              overflow: 'hidden',
              borderRadius: 20,
              border: '1px solid #ffffff1f',
              aspectRatio: '390 / 540',
              background: PRETO,
              boxShadow: '0 26px 55px -18px #000c',
              opacity: interpolate(f, [i * 4, i * 4 + 12], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(f, [i * 4, i * 4 + 16], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })}px)`,
            }}
          >
            <Img
              src={staticFile(`reel/mobile-${secao}.png`)}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function Fecho({ dur }: { dur: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 38,
        opacity: presenca(f, dur),
      }}
    >
      <Img
        src={staticFile('assets/brand/franco-signature-white.png')}
        style={{
          width: travessia(f, dur, [410, 480, 505, 550]),
          filter: `drop-shadow(0 0 50px ${CIANO}66)`,
        }}
      />
      <div
        style={{
          fontFamily: 'Archivo, Arial, sans-serif',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 9,
          color: '#ffffffaa',
          transform: `translateY(${travessia(f, dur, [45, 6, 0, -20])}px)`,
        }}
      >
        OFRANCOMAIA.COM
      </div>
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Fundo e montagem
   -------------------------------------------------------------------------- */

function Fundo() {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ background: PRETO }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${42 + Math.sin(f / 95) * 20}% ${46 + Math.cos(f / 105) * 18}%, #0e5e6e5c, transparent 62%), radial-gradient(ellipse at ${70 - Math.cos(f / 130) * 18}% ${72 + Math.sin(f / 115) * 14}%, #22d3ee26, transparent 55%)`,
        }}
      />
      {/* Grade em perspectiva: nunca para, independente dos cortes. */}
      <AbsoluteFill
        style={{
          inset: -240,
          backgroundImage:
            'linear-gradient(#67e8f91f 1px, transparent 1px), linear-gradient(90deg, #67e8f91f 1px, transparent 1px)',
          backgroundSize: '86px 86px',
          transform: `perspective(1500px) rotateX(24deg) rotateZ(-6deg) translate(${f * 0.16}px, ${f * 0.42}px)`,
          maskImage: 'radial-gradient(ellipse at center, #000c 8%, transparent 68%)',
        }}
      />
    </>
  );
}

const PLANOS: [string, React.ComponentType<{ dur: number }>, number, number][] = [
  ['1 — Abertura', Abertura, 0, 45],
  ['2 — Hero desktop', HeroDesktop, 30, 75],
  ['3 — Hero mobile', HeroMobile, 90, 75],
  ['4 — Trabalhos', Trabalhos, 150, 85],
  ['5 — Branding', Branding, 220, 85],
  ['6 — Sobre', Sobre, 290, 75],
  ['7 — Trajetória e serviços', TrajetoriaServicos, 350, 85],
  ['8 — Contato', Contato, 420, 75],
  ['9 — Grade final', GradeFinal, 480, 85],
  ['10 — Fecho', Fecho, 550, 50],
];

function Reel() {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Fundo />
      <CameraMotionBlur shutterAngle={220} samples={6}>
        {PLANOS.map(([nome, Plano, de, dur]) => (
          <Sequence key={nome} name={nome} from={de} durationInFrames={dur}>
            <Plano dur={dur} />
          </Sequence>
        ))}
      </CameraMotionBlur>
      {/* Vinheta, para o miolo puxar o olho. */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 58%, #00000094 100%)',
        }}
      />
    </AbsoluteFill>
  );
}

registerRoot(() => (
  <Composition
    id="FrancoReels"
    component={Reel}
    durationInFrames={DURACAO}
    fps={FPS}
    width={LARGURA}
    height={ALTURA}
  />
));
