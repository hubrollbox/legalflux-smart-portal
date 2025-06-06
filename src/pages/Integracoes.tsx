
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link as LinkIcon, Zap, Calendar, Mail, FileText, CreditCard } from 'lucide-react';

const Integracoes = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <LinkIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Integrações Poderosas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecte o LegalFlux com as ferramentas que já utiliza no seu dia a dia. 
              Sincronize dados, automatize processos e aumente a produtividade.
            </p>
          </div>
        </div>
      </section>

      {/* Main Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Google Calendar & Outlook',
                description: 'Sincronização bidirecional com calendários externos para nunca perder um compromisso.',
                features: ['Sincronização em tempo real', 'Lembretes automáticos', 'Eventos partilhados']
              },
              {
                icon: Mail,
                title: 'Gmail & Outlook Email',
                description: 'Integração com clientes de email para capturar automaticamente comunicações relevantes.',
                features: ['Captura automática', 'Arquivamento inteligente', 'Templates de email']
              },
              {
                icon: FileText,
                title: 'Assinatura Digital',
                description: 'Integração com plataformas de assinatura digital para contratos e documentos legais.',
                features: ['DocuSign', 'Adobe Sign', 'Assinatura certificada']
              },
              {
                icon: CreditCard,
                title: 'Stripe & PayPal',
                description: 'Processamento de pagamentos e faturação automática para honorários e despesas.',
                features: ['Pagamentos automáticos', 'Faturação recorrente', 'Relatórios financeiros']
              }
            ].map((integration, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-4 rounded-xl mr-6">
                      <integration.icon className="h-8 w-8 text-primary-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-800 mb-3">
                        {integration.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {integration.description}
                      </p>
                      <ul className="space-y-2">
                        {integration.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                            {feature}
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

export default Integracoes;
