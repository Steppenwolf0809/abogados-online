import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQ from '@/components/FAQ';
import WhatsAppButton from '@/components/WhatsAppButton';

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
        <div className="bg-white">
          <ServicesSection />
          <StatsSection />
          <TestimonialsSection />
          <FAQ />
        </div>
      </div>
      
      <WhatsAppButton phoneNumber="0999266015" />
    </main>
  );
}
