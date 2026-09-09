# Franco Maia — Reels

15,6 segundos, 1080 × 1920, 30 fps. Apresenta o site desktop e mobile sobre fundo branco com grid sutil e degradê glass animado. Movimentos contínuos, transições sobrepostas e CameraMotionBlur com 6 amostras e shutter de 240°. Sem textos sobrepostos, linha inferior ou trilha.

Capturar o site (servidor local ligado): `node scripts/capture-reel.mjs`

Editar: `pnpm exec remotion studio remotion/index.tsx`

Exportar: `pnpm exec remotion render remotion/index.tsx FrancoReels outputs/franco-portfolio-reels.mp4 --codec=h264 --crf=18`

As capturas registram a interface; o Remotion anima enquadramentos, mockups, tipografia e os PNGs. Não é gravação das interações do site.
