# Auditoria de desempenho — ofrancomaia.com (23/10/2026)

Medição com Lighthouse 12.6.1 (celular = Moto G Power simulado em 4G lento; desktop = preset desktop).
"Antes" foi medido no build de produção local (sem compressão), "depois" no build local otimizado e no site no ar
(Hostinger com Brotli e CDN). INP não é medido em laboratório: o TBT (tempo de bloqueio) serve de indicador e ficou em 0 ms.
Não há dados reais de uso (CrUX) para o domínio: o site ainda não tem tráfego suficiente no relatório público do Chrome.

## Antes × depois

| Página | Aparelho | Nota | LCP | FCP | TBT | CLS | Peso | Requisições |
|---|---|---|---|---|---|---|---|---|
| Home | celular | 63 → **91** | 10,0 s → **3,2 s** | 3,9 s → 1,8 s | 12 → 0 ms | 0 → 0 | 2,75 → **1,26 MB** | 52 → 53 |
| Home | desktop | 91 → **100** | 1,9 s → **0,8 s** | 0,9 s → 0,5 s | 0 → 0 | 0 → 0 | 3,48 → 1,68 MB | 61 → 62 |
| Branding Senna | celular | 71 → **99** | 26,9 s → **2,0 s** | 0,6 s → 0,8 s | 223 → 0 ms | 0,012 | 5,3 → **0,75 MB** | 15 → 32 |
| Branding Senna | desktop | 78 → **100** | 4,5 s → **0,5 s** | 0,2 s → 0,3 s | 14 → 0 ms | 0,03 | 5,3 → 0,44 MB | 15 → 20 |
| Branding EasyCRM | celular | 75 → **98** | 10,4 s → **2,4 s** | 1,5 s → 0,8 s | 0 → 0 | 0,014 | 4,8 → **1,5 MB** | 15 → 33 |
| Branding EasyCRM | desktop | 92 → **100** | 1,8 s → **0,4 s** | 0,5 s → 0,2 s | 0 → 0 | 0,04 | 4,9 → 3,5 MB | 15 → 21 |

TTFB no ar: 25–140 ms (servidor Node + CDN da Hostinger, com Brotli no HTML/CSS/JS e cache de 1 ano nos arquivos `_next/static`).

## Gargalos encontrados (por impacto medido)

1. **Páginas de branding**: cada apresentação era um SVG único de até 4,7 MB com as fotos embutidas em base64. O celular levava 23 s só para desenhar (render delay).
2. **Processamento na home**: 4,5 s de trabalho no processador do celular, a maior parte em estilo/layout/pintura. Causa: a troca de imagens dos cards animava `filter` (brilho e desfoque) em 75 imagens, inclusive fora da tela, forçando repintura contínua.
3. **Imagens maiores que o necessário** (1,2 MB a mais na home): personagens 3D de 1024 px servidos ao celular, enfeites em PNG de 230 KB exibidos em 160 px, imagens de troca em 1080 px em cards de ~300 px.
4. **Logos do carrossel de branding**: PNG de 900 px, até 100 KB cada, exibidos em ~200 px.
5. **Vídeo do EasyCRM**: 3,2 MB em 1080p também no celular.

## O que foi alterado

- Páginas de branding renderizadas em **fatias WebP 1x (1400 px) e 2x (2800 px)** com `srcset`: nítidas em qualquer tela (inclusive Retina), primeira fatia com prioridade, demais com `loading="lazy"`. Os SVGs originais ficaram guardados em `branding-svg/` (fora do deploy).
- Troca de imagens dos cards: animação **só de opacidade** (roda no compositor da GPU) e **pausada fora da tela** (`app/cycle-observer.tsx` com IntersectionObserver). O pulso ciano de brilho continua.
- Personagens 3D com `srcset` 480/768/1024 px; imagens de troca com versão 640 px; enfeites (flor e orbe) PNG → WebP (232 → 43 KB e 192 → 37 KB); logos do carrossel PNG → WebP de 440 px (34–100 KB → 10–35 KB).
- Vídeo do EasyCRM com versão de 960 px para celular (3,2 MB → 0,87 MB) via `<source media>`, `preload="none"` e pôster.
- `scripts/prepare-hostinger.mjs`: passa a preservar as variantes de 640 px montadas no código.
- Lint: os erros novos dos arquivos alterados foram corrigidos; os ~190 erros restantes já existiam (componentes de UI não usados em `components/ui` e `remotion/index.tsx`).

## Gargalos que restam

- **Home no celular, LCP 3,2 s** (meta do Google: 2,5 s). O resto do tempo está no JavaScript principal (190 KB, ~128 KB não usados na primeira tela) e no CSS de 218 KB (≈30 KB com Brotli), que precisam chegar antes da primeira pintura. Próximo passo: dividir o código das seções abaixo da dobra e enxugar o CSS antigo.
- **Imagens sem cabeçalho de cache para o navegador** (a CDN guarda, mas o navegador revalida). O servidor do vinext ignorou `headers()` no `next.config.ts`; precisa ser configurado no servidor ou na Hostinger.
- **EasyCRM no desktop** ainda baixa o vídeo de 3,2 MB em 1080p (é o conteúdo principal da página; mantido).
- **Rolagem suave (Lenis)** é o maior consumidor de processamento que restou (~0,7 s no celular simulado); mantida por ser parte da experiência.
