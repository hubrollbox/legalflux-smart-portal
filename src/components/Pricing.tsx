
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Grátis',
      price: '€0',
      period: '/mês',
      description: 'Para testar a plataforma (15 dias trial)',
      features: [
        'Até 2 processos',
        '500MB de armazenamento',
        'Suporte por email',
        'Recursos básicos de IA',
        'Acesso mobile'
      ],
      buttonText: 'Começar Trial Gratuito',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Básico',
      price: '€29',
      period: '/mês',
      description: 'Ideal para advogados independentes',
      features: [
        'Até 10 processos',
        '5GB de armazenamento',
        'Chat directo com suporte',
        'IA avançada para insights',
        'Calendário de prazos',
        'Upload de documentos',
        'Relatórios básicos'
      ],
      buttonText: 'Escolher Básico',
      buttonVariant: 'default' as const,
      popular: false
    },
    {
      name: 'Profissional',
      price: '€79',
      period: '/mês',
      description: 'Para advogados e consultórios pequenos',
      features: [
        'Processos ilimitados',
        '25GB de armazenamento',
        'Suporte prioritário',
        'IA completa + automações',
        'Gestão de clientes',
        'Chat seguro com clientes',
        'Relatórios avançados',
        'Multi-utilizador (até 3)',
        'Templates premium'
      ],
      buttonText: 'Escolher Profissional',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Escritório',
      price: '€199',
      period: '/mês',
      description: 'Para escritórios e empresas',
      features: [
        'Tudo do Profissional',
        '100GB de armazenamento',
        'Suporte dedicado',
        'Utilizadores ilimitados',
        'Dashboard administrativo',
        'Permissões avançadas (RBAC)',
        'Gestão de assistentes',
        'API personalizada',
        'Onboarding personalizado',
        'Integração Stripe completa'
      ],
      buttonText: 'Falar com Vendas',
      buttonVariant: 'default' as const,
      popular: false
    }
  ];

  return (
    <section id="planos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
            Planos Transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para suas necessidades. Todos incluem 15 dias de trial gratuito.
          </p>
          
          {/* Trial Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
            ✨ 15 dias grátis em todos os planos • Sem cartão de crédito
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-primary-800 transform scale-105' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center p-8 pb-4">
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary-800">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="p-8 pt-4">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-accent-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full rounded-xl py-3 font-semibold ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-primary-800 hover:bg-primary-700' 
                      : 'border-primary-800 text-primary-800 hover:bg-primary-50'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            Precisa de um plano personalizado? 
            <a href="#contato" className="text-primary-800 hover:underline ml-1 font-medium">
              Entre em contacto
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Todos os planos incluem SSL, backup automático e conformidade com LGPD
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
