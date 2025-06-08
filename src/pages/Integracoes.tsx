
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Database,
  FileText,
  Globe,
  Shield,
  Zap,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Integracoes = () => {
  const integracoesDisponiveis = [
    {
      id: 1,
      name: 'CITIUS',
      description: 'Sistema de Gestão Processual dos Tribunais',
      category: 'Tribunais',
      status: 'disponivel',
      icon: Database,
      features: ['Consulta de processos', 'Notificações automáticas', 'Download de peças'],
      documentationUrl: '/documentacao#citius'
    },
    {
      id: 2,
      name: 'Portal da Justiça',
      description: 'Acesso aos serviços judiciais online',
      category: 'Governo',
      status: 'disponivel',
      icon: Globe,
      features: ['Certidões online', 'Registo criminal', 'Consulta de decisões'],
      documentationUrl: '/documentacao#portal-justica'
    },
    {
      id: 3,
      name: 'IRN - Instituto dos Registos',
      description: 'Conservatórias e notariado online',
      category: 'Registos',
      status: 'em_desenvolvimento',
      icon: FileText,
      features: ['Certidões prediais', 'Registo comercial', 'Registo automóvel'],
      documentationUrl: '/documentacao#irn'
    },
    {
      id: 4,
      name: 'AT - Autoridade Tributária',
      description: 'Portal das Finanças',
      category: 'Fiscal',
      status: 'disponivel',
      icon: Shield,
      features: ['Certidões fiscais', 'Consulta de dívidas', 'Declarações'],
      documentationUrl: '/documentacao#at'
    },
    {
      id: 5,
      name: 'Segurança Social',
      description: 'Instituto da Segurança Social',
      category: 'Social',
      status: 'disponivel',
      icon: Database,
      features: ['Situação contributiva', 'Benefícios', 'Histórico laboral'],
      documentationUrl: '/documentacao#seguranca-social'
    },
    {
      id: 6,
      name: 'RJSP - Rede Judicial',
      description: 'Sistema integrado de informação criminal',
      category: 'Criminal',
      status: 'em_desenvolvimento',
      icon: Shield,
      features: ['Consulta de antecedentes', 'Processos criminais', 'Decisões'],
      documentationUrl: '/documentacao#rjsp'
    }
  ];

  const integracoesConfiguradas = [
    {
      id: 1,
      name: 'CITIUS',
      status: 'conectado',
      lastSync: '2024-01-10 14:30',
      icon: Database
    },
    {
      id: 5,
      name: 'Segurança Social',
      status: 'conectado',
      lastSync: '2024-01-09 16:45',
      icon: Database
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conectado':
        return 'bg-green-100 text-green-800';
      case 'disponivel':
        return 'bg-blue-100 text-blue-800';
      case 'em_desenvolvimento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conectado':
        return CheckCircle;
      case 'disponivel':
        return Zap;
      case 'em_desenvolvimento':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'conectado':
        return 'Conectado';
      case 'disponivel':
        return 'Disponível';
      case 'em_desenvolvimento':
        return 'Em Desenvolvimento';
      default:
        return 'Indisponível';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <LinkIcon className="h-8 w-8 mr-3" />
              Integrações
            </h1>
            <p className="text-gray-600">Conecte-se aos sistemas jurídicos portugueses</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/documentacao">
                <FileText className="h-4 w-4 mr-2" />
                Documentação
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/central-ajuda">
                <ExternalLink className="h-4 w-4 mr-2" />
                Central de Ajuda
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="disponiveis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="disponiveis">Integrações Disponíveis</TabsTrigger>
            <TabsTrigger value="configuradas">Minhas Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="disponiveis" className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                      <p className="text-2xl font-bold text-blue-600">4</p>
                    </div>
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Em Desenvolvimento</p>
                      <p className="text-2xl font-bold text-yellow-600">2</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-primary-800">6</p>
                    </div>
                    <LinkIcon className="h-8 w-8 text-primary-800" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conectadas</p>
                      <p className="text-2xl font-bold text-green-600">2</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integracoesDisponiveis.map((integracao) => {
                const StatusIcon = getStatusIcon(integracao.status);
                
                return (
                  <Card key={integracao.id} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl bg-primary-50">
                            <integracao.icon className="h-6 w-6 text-primary-800" />
                          </div>
                          <div>
                            <CardTitle className="text-primary-800">{integracao.name}</CardTitle>
                            <p className="text-sm text-gray-500">{integracao.category}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(integracao.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {getStatusText(integracao.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 mb-4">{integracao.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-700">Funcionalidades:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {integracao.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link to={integracao.documentationUrl}>
                            Ver Instruções
                          </Link>
                        </Button>
                        {integracao.status === 'disponivel' ? (
                          <Button size="sm" className="flex-1 bg-primary-800 hover:bg-primary-700">
                            Conectar
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="flex-1">
                            Em Breve
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="configuradas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integracoesConfiguradas.map((integracao) => (
                <Card key={integracao.id} className="rounded-2xl border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-primary-50">
                          <integracao.icon className="h-6 w-6 text-primary-800" />
                        </div>
                        <div>
                          <CardTitle className="text-primary-800">{integracao.name}</CardTitle>
                          <p className="text-sm text-green-600">Conectado</p>
                        </div>
                      </div>
                      <Settings className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-xs text-gray-500 mb-4">
                      Última sincronização: {integracao.lastSync}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Sincronizar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Desconectar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {integracoesConfiguradas.length === 0 && (
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <LinkIcon className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma integração configurada
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Configure suas primeiras integrações para começar a sincronizar dados.
                  </p>
                  <Button onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const disponiveisTab = tabs?.querySelector('[value="disponiveis"]') as HTMLElement;
                    disponiveisTab?.click();
                  }}>
                    Ver Integrações Disponíveis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Integration Benefits */}
        <Card className="rounded-2xl border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-primary-800">Benefícios das Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-50 p-4 rounded-xl mb-4">
                  <Zap className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2">Automatização</h4>
                <p className="text-gray-600 text-sm">Reduz o trabalho manual e aumenta a eficiência</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2">Segurança</h4>
                <p className="text-gray-600 text-sm">Conexões seguras e conformes com RGPD</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 p-4 rounded-xl mb-4">
                  <Database className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2">Centralização</h4>
                <p className="text-gray-600 text-sm">Todos os dados numa só plataforma</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Integracoes;
