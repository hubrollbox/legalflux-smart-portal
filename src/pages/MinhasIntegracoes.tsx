
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon,
  ExternalLink,
  Plus,
  Settings,
  Trash2,
  Download,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntegrations } from '@/hooks/useIntegrations';
import IntegrationModal from '@/components/integrations/IntegrationModal';
import EmptyActiveIntegrations from '@/components/integrations/EmptyActiveIntegrations';
import MyIntegrationsStats from '@/components/integrations/MyIntegrationsStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MinhasIntegracoes = () => {
  const [showModal, setShowModal] = useState(false);
  const { userIntegrations, availableIntegrations, loading, removeIntegration, updateIntegration } = useIntegrations();
  const { toast } = useToast();

  const handleAddIntegration = () => {
    setShowModal(true);
  };

  const handleRemoveIntegration = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover a integração com ${name}?`)) {
      await removeIntegration(id);
    }
  };

  const handleExportCredentials = (integration: any) => {
    const data = {
      name: integration.name,
      type: integration.integration_type,
      credentials: integration.credentials,
      config: integration.config,
      exported_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${integration.name.toLowerCase().replace(/\s+/g, '-')}-credentials.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Credenciais exportadas com sucesso!"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'erro': return 'bg-red-100 text-red-800 border-red-200';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                Ver Catálogo
              </Link>
            </Button>
            <Button onClick={handleAddIntegration}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
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
            <MyIntegrationsStats activeIntegrationsCount={userIntegrations.length} />

            {/* Active Integrations */}
            {userIntegrations.length === 0 ? (
              <EmptyActiveIntegrations onAddIntegration={handleAddIntegration} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userIntegrations.map((integration) => (
                  <Card key={integration.id} className="rounded-2xl border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-primary-800 text-lg">{integration.name}</CardTitle>
                        <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 capitalize">{integration.integration_type}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        {integration.last_sync && (
                          <p className="text-xs text-gray-500">
                            Última sincronização: {new Date(integration.last_sync).toLocaleString('pt-PT')}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleExportCredentials(integration)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Exportar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRemoveIntegration(integration.id, integration.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="disponiveis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableIntegrations.map((integration) => (
                <Card key={integration.id} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-primary-50">
                        <Zap className="h-6 w-6 text-primary-800" />
                      </div>
                      <div>
                        <CardTitle className="text-primary-800 text-lg">{integration.name}</CardTitle>
                        <p className="text-sm text-gray-500">{integration.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{integration.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary-800 hover:bg-primary-700"
                        onClick={handleAddIntegration}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Conectar
                      </Button>
                      {integration.documentation_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={integration.documentation_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <IntegrationModal
          open={showModal}
          onOpenChange={setShowModal}
          availableIntegrations={availableIntegrations}
        />
      </div>
    </DashboardLayout>
  );
};

export default MinhasIntegracoes;
