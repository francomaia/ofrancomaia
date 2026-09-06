import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'O Franco Maia — Web Designer',
  description:
    'Portfólio de O Franco Maia, web designer e criador de marcas desde 2014.',
  icons: {
    icon: '/assets/brand/fm-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${archivo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
