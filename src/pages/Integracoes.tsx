
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntegrationStats from '@/components/integrations/IntegrationStats';
import CategoryFilter from '@/components/integrations/CategoryFilter';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import IntegrationBenefits from '@/components/integrations/IntegrationBenefits';
import CallToAction from '@/components/integrations/CallToAction';
import { integracoesDisponiveis, categorias } from '@/data/integrations';

const Integracoes = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const integracoesFiltradas = categoriaAtiva === 'Todas' 
    ? integracoesDisponiveis 
    : integracoesDisponiveis.filter(int => int.category === categoriaAtiva);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-800 mb-4 flex items-center justify-center">
              <LinkIcon className="h-10 w-10 mr-4" />
              Integrações LegalFlux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecte-se aos principais sistemas e ferramentas para automatizar o seu trabalho jurídico
            </p>
          </div>
        </div>

        {/* Statistics */}
        <IntegrationStats integrations={integracoesDisponiveis} categories={categorias} />

        {/* Category Filter */}
        <CategoryFilter 
          categories={categorias}
          activeCategory={categoriaAtiva}
          onCategoryChange={setCategoriaAtiva}
        />

        {/* Available Integrations Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">
            {categoriaAtiva === 'Todas' ? 'Todas as Integrações' : `Integrações de ${categoriaAtiva}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integracoesFiltradas.map((integracao) => (
              <IntegrationCard key={integracao.id} integration={integracao} />
            ))}
          </div>
        </div>

        {/* Integration Benefits */}
        <IntegrationBenefits />

        {/* Call to Action */}
        <CallToAction />
      </div>

      <Footer />
    </div>
  );
};

export default Integracoes;
