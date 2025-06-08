
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
  Building,
  Mail,
  Cloud,
  Calendar,
  Smartphone,
  HardDrive,
  Monitor,
  MessageSquare,
  CreditCard,
  BookOpen,
  Briefcase,
  Camera,
  Headphones,
  Video,
  Wifi,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Integracoes = () => {
  const integracoesDisponiveis = [
    // Sistemas Jurídicos Portugueses
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
    },
    
    // Email & Comunicação
    {
      id: 10,
      name: 'Gmail',
      description: 'Integração com Gmail para advogados',
      category: 'Email',
      status: 'disponivel',
      icon: Mail,
      features: ['Sincronização de emails', 'Templates jurídicos', 'Arquivamento automático'],
      documentationUrl: '/documentacao#gmail'
    },
    {
      id: 11,
      name: 'Outlook',
      description: 'Microsoft Outlook para escritórios',
      category: 'Email',
      status: 'disponivel',
      icon: Mail,
      features: ['Calendário integrado', 'Contactos sincronizados', 'Assinaturas automáticas'],
      documentationUrl: '/documentacao#outlook'
    },
    {
      id: 12,
      name: 'WhatsApp Business',
      description: 'Comunicação com clientes via WhatsApp',
      category: 'Comunicação',
      status: 'em_desenvolvimento',
      icon: MessageSquare,
      features: ['Mensagens automáticas', 'Templates aprovados', 'Histórico de conversas'],
      documentationUrl: '/documentacao#whatsapp'
    },
    {
      id: 13,
      name: 'Zoom',
      description: 'Videoconferências para audiências e reuniões',
      category: 'Comunicação',
      status: 'disponivel',
      icon: Video,
      features: ['Gravação de sessões', 'Agendamento automático', 'Salas de espera'],
      documentationUrl: '/documentacao#zoom'
    },
    {
      id: 14,
      name: 'Microsoft Teams',
      description: 'Colaboração em equipa para escritórios',
      category: 'Comunicação',
      status: 'disponivel',
      icon: Users,
      features: ['Chat em equipa', 'Partilha de ficheiros', 'Reuniões virtuais'],
      documentationUrl: '/documentacao#teams'
    },
    
    // Cloud Storage
    {
      id: 20,
      name: 'Google Drive',
      description: 'Armazenamento e sincronização de documentos',
      category: 'Armazenamento',
      status: 'disponivel',
      icon: Cloud,
      features: ['Backup automático', 'Partilha segura', 'Versionamento'],
      documentationUrl: '/documentacao#google-drive'
    },
    {
      id: 21,
      name: 'Dropbox',
      description: 'Sincronização de ficheiros em nuvem',
      category: 'Armazenamento',
      status: 'disponivel',
      icon: Cloud,
      features: ['Sincronização automática', 'Histórico de versões', 'Links seguros'],
      documentationUrl: '/documentacao#dropbox'
    },
    {
      id: 22,
      name: 'OneDrive',
      description: 'Armazenamento Microsoft integrado',
      category: 'Armazenamento',
      status: 'disponivel',
      icon: Cloud,
      features: ['Integração Office', 'Colaboração em tempo real', 'Backup automático'],
      documentationUrl: '/documentacao#onedrive'
    },
    {
      id: 23,
      name: 'iCloud',
      description: 'Sincronização para dispositivos Apple',
      category: 'Armazenamento',
      status: 'em_desenvolvimento',
      icon: Cloud,
      features: ['Sincronização iOS/Mac', 'Backup de documentos', 'Acesso universal'],
      documentationUrl: '/documentacao#icloud'
    },
    
    // Calendário
    {
      id: 30,
      name: 'Google Calendar',
      description: 'Gestão de prazos e audiências',
      category: 'Calendário',
      status: 'disponivel',
      icon: Calendar,
      features: ['Prazos automáticos', 'Lembretes personalizados', 'Partilha de calendários'],
      documentationUrl: '/documentacao#google-calendar'
    },
    {
      id: 31,
      name: 'Outlook Calendar',
      description: 'Calendário Microsoft integrado',
      category: 'Calendário',
      status: 'disponivel',
      icon: Calendar,
      features: ['Agendamento de reuniões', 'Convites automáticos', 'Sincronização móvel'],
      documentationUrl: '/documentacao#outlook-calendar'
    },
    {
      id: 32,
      name: 'Apple Calendar',
      description: 'Calendário para dispositivos Apple',
      category: 'Calendário',
      status: 'em_desenvolvimento',
      icon: Calendar,
      features: ['Sincronização iCloud', 'Lembretes inteligentes', 'Integração Siri'],
      documentationUrl: '/documentacao#apple-calendar'
    },
    
    // Office & Produtividade
    {
      id: 40,
      name: 'Microsoft Office 365',
      description: 'Suite completa de produtividade',
      category: 'Produtividade',
      status: 'disponivel',
      icon: FileText,
      features: ['Word, Excel, PowerPoint', 'Templates jurídicos', 'Colaboração em tempo real'],
      documentationUrl: '/documentacao#office365'
    },
    {
      id: 41,
      name: 'Google Workspace',
      description: 'Ferramentas colaborativas Google',
      category: 'Produtividade',
      status: 'disponivel',
      icon: FileText,
      features: ['Docs, Sheets, Slides', 'Comentários e revisões', 'Partilha segura'],
      documentationUrl: '/documentacao#google-workspace'
    },
    {
      id: 42,
      name: 'Adobe Acrobat',
      description: 'Gestão avançada de PDFs',
      category: 'Produtividade',
      status: 'disponivel',
      icon: FileText,
      features: ['Assinatura digital', 'Formulários interativos', 'Anotações jurídicas'],
      documentationUrl: '/documentacao#adobe-acrobat'
    },
    {
      id: 43,
      name: 'Notion',
      description: 'Base de conhecimento e notas',
      category: 'Produtividade',
      status: 'em_desenvolvimento',
      icon: BookOpen,
      features: ['Base de dados jurídica', 'Templates personalizados', 'Colaboração em equipa'],
      documentationUrl: '/documentacao#notion'
    },
    
    // Dispositivos Móveis
    {
      id: 50,
      name: 'iOS Shortcuts',
      description: 'Automatizações para iPhone/iPad',
      category: 'Móvel',
      status: 'em_desenvolvimento',
      icon: Smartphone,
      features: ['Atalhos personalizados', 'Automação Siri', 'Widgets informativos'],
      documentationUrl: '/documentacao#ios-shortcuts'
    },
    {
      id: 51,
      name: 'Android Tasker',
      description: 'Automatizações para Android',
      category: 'Móvel',
      status: 'em_desenvolvimento',
      icon: Smartphone,
      features: ['Perfis automáticos', 'Notificações inteligentes', 'Ações programadas'],
      documentationUrl: '/documentacao#android-tasker'
    },
    
    // Pagamentos & Financeiro
    {
      id: 60,
      name: 'Stripe',
      description: 'Processamento de pagamentos online',
      category: 'Financeiro',
      status: 'disponivel',
      icon: CreditCard,
      features: ['Pagamentos recorrentes', 'Faturas automáticas', 'Relatórios financeiros'],
      documentationUrl: '/documentacao#stripe'
    },
    {
      id: 61,
      name: 'PayPal',
      description: 'Pagamentos internacionais',
      category: 'Financeiro',
      status: 'disponivel',
      icon: CreditCard,
      features: ['Pagamentos seguros', 'Conversão de moedas', 'Proteção de vendedor'],
      documentationUrl: '/documentacao#paypal'
    },
    {
      id: 62,
      name: 'MB Way',
      description: 'Pagamentos móveis portugueses',
      category: 'Financeiro',
      status: 'em_desenvolvimento',
      icon: Smartphone,
      features: ['Pagamentos instantâneos', 'QR Code', 'Transferências rápidas'],
      documentationUrl: '/documentacao#mbway'
    },
    
    // CRM & Gestão
    {
      id: 70,
      name: 'Salesforce',
      description: 'CRM para escritórios de advocacia',
      category: 'CRM',
      status: 'em_desenvolvimento',
      icon: Briefcase,
      features: ['Gestão de clientes', 'Pipeline de vendas', 'Relatórios detalhados'],
      documentationUrl: '/documentacao#salesforce'
    },
    {
      id: 71,
      name: 'HubSpot',
      description: 'Marketing e vendas para advogados',
      category: 'CRM',
      status: 'em_desenvolvimento',
      icon: Users,
      features: ['Lead tracking', 'Email marketing', 'Automação de vendas'],
      documentationUrl: '/documentacao#hubspot'
    },
    
    // Outros
    {
      id: 80,
      name: 'Zapier',
      description: 'Automação entre aplicações',
      category: 'Automação',
      status: 'disponivel',
      icon: Zap,
      features: ['Workflows personalizados', '5000+ integrações', 'Triggers automáticos'],
      documentationUrl: '/documentacao#zapier'
    },
    {
      id: 81,
      name: 'IFTTT',
      description: 'Se isto então aquilo - automações simples',
      category: 'Automação',
      status: 'disponivel',
      icon: Settings,
      features: ['Automações simples', 'Dispositivos IoT', 'Ações programadas'],
      documentationUrl: '/documentacao#ifttt'
    }
  ];

  const categorias = [
    'Todas',
    'Tribunais',
    'Governo',
    'Email',
    'Comunicação',
    'Armazenamento',
    'Calendário',
    'Produtividade',
    'Móvel',
    'Financeiro',
    'CRM',
    'Automação'
  ];

  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const integracoesFiltradas = categoriaAtiva === 'Todas' 
    ? integracoesDisponiveis 
    : integracoesDisponiveis.filter(int => int.category === categoriaAtiva);

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

  const contarPorStatus = (status: string) => {
    return integracoesDisponiveis.filter(int => int.status === status).length;
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
              Conecte-se aos principais sistemas e ferramentas para automatizar o seu trabalho jurídico
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
                  <p className="text-2xl font-bold text-green-600">{contarPorStatus('disponivel')}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{contarPorStatus('em_desenvolvimento')}</p>
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
                  <p className="text-2xl font-bold text-primary-800">{integracoesDisponiveis.length}</p>
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
                  <p className="text-2xl font-bold text-blue-600">{categorias.length - 1}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={categoriaAtiva === categoria ? "default" : "outline"}
                onClick={() => setCategoriaAtiva(categoria)}
                className={categoriaAtiva === categoria ? "bg-primary-800 hover:bg-primary-700" : ""}
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>

        {/* Available Integrations Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">
            {categoriaAtiva === 'Todas' ? 'Todas as Integrações' : `Integrações de ${categoriaAtiva}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integracoesFiltradas.map((integracao) => {
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
                          <CardTitle className="text-primary-800 text-lg">{integracao.name}</CardTitle>
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
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
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
