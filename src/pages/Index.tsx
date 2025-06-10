import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
        <div id="planos">
          <Pricing />
        </div>
      </main>
      <Footer />
      <img src="/logo-legalflux-192.png" alt="Legalflux Logo" width={200} height={100} loading="lazy" className="mx-auto my-8" />
      <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="w-full" onClick={() => navigate('/processos/novo')}>Criar Novo Caso</Button>
        <Button className="w-full" onClick={() => navigate('/processos?filtro=prazos-urgentes')}>Ver Prazos Urgentes</Button>
        <Button className="w-full" onClick={() => navigate('/documentos/upload')}>Upload de Documento</Button>
      </section>
    </div>
  );
};

export default Index;
