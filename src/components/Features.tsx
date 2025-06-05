
import { Card, CardContent } from '@/components/ui/card';
import { 
  Scale, 
  Calendar, 
  File, 
  User, 
  Settings,
  Clock
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Scale,
      title: 'Gestão Completa de Processos',
      description: 'Centralize todos os seus casos jurídicos em um só lugar. Acompanhe prazos, documentos e status em tempo real.',
      color: 'bg-primary-100 text-primary-800'
    },
    {
      icon: Calendar,
      title: 'Calendário Inteligente',
      description: 'Nunca perca um prazo. Sistema automático de lembretes e notificações para audiências e protocolos.',
      color: 'bg-accent-100 text-accent-800'
    },
    {
      icon: File,
      title: 'Documentos Seguros',
      description: 'Upload e compartilhamento seguro de documentos com criptografia de ponta. Acesso controlado por perfil.',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: User,
      title: 'Comunicação Direta',
      description: 'Chat seguro entre clientes e advogados. Compartilhe atualizações e documentos de forma protegida.',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: Settings,
      title: 'IA Jurídica Integrada',
      description: 'Assistente inteligente que gera resumos automáticos, alertas personalizados e insights sobre seus casos.',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: Clock,
      title: 'Relatórios Financeiros',
      description: 'Controle completo de honorários, recibos e extratos. Integração com sistemas de pagamento.',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para transformar sua gestão jurídica em uma experiência moderna e eficiente
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold text-primary-800 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já transformaram sua gestão jurídica com o Legalflux
            </p>
            <button className="bg-white text-primary-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Iniciar Trial Gratuito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
