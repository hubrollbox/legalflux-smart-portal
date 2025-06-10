import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Image from 'next/image';

const Index = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <div id="planos">
          <Pricing />
        </div>
      </main>
      <Footer />
      <Image src="/logo.png" alt="Logo" width={200} height={100} loading="lazy" priority />
    </div>
  );
};

export default Index;
