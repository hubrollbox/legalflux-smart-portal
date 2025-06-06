
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Search, FileText, Code } from 'lucide-react';

const Documentacao = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <Book className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Documentação
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Encontre tudo o que precisa para aproveitar ao máximo o LegalFlux. 
              Guias, tutoriais e documentação técnica completa.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pesquise por guias, tutoriais ou funcionalidades..."
                  className="pl-12 py-4 text-lg rounded-2xl border-gray-200 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: 'Primeiros Passos',
                description: 'Guias para começar rapidamente com o LegalFlux',
                articles: [
                  'Como criar a sua conta',
                  'Configuração inicial do escritório',
                  'Primeiro processo no sistema',
                  'Convite de utilizadores'
                ]
              },
              {
                icon: Code,
                title: 'API e Integrações',
                description: 'Documentação técnica para developers',
                articles: [
                  'Autenticação API',
                  'Endpoints disponíveis',
                  'Webhooks e eventos',
                  'Exemplos de código'
                ]
              }
            ].map((category, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-4 rounded-xl mr-6">
                      <category.icon className="h-8 w-8 text-primary-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-800 mb-3">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li key={articleIndex} className="flex items-center text-sm text-gray-700 hover:text-primary-800 cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mr-3"></div>
                            {article}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentacao;
