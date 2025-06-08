
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon,
  ExternalLink,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Globe,
  Shield,
  Zap,
  ArrowLeft,
  Users,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-100 text-green-800';
      case 'em_desenvolvimento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'disponivel':
        return CheckCircle;
      case 'em_desenvolvimento':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'Disponível';
      case 'em_desenvolvimento':
        return 'Em Desenvolvimento';
      default:
        return 'Indisponível';
    }
  };

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
              Conecte-se aos principais sistemas jurídicos portugueses e automatize o seu trabalho
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold text-blue-600">6</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Integrations Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">Integrações Disponíveis</h2>
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
                        <Button size="sm" className="flex-1 bg-primary-800 hover:bg-primary-700" asChild>
                          <Link to="/login">
                            Começar
                          </Link>
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
        </div>

        {/* Integration Benefits */}
        <Card className="rounded-2xl border-0 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-primary-800 text-center text-2xl">
              Benefícios das Integrações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-50 p-6 rounded-xl mb-4">
                  <Zap className="h-12 w-12 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2 text-lg">Automatização</h4>
                <p className="text-gray-600">Reduz o trabalho manual e aumenta a eficiência do seu escritório</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-xl mb-4">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2 text-lg">Segurança</h4>
                <p className="text-gray-600">Conexões seguras e conformes com RGPD e legislação portuguesa</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 p-6 rounded-xl mb-4">
                  <Database className="h-12 w-12 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-primary-800 mb-2 text-lg">Centralização</h4>
                <p className="text-gray-600">Todos os dados numa só plataforma, acessível a qualquer momento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-primary-50 to-accent-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Pronto para começar?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Registe-se no LegalFlux e conecte-se aos sistemas que já utiliza
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-primary-800 hover:bg-primary-700" asChild>
                <Link to="/register">
                  <Users className="h-5 w-5 mr-2" />
                  Criar Conta
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contato">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Falar Connosco
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Integracoes;
