import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntegrationStats from '@/components/integrations/IntegrationStats';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import IntegrationBenefits from '@/components/integrations/IntegrationBenefits';
import CallToAction from '@/components/integrations/CallToAction';
import { integrationList } from '@/data/integrations';
import IntegrationSearchBar from '@/components/integrations/IntegrationSearchBar';

const Integracoes = () => {
  const [query, setQuery] = useState("");

  // Separar o Add-on
  const insolvenciaAddon = integrationList.find(i => i.name === "LegalFlux Insolvências");
  const others = integrationList.filter(i => i.id !== insolvenciaAddon?.id);

  function filterIntegrations(list: typeof integrationList) {
    if (!query.trim()) return list;
    const lower = query.toLocaleLowerCase();
    return list.filter(integ =>
      integ.name.toLocaleLowerCase().includes(lower) ||
      integ.description.toLocaleLowerCase().includes(lower) ||
      integ.features.some(f => f.toLocaleLowerCase().includes(lower))
    );
  }

  const filteredOthers = filterIntegrations(others);

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

        <IntegrationStats integrations={integrationList} categories={[]} />

        <IntegrationSearchBar onQueryChange={setQuery} />

        {/* Card destacado do Add-on */}
        {insolvenciaAddon && (!query.trim() || filterIntegrations([insolvenciaAddon]).length > 0) && (
          <div className="mb-8">
            <IntegrationCard integration={insolvenciaAddon} />
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">
            {query?.trim() ? "Resultados da busca" : "Todas as Integrações"}
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {filteredOthers.length > 0 ? (
              filteredOthers.map((integracao) => (
                <IntegrationCard key={integracao.id} integration={integracao} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 p-10">
                Nenhuma integração encontrada.
              </div>
            )}
          </div>
        </div>
        <IntegrationBenefits />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Integracoes;
