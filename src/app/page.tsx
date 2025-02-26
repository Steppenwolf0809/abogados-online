import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FAQ from '@/components/FAQ';
import WhatsAppButton from '@/components/WhatsAppButton';

// SEO metadata
export const metadata: Metadata = {
  title: 'Abogados Online Ecuador | Servicios Notariales y Legales',
  description: 'Servicios notariales y legales en línea en Ecuador. Calculadoras de costos, asesoría legal y trámites notariales rápidos y eficientes.',
  keywords: 'abogados, notaría, Ecuador, servicios legales, trámites notariales, calculadora notarial, documentos legales, poderes, compraventas',
};

export default function Home() {
  return (
    <main className="relative">
      {/* Hero section with full viewport height */}
      <HeroSection />
      
      {/* Content sections with smooth transition from hero */}
      <div className="relative z-10">
        {/* Gradient transition from hero to content */}
        <div className="h-32 bg-gradient-to-b from-brand-600 to-white"></div>
        
        {/* Main content */}
        <div>
          <ServicesSection />
          <StatsSection />
          <TestimonialsSection />
          <BlogSection />
          <FAQ />
        </div>
      </div>
      
      <WhatsAppButton phoneNumber="0999266015" />
    </main>
  );
}
