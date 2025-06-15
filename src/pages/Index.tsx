import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import InsolvenciaAddonHighlight from '@/components/InsolvenciaAddonHighlight';

const Index = () => {
  useScrollToTop();
  const navigate = useNavigate();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        navigate('/processos/novo');
      }
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* Add-on Insolvências destacado */}
        <InsolvenciaAddonHighlight />
        <div id="planos">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
