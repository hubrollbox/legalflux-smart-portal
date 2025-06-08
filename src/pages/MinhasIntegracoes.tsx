
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon,
  ExternalLink,
  Database,
  Mail,
  Cloud,
  Calendar,
  MessageSquare,
  CreditCard,
  FileText,
  Smartphone,
  Shield,
  Globe,
  Zap,
  Video,
  Users,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ActiveIntegrationCard from '@/components/integrations/ActiveIntegrationCard';
import AvailableIntegrationCard from '@/components/integrations/AvailableIntegrationCard';
import MyIntegrationsStats from '@/components/integrations/MyIntegrationsStats';
import EmptyActiveIntegrations from '@/components/integrations/EmptyActiveIntegrations';
import NoIntegrationsFound from '@/components/integrations/NoIntegrationsFound';

const MinhasIntegracoes = () => {
  const integracoesConfiguradas = [
    {
      id: 1,
      name: 'CITIUS',
      status: 'conectado',
      lastSync: '2024-01-10 14:30',
      icon: Database,
      syncFrequency: 'A cada 4 horas',
      category: 'Tribunais'
    },
    {
      id: 5,
      name: 'Segurança Social',
      status: 'conectado',
      lastSync: '2024-01-09 16:45',
      icon: Database,
      syncFrequency: 'Diário',
      category: 'Governo'
    },
    {
      id: 10,
      name: 'Gmail',
      status: 'conectado',
      lastSync: '2024-01-10 15:20',
      icon: Mail,
      syncFrequency: 'Tempo real',
      category: 'Email'
    },
    {
      id: 20,
      name: 'Google Drive',
      status: 'conectado',
      lastSync: '2024-01-10 16:00',
      icon: Cloud,
      syncFrequency: 'Automático',
      category: 'Armazenamento'
    },
    {
      id: 30,
      name: 'Google Calendar',
      status: 'conectado',
      lastSync: '2024-01-10 14:45',
      icon: Calendar,
      syncFrequency: 'Tempo real',
      category: 'Calendário'
    }
  ];

  const integracoesDisponiveis = [
    {
      id: 2,
      name: 'Portal da Justiça',
      description: 'Acesso aos serviços judiciais online',
      icon: Globe,
      category: 'Governo'
    },
    {
      id: 4,
      name: 'AT - Autoridade Tributária',
      description: 'Portal das Finanças',
      icon: Shield,
      category: 'Fiscal'
    },
    {
      id: 11,
      name: 'Outlook',
      description: 'Microsoft Outlook para escritórios',
      icon: Mail,
      category: 'Email'
    },
    {
      id: 12,
      name: 'WhatsApp Business',
      description: 'Comunicação com clientes via WhatsApp',
      icon: MessageSquare,
      category: 'Comunicação'
    },
    {
      id: 13,
      name: 'Zoom',
      description: 'Videoconferências para audiências',
      icon: Video,
      category: 'Comunicação'
    },
    {
      id: 14,
      name: 'Microsoft Teams',
      description: 'Colaboração em equipa',
      icon: Users,
      category: 'Comunicação'
    },
    {
      id: 21,
      name: 'Dropbox',
      description: 'Sincronização de ficheiros',
      icon: Cloud,
      category: 'Armazenamento'
    },
    {
      id: 22,
      name: 'OneDrive',
      description: 'Armazenamento Microsoft',
      icon: Cloud,
      category: 'Armazenamento'
    },
    {
      id: 31,
      name: 'Outlook Calendar',
      description: 'Calendário Microsoft',
      icon: Calendar,
      category: 'Calendário'
    },
    {
      id: 40,
      name: 'Microsoft Office 365',
      description: 'Suite completa de produtividade',
      icon: FileText,
      category: 'Produtividade'
    },
    {
      id: 41,
      name: 'Google Workspace',
      description: 'Ferramentas colaborativas Google',
      icon: FileText,
      category: 'Produtividade'
    },
    {
      id: 42,
      name: 'Adobe Acrobat',
      description: 'Gestão avançada de PDFs',
      icon: FileText,
      category: 'Produtividade'
    },
    {
      id: 43,
      name: 'Notion',
      description: 'Base de conhecimento e notas',
      icon: BookOpen,
      category: 'Produtividade'
    },
    {
      id: 50,
      name: 'iOS Shortcuts',
      description: 'Automatizações para iPhone/iPad',
      icon: Smartphone,
      category: 'Móvel'
    },
    {
      id: 51,
      name: 'Android Tasker',
      description: 'Automatizações para Android',
      icon: Smartphone,
      category: 'Móvel'
    },
    {
      id: 60,
      name: 'Stripe',
      description: 'Processamento de pagamentos',
      icon: CreditCard,
      category: 'Financeiro'
    },
    {
      id: 61,
      name: 'PayPal',
      description: 'Pagamentos internacionais',
      icon: CreditCard,
      category: 'Financeiro'
    },
    {
      id: 70,
      name: 'Salesforce',
      description: 'CRM para escritórios',
      icon: Briefcase,
      category: 'CRM'
    },
    {
      id: 71,
      name: 'HubSpot',
      description: 'Marketing e vendas',
      icon: Users,
      category: 'CRM'
    },
    {
      id: 80,
      name: 'Zapier',
      description: 'Automação entre aplicações',
      icon: Zap,
      category: 'Automação'
    }
  ];

  const handleAddIntegration = () => {
    const tabs = document.querySelector('[role="tablist"]');
    const disponiveisTab = tabs?.querySelector('[value="disponiveis"]') as HTMLElement;
    disponiveisTab?.click();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <LinkIcon className="h-8 w-8 mr-3" />
              Minhas Integrações
            </h1>
            <p className="text-gray-600">Gerir e configurar as suas integrações ativas</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/integracoes">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Todas
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="ativas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ativas">Integrações Ativas</TabsTrigger>
            <TabsTrigger value="disponiveis">Adicionar Novas</TabsTrigger>
          </TabsList>

          <TabsContent value="ativas" className="space-y-6">
            {/* Statistics */}
            <MyIntegrationsStats activeIntegrationsCount={integracoesConfiguradas.length} />

            {/* Active Integrations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integracoesConfiguradas.map((integracao) => (
                <ActiveIntegrationCard key={integracao.id} integration={integracao} />
              ))}
            </div>

            {integracoesConfiguradas.length === 0 && (
              <EmptyActiveIntegrations onAddIntegration={handleAddIntegration} />
            )}
          </TabsContent>

          <TabsContent value="disponiveis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integracoesDisponiveis.map((integracao) => (
                <AvailableIntegrationCard key={integracao.id} integration={integracao} />
              ))}
            </div>

            <NoIntegrationsFound />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MinhasIntegracoes;
