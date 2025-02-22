import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abogados Online Ecuador - Servicios Notariales y Legales',
  description: 'Servicios notariales y legales en línea en Ecuador. Calculadoras de costos, asesoría legal y trámites notariales.',
  keywords: 'abogados, notaría, Ecuador, servicios legales, trámites notariales, calculadora notarial',
  authors: [{ name: 'Abogados Online Ecuador' }],
  creator: 'Abogados Online Ecuador',
  publisher: 'Abogados Online Ecuador',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/brand/Logo/Logo - Imágenes/Favicon/Favicon 32x32 px.png" sizes="32x32" />
        <link rel="icon" href="/brand/Logo/Logo - Imágenes/Favicon/Favicon 16x16 px.png" sizes="16x16" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <WhatsAppButton phoneNumber="593979317579" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
