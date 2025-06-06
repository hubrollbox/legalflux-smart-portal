
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Users, 
  Shield,
  Zap,
  BarChart3,
  Clock,
  Search
} from 'lucide-react';

const Recursos = () => {
  const features = [
    {
      icon: FileText,
      title: 'Gestão de Processos',
      description: 'Centralize todos os seus processos jurídicos num só lugar com organização completa.',
      benefits: ['Organização centralizada', 'Histórico completo', 'Templates personalizados']
    },
    {
      icon: Calendar,
      title: 'Calendário Inteligente',
      description: 'Nunca mais perca um prazo com lembretes automáticos e sincronização.',
      benefits: ['Lembretes automáticos', 'Sincronização', 'Visão unificada']
    },
    {
      icon: MessageSquare,
      title: 'Comunicação Segura',
      description: 'Chat criptografado entre clientes e advogados com partilha segura de documentos.',
      benefits: ['Criptografia total', 'Partilha segura', 'Histórico organizado']
    },
    {
      icon: CreditCard,
      title: 'Gestão Financeira',
      description: 'Controle honorários, despesas e recibos com relatórios automáticos.',
      benefits: ['Controle de honorários', 'Relatórios automáticos', 'Integração faturação']
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Recursos Completos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra todas as funcionalidades que fazem do LegalFlux a escolha ideal 
              para modernizar a sua gestão jurídica.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-4 rounded-xl mr-6">
                      <feature.icon className="h-8 w-8 text-primary-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary-800 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                            {benefit}
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

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              E Muito Mais...
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Funcionalidades adicionais que fazem toda a diferença no seu dia a dia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Segurança Máxima', description: 'Criptografia de nível bancário' },
              { icon: BarChart3, title: 'Relatórios Avançados', description: 'Dashboards interativos' },
              { icon: Clock, title: 'Controle de Tempo', description: 'Registo automático de horas' },
              { icon: Search, title: 'Pesquisa Avançada', description: 'Encontre qualquer informação' }
            ].map((feature, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
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

export default Recursos;
