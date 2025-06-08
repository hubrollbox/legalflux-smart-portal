
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Database,
  Settings,
  Plus,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MinhasIntegracoes = () => {
  const integracoesConfiguradas = [
    {
      id: 1,
      name: 'CITIUS',
      status: 'conectado',
      lastSync: '2024-01-10 14:30',
      icon: Database,
      syncFrequency: 'A cada 4 horas'
    },
    {
      id: 5,
      name: 'Segurança Social',
      status: 'conectado',
      lastSync: '2024-01-09 16:45',
      icon: Database,
      syncFrequency: 'Diário'
    }
  ];

  const integracoesDisponiveis = [
    {
      id: 2,
      name: 'Portal da Justiça',
      description: 'Acesso aos serviços judiciais online',
      icon: Database
    },
    {
      id: 4,
      name: 'AT - Autoridade Tributária',
      description: 'Portal das Finanças',
      icon: Database
    }
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Integrações Ativas</p>
                      <p className="text-2xl font-bold text-green-600">{integracoesConfiguradas.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Última Sincronização</p>
                      <p className="text-lg font-bold text-primary-800">Hoje, 14:30</p>
                    </div>
                    <RefreshCw className="h-8 w-8 text-primary-800" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Estado Geral</p>
                      <p className="text-lg font-bold text-green-600">Operacional</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Integrations */}
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
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Conectado
                          </Badge>
                        </div>
                      </div>
                      <Settings className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Última sincronização:</p>
                        <p className="text-sm font-medium">{integracao.lastSync}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Frequência:</p>
                        <p className="text-sm font-medium">{integracao.syncFrequency}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-1" />
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
                    <AlertCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma integração ativa
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Configure suas primeiras integrações para começar a sincronizar dados.
                  </p>
                  <Button onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const disponiveisTab = tabs?.querySelector('[value="disponiveis"]') as HTMLElement;
                    disponiveisTab?.click();
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Integração
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="disponiveis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integracoesDisponiveis.map((integracao) => (
                <Card key={integracao.id} className="rounded-2xl border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-primary-50">
                        <integracao.icon className="h-6 w-6 text-primary-800" />
                      </div>
                      <div>
                        <CardTitle className="text-primary-800">{integracao.name}</CardTitle>
                        <p className="text-sm text-gray-600">{integracao.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-primary-800 hover:bg-primary-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Conectar
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/documentacao">
                          Ver Instruções
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Não encontra a integração que procura?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contacte-nos para sugerir novas integrações ou solicitar suporte.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contato">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contactar Suporte
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MinhasIntegracoes;
