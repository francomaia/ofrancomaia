/**
 * Fonte única de verdade do site.
 *
 * Página, metadata, JSON-LD e sitemap leem daqui, sem conteúdo duplicado
 * entre a UI e as rotas de SEO.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ofrancomaia.com'
).replace(/\/$/, '');

export const site = {
  name: 'Franco Maia',
  handle: 'ofrancomaia',
  title: 'O Franco Maia | Web Designer',
  role: 'Web Designer & Diretor de Arte',
  tagline:
    'Sites, marcas e experiências digitais construídas com direção, personalidade e movimento.',
  description:
    'Portfólio de Franco Maia: criação de sites, branding e identidade visual para marcas que precisam de presença digital com personalidade.',
  locale: 'pt-BR',
  location: { city: 'Brasil', country: 'BR' },
  email: 'francomaiadeoliveira@gmail.com',
  instagram: 'https://www.instagram.com/ofrancomaia',
  behance: 'https://www.behance.net/francomaia',
  ogImage: '/assets/brand/og-image.png',
} as const;

export const socials = [
  { label: 'Instagram', href: site.instagram },
  { label: 'Behance', href: site.behance },
] as const;

export const navLinks = [
  { label: 'Branding', href: '#branding' },
  { label: 'Web', href: '#web' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contato', href: '#contato' },
] as const;

export type SelectedProject = {
  name: string;
  sector: string;
  image: string;
  href?: string;
  status?: string;
  note?: string;
  slides?: string[];
};

export const selectedProjects: SelectedProject[] = [
  {
    name: 'Exas Company',
    sector: 'Assessoria de Marketing',
    image: '/assets/cases/exas.avif',
    href: 'https://exascompany.com.br/',
    slides: ['/assets/slides/site-exascompany-2.jpg', '/assets/slides/site-exascompany-3.jpg'],
  },
  {
    name: 'ArqViva · Arquitetando Processos',
    sector: 'Curso para arquitetos',
    image: '/assets/cases/arqviva-screen.jpg',
    href: 'https://bethaniafilizzola.com/',
    slides: ['/assets/slides/site-bethaniafilizzola-2.jpg', '/assets/slides/site-bethaniafilizzola-3.jpg'],
  },
  {
    name: 'DOM Estética Automotiva',
    sector: 'Estética Automotiva',
    image: '/assets/cases/dom-automotiva-screen.jpg',
    href: 'https://domautomotiva.com.br/',
    slides: ['/assets/slides/site-domautomotiva-2.jpg', '/assets/slides/site-domautomotiva-3.jpg'],
  },
  {
    name: 'Sindicato Rural de Jataí',
    sector: 'Entidade do Agronegócio',
    image: '/assets/cases/sindicato-rural-screen.jpg',
    href: 'https://sindicatoruraljatai.org/',
  },
  {
    name: 'Torra Tudo',
    sector: 'E-commerce de Utilidades',
    image: '/assets/cases/torra-tudo-screen.jpg',
    href: 'https://torratudo.exascompany.com.br/',
    slides: ['/assets/slides/site-torratudo-2.jpg', '/assets/slides/site-torratudo-3.jpg'],
  },
  {
    name: 'Summer Fit Academia',
    sector: 'Academia',
    image: '/assets/cases/summer-fit-site-screen.jpg',
    href: 'https://summerfitacademia.com.br/',
    slides: ['/assets/slides/site-summerfitacademia-2.jpg', '/assets/slides/site-summerfitacademia-3.jpg'],
  },
  {
    name: 'Equillibrium Agro',
    sector: 'Soluções Biológicas',
    image: '/assets/cases/equillibrium-screen.jpg',
    href: 'https://equillibriumagro.com.br/',
  },
  {
    name: 'Shineray Rondonópolis',
    sector: 'Concessionária de Motos',
    image: '/assets/cases/shineray-roo-screen.jpg',
    href: 'https://shinerayrondonopolis.com.br/',
  },
  {
    name: 'Shineray Catalão',
    sector: 'Concessionária de Motos',
    image: '/assets/cases/shineray-cat-screen.jpg',
    href: 'https://shineraycatalao.com.br/',
  },
  {
    name: 'Realiza Multimarcas',
    sector: 'Revenda de Veículos',
    image: '/assets/cases/realiza.avif',
    href: 'https://seminovosrealizajti.com.br/',
    slides: ['/assets/slides/site-seminovosrealizajti-2.jpg', '/assets/slides/site-seminovosrealizajti-3.jpg'],
  },
  {
    name: 'Immune',
    sector: 'Certificação Digital',
    image: '/assets/cases/immune.avif',
    href: 'https://certificadoimmune.com.br/',
    slides: ['/assets/slides/site-certificadoimmune-2.jpg', '/assets/slides/site-certificadoimmune-3.jpg'],
  },
  {
    name: 'Oral Implant',
    sector: 'Odontologia',
    image: '/assets/cases/oral-implant.avif',
    href: 'https://clinicaoralimplant.com.br/',
    slides: ['/assets/slides/site-clinicaoralimplant-2.jpg', '/assets/slides/site-clinicaoralimplant-3.jpg'],
  },
  {
    name: 'Laposé Jalecos',
    sector: 'E-commerce de Moda Profissional',
    image: '/assets/cases/lapose-screen.jpg',
    href: 'https://laposejalecos.com.br/',
    slides: ['/assets/slides/site-laposejalecos-2.jpg', '/assets/slides/site-laposejalecos-3.jpg'],
  },
  {
    name: 'Dobroou',
    sector: 'Site de Aplicativo',
    image: '/assets/cases/dobroou-screen.jpg',
    href: 'https://dobroou.app/',
    slides: ['/assets/slides/site-dobroou-2.jpg', '/assets/slides/site-dobroou-3.jpg'],
  },
  {
    name: 'Freitas Lima & Almeida',
    sector: 'Advocacia',
    image: '/assets/cases/freitas-screen.jpg',
    href: 'https://freitaslimaealmeidaadvs.com.br/',
    slides: ['/assets/slides/site-freitaslimaealmeidaadvs-3.jpg'],
  },
  {
    name: 'Finneze Alumínio',
    sector: 'Esquadrias e Fachadas',
    image: '/assets/cases/finneze-screen.jpg',
    href: 'https://finnezealuminio.com.br/',
  },
  {
    name: 'Pet Campos',
    sector: 'Hospital Veterinário',
    image: '/assets/cases/pet-campos-interface.jpg',
    href: 'https://petcampos.com.br/',
    slides: ['/assets/slides/site-petcampos-2.jpg', '/assets/slides/site-petcampos-3.jpg'],
  },
];

export const brandingProjects = [
  {
    name: 'EasyCRM',
    type: 'Branding e motion',
    image: '/assets/behance/easycrm.jpg',
    video: '/branding/easycrm/loop.mp4',
    href: '/branding/easycrm.html',
  },
  {
    name: 'Estância Casa de Carnes',
    type: 'Branding',
    image: '/assets/behance/branding-estancia.jpg',
    slides: ['/assets/slides/estancia-2.jpg', '/assets/slides/estancia-3.jpg', '/assets/slides/estancia-4.jpg'],
    href: '/branding/estancia.html',
  },
  {
    name: 'Araguaia Consult',
    type: 'Branding',
    image: '/assets/behance/branding-araguaia.jpg',
    slides: ['/assets/slides/araguaia-2.jpg', '/assets/slides/araguaia-3.jpg', '/assets/slides/araguaia-4.jpg'],
    href: '/branding/araguaia.html',
  },
  {
    name: 'Maia & Fagundes',
    type: 'Rebranding',
    image: '/assets/behance/rebranding-maia-fagundes.jpg',
    slides: ['/assets/slides/maia-fagundes-2.jpg', '/assets/slides/maia-fagundes-3.jpg', '/assets/slides/maia-fagundes-4.jpg'],
    href: '/branding/maia-fagundes.html',
  },
  {
    name: 'Autopeças Piloto',
    type: 'Rebranding',
    image: '/assets/behance/rebranding-piloto.jpg',
    slides: ['/assets/slides/piloto-2.jpg', '/assets/slides/piloto-3.jpg', '/assets/slides/piloto-4.jpg'],
    href: '/branding/piloto.html',
  },
  {
    name: 'Pedrosa',
    type: 'Rebranding',
    image: '/assets/behance/rebranding-pedrosa.jpg',
    slides: ['/assets/slides/pedrosa-2.jpg', '/assets/slides/pedrosa-3.jpg'],
    href: '/branding/pedrosa.html',
  },
  {
    name: 'Casa Terapêutica Flor & Ser',
    type: 'Rebranding',
    image: '/assets/behance/rebranding-flor-e-ser.jpg',
    slides: ['/assets/slides/flor-e-ser-2.jpg', '/assets/slides/flor-e-ser-3.jpg'],
    href: '/branding/flor-e-ser.html',
  },
  {
    name: 'Senna Autopeças',
    type: 'Rebranding',
    image: '/assets/behance/rebranding-senna.jpg',
    slides: ['/assets/slides/senna-2.jpg', '/assets/slides/senna-3.jpg', '/assets/slides/senna-4.jpg'],
    href: '/branding/senna.html',
  },
  {
    name: 'GR Treinador',
    type: 'Branding',
    image: '/assets/behance/gr-treinador.png',
    href: 'https://www.behance.net/gallery/243778083/GR-Treinador-(Gabriel-Rezende)-BRAND',
    slides: ['/assets/slides/beh-gr-treinador-1.jpg', '/assets/slides/beh-gr-treinador-2.jpg', '/assets/slides/beh-gr-treinador-3.jpg'],
  },
  {
    name: 'Banda Rota Zero 60',
    type: 'Logotipo',
    image: '/assets/behance/rota-zero-60.png',
    href: 'https://www.behance.net/gallery/223102331/BANDA-ROTA-ZERO-60-LOGOTIPO',
    slides: ['/assets/slides/beh-rota-zero-60-1.jpg', '/assets/slides/beh-rota-zero-60-2.jpg', '/assets/slides/beh-rota-zero-60-3.jpg'],
  },
  {
    name: 'Wave Publicidade',
    type: 'Identidade visual',
    image: '/assets/behance/wave-publicidade-feature.jpg',
    href: 'https://www.behance.net/gallery/212088005/IDENTIDADE-VISUAL-WAVE-PUBLICIDADE',
    slides: ['/assets/slides/beh-wave-1.jpg', '/assets/slides/beh-wave-2.jpg', '/assets/slides/beh-wave-3.jpg'],
  },
  {
    name: 'Westbull Churrascaria',
    type: 'Identidade visual',
    image: '/assets/behance/westbull.png',
    href: 'https://www.behance.net/gallery/220994247/WESTBULL-CHURRASCARIA-IDENTIDADE',
    slides: ['/assets/slides/beh-westbull-1.jpg', '/assets/slides/beh-westbull-2.jpg', '/assets/slides/beh-westbull-3.jpg'],
  },
  {
    name: 'Ottoneli Beauty',
    type: 'Identidade visual',
    image: '/assets/behance/ottoneli-beauty.png',
    href: 'https://www.behance.net/gallery/222989543/CARTAO-DE-VISITA-OTTONELI-BEAUTY',
    slides: ['/assets/slides/beh-ottoneli-1.jpg'],
  },
  {
    name: 'West Burguer',
    type: 'Identidade visual',
    image: '/assets/behance/west-burguer.png',
    href: 'https://www.behance.net/gallery/217884215/WEST-BURGUER-ID',
    slides: ['/assets/slides/beh-west-burguer-1.jpg', '/assets/slides/beh-west-burguer-2.jpg', '/assets/slides/beh-west-burguer-3.jpg'],
  },
  {
    name: 'Jânio Eduardo',
    type: 'Posicionamento de imagem',
    image: '/assets/behance/janio-eduardo.jpg',
    href: 'https://www.behance.net/gallery/192031601/JANIO-EDUARDO-POSICIONAMENTO-DE-IMAGEM',
    slides: ['/assets/slides/beh-janio-1.jpg', '/assets/slides/beh-janio-2.jpg', '/assets/slides/beh-janio-3.jpg'],
  },
  {
    name: 'Matheus Enrico Advocacia',
    type: 'Identidade visual',
    image: '/assets/behance/matheus-enrico.jpg',
    href: 'https://www.behance.net/gallery/192037115/MATHEUS-ENRICO-ADVOCACIA-IDENTIDADE',
    slides: ['/assets/slides/beh-matheus-1.jpg', '/assets/slides/beh-matheus-2.jpg', '/assets/slides/beh-matheus-3.jpg'],
  },
  {
    name: 'Via Animale',
    type: 'Identidade visual',
    image: '/assets/behance/via-animale.png',
    href: 'https://www.behance.net/gallery/213802223/VIA-ANIMALE-IDENTIDADE',
    slides: ['/assets/slides/beh-via-animale-1.jpg', '/assets/slides/beh-via-animale-2.jpg', '/assets/slides/beh-via-animale-3.jpg'],
  },
];

export const services = [
  {
    title: 'Sites & Landing Pages',
    copy: 'Estratégia, arquitetura, interface e responsividade para transformar uma marca em uma experiência digital clara e convincente.',
    skills: ['Web design', 'UI / UX', 'Responsividade', 'Conversão'],
  },
  {
    title: 'Branding & Identidade',
    copy: 'Conceito, direção de arte e sistemas visuais que fazem a marca ser reconhecida antes mesmo de alguém ler o nome.',
    skills: ['Branding', 'Direção de arte', 'Identidade', 'Campanhas'],
  },
  {
    title: 'Motion & Conteúdo',
    copy: 'Vídeos, animações e peças digitais que estendem a personalidade da marca e colocam a comunicação em movimento.',
    skills: ['Social media', 'Edição', 'Motion', 'Imagem'],
  },
];

export const careerChapters = [
  {
    phase: 'Origem',
    title: 'O design veio primeiro.',
    copy: 'Comecei a criar aos 13 anos, movido por imagem, composição e curiosidade.',
  },
  {
    phase: 'Produção',
    title: 'Aprendi fazendo existir.',
    copy: 'Comunicação visual, gráfica, impressos, adesivos, fachadas e acabamento trouxeram precisão.',
  },
  {
    phase: 'Comunicação',
    title: 'Imagem, texto e contexto.',
    copy: 'Passei por conteúdo, vídeo, editorial, campanhas, mercado imobiliário e comunicação pública.',
  },
  {
    phase: 'Agências',
    title: 'Marcas em ritmo real.',
    copy: 'Conectei briefing, social, branding, motion e entregas para negócios de diferentes segmentos.',
  },
  {
    phase: 'Agora',
    title: 'Sites no centro do meu trabalho.',
    copy: 'Hoje uno negócio, marca e experiência digital para criar experiências com estratégia, identidade e presença visual própria.',
  },
];

export const projectBudgets = [
  'Ainda não sei',
  'Até R$ 3 mil',
  'R$ 3 mil a R$ 8 mil',
  'Acima de R$ 8 mil',
] as const;

export const projectTypes = [
  'Site institucional',
  'Landing page',
  'Loja / e-commerce',
  'Branding & identidade',
  'Motion & conteúdo',
  'Outro',
] as const;
