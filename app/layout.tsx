import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import {
  brandingProjects,
  selectedProjects,
  services,
  site,
  siteUrl,
} from '@/lib/site';
import { SmoothScroll } from './smooth-scroll';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'web designer',
    'criação de sites',
    'branding',
    'identidade visual',
    'design gráfico',
    'UI UX',
    'direção de arte',
    'Franco Maia',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/assets/brand/fm-mark.png',
  },
  category: 'design',
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

/**
 * Dados estruturados: um `ProfilePage` sobre a `Person`, com os trabalhos
 * publicados como `CreativeWork`. É o que dá ao Google algo para entender além
 * do texto solto de uma landing page de uma seção só.
 */
function structuredData() {
  const person = {
    '@type': 'Person',
    '@id': `${siteUrl}/#franco-maia`,
    name: site.name,
    url: siteUrl,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    image: `${siteUrl}${site.ogImage}`,
    sameAs: [site.instagram, site.behance],
    address: {
      '@type': 'PostalAddress',
      addressCountry: site.location.country,
    },
    knowsAbout: services.flatMap((service) => service.skills),
  };

  const works = [...selectedProjects, ...brandingProjects].map(
    (project, index) => ({
      '@type': 'CreativeWork',
      position: index + 1,
      name: project.name,
      creator: { '@id': person['@id'] },
      image: `${siteUrl}${project.image}`,
      ...('href' in project && project.href ? { url: project.href } : {}),
    }),
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#page`,
        url: siteUrl,
        name: site.title,
        inLanguage: site.locale,
        mainEntity: { '@id': person['@id'] },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#portfolio`,
        name: 'Projetos de Franco Maia',
        numberOfItems: works.length,
        itemListElement: works,
      },
    ],
  };
}

const serializedStructuredData = JSON.stringify(structuredData()).replace(
  /</g,
  '\\u003c',
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD gerado a partir de conteúdo próprio e serializado com JSON.stringify
          dangerouslySetInnerHTML={{
            __html: serializedStructuredData,
          }}
        />
      </head>
      <body className={`${archivo.variable} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
