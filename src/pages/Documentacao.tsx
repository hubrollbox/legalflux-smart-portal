
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Book, 
  Search, 
  FileText, 
  Code, 
  Users, 
  Calendar, 
  BarChart3, 
  Euro, 
  Bot,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const Documentacao = () => {
  const features = [
    {
      icon: FileText,
      title: 'Processos',
      description: 'Sistema completo de gestão de processos jurídicos',
      items: [
        'Criar novo processo',
        'Atualizar estado (em andamento, aguardando, concluído)',
        'Anexar documentos ao processo',
        'Histórico completo de alterações'
      ]
    },
    {
      icon: Users,
      title: 'Clientes',
      description: 'Gestão centralizada de clientes e contactos',
      items: [
        'Adicionar clientes manualmente',
        'Consultar histórico por cliente',
        'Dados de contacto e informações pessoais',
        'Associar processos a clientes'
      ]
    },
    {
      icon: Calendar,
      title: 'Calendário',
      description: 'Agendamento e gestão de eventos importantes',
      items: [
        'Criar eventos com prazo e tipo (audiência, reunião, etc.)',
        'Associar eventos a processos',
        'Notificações automáticas de prazos',
        'Vista mensal, semanal e diária'
      ]
    },
    {
      icon: BarChart3,
      title: 'Dashboard',
      description: 'Visão geral completa do escritório',
      items: [
        'Visão geral com métricas principais (processos ativos, clientes, receita mensal, prazos)',
        'Listas de eventos e tarefas recentes',
        'Gráficos de desempenho',
        'Alertas importantes'
      ]
    },
    {
      icon: Euro,
      title: 'Financeiro',
      description: 'Controlo financeiro completo',
      items: [
        'Receita mensal por cliente ou processo',
        'Histórico de pagamentos',
        'Faturação automática',
        'Relatórios financeiros detalhados'
      ]
    },
    {
      icon: Bot,
      title: 'IA Assistant',
      description: 'Assistente inteligente para documentos jurídicos',
      items: [
        'Geração automática de textos jurídicos (beta)',
        'Sugestões baseadas no contexto',
        'Análise de documentos',
        'Resumos automáticos'
      ]
    }
  ];

  const apiGuides = [
    {
      title: 'Autenticação',
      description: 'Como autenticar-se na API',
      endpoint: 'POST /auth/login'
    },
    {
      title: 'Gestão de Processos',
      description: 'CRUD completo para processos',
      endpoint: 'GET/POST/PUT/DELETE /api/processos'
    },
    {
      title: 'Clientes',
      description: 'Endpoints para gestão de clientes',
      endpoint: 'GET/POST/PUT/DELETE /api/clientes'
    },
    {
      title: 'Eventos',
      description: 'API do calendário e eventos',
      endpoint: 'GET/POST/PUT/DELETE /api/eventos'
    }
  ];

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

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça todas as funcionalidades disponíveis na plataforma LegalFlux
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-4 rounded-xl mr-6">
                      <feature.icon className="h-8 w-8 text-primary-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {item}
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

      {/* API Documentation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              API e Integrações
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Documentação técnica para developers e integrações
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiGuides.map((guide, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-800 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {guide.description}
                      </p>
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm text-primary-800">
                        {guide.endpoint}
                      </code>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="rounded-2xl border-0 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Code className="h-12 w-12 text-primary-800 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary-800 mb-4">
                  Documentação Completa da API
                </h3>
                <p className="text-gray-600 mb-6">
                  Aceda à documentação técnica completa com exemplos de código, autenticação e endpoints disponíveis.
                </p>
                <Button className="bg-primary-800 hover:bg-primary-900">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Documentação da API
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentacao;
