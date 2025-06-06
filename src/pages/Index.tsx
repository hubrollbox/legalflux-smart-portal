
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

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
    </div>
  );
};

export default Index;
