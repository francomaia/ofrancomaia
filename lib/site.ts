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
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Branding', href: '#branding' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
] as const;

export type SelectedProject = {
  name: string;
  sector: string;
  image: string;
  href?: string;
  status?: string;
  note?: string;
};

export const selectedProjects: SelectedProject[] = [
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
    status: 'Site temporariamente offline',
    note: 'Conceito não utilizado pelo cliente. Um projeto criado com muita empolgação e um resultado do qual gosto muito.',
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
  {
    name: 'Laposé Jalecos',
    sector: 'E-commerce de Moda Profissional',
    image: '/assets/cases/lapose-screen.jpg',
    href: 'https://laposejalecos.com.br/',
  },
  {
    name: 'Dobroou',
    sector: 'Site de Aplicativo',
    image: '/assets/cases/dobroou-screen.jpg',
    href: 'https://dobroou.app/',
  },
  {
    name: 'Freitas Lima & Almeida',
    sector: 'Advocacia',
    image: '/assets/cases/freitas-screen.jpg',
    href: 'https://freitaslimaealmeidaadvs.com.br/',
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
  },
];

export const brandingProjects = [
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
    image: '/assets/behance/wave-publicidade-feature.jpg',
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
    name: 'Matheus Enrico Advocacia',
    type: 'Identidade visual',
    image: '/assets/behance/matheus-enrico.jpg',
    href: 'https://www.behance.net/gallery/192037115/MATHEUS-ENRICO-ADVOCACIA-IDENTIDADE',
  },
  {
    name: 'Via Animale',
    type: 'Identidade visual',
    image: '/assets/behance/via-animale.png',
    href: 'https://www.behance.net/gallery/213802223/VIA-ANIMALE-IDENTIDADE',
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
    title: 'Há cerca de um ano e meio na EXAS.',
    copy: 'Hoje uno negócio, marca e experiência digital, com a criação de sites no centro do meu trabalho.',
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
