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
import IntegrationDialog from '@/components/integrations/IntegrationDialog';
import EmptyActiveIntegrations from '@/components/integrations/EmptyActiveIntegrations';
import MyIntegrationsStats from '@/components/integrations/MyIntegrationsStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { UserIntegration } from '@/hooks/useIntegrations';
import { useAuth } from '@/contexts/useAuth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MinhasIntegracoes = () => {
  const { user, role, hasPermission } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editIntegration, setEditIntegration] = useState<UserIntegration | null>(null);
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

  const handleExportCredentials = (integration: UserIntegration) => {
    const data = {
      name: integration.name || integration.integration_type,
      type: integration.integration_type,
      credentials: integration.credentials,
      config: integration.config,
      exported_at: new Date().toISOString()
    };
    const filename = `${(integration.name || integration.integration_type).toLowerCase().replace(/\s+/g, '-')}-credentials.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Sucesso',
      description: 'Credenciais exportadas com sucesso!'
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

  // Exemplo de RBAC: só permite acesso a admin/advogado
  if (!hasPermission?.('manage_integrations')) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Acesso restrito: você não tem permissão para gerir integrações.
      </div>
    );
  }

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <LinkIcon className="h-8 w-8 mr-3" />
              Minhas Integrações
            </h1>
            <p className="text-gray-600">Gerir e configurar as suas integrações ativas</p>
          </div>
          <div className="flex space-x-2 w-full md:w-auto">
            <Button variant="outline" asChild className="flex-1 md:flex-none">
              <Link to="/integracoes">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Catálogo
              </Link>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleAddIntegration} className="flex-1 md:flex-none">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Adicionar nova integração</TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                  <Card key={integration.id} className="rounded-2xl border-0 shadow-lg group transition-transform hover:scale-[1.01]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-primary-800 text-lg truncate max-w-[180px]">{integration.name || integration.integration_type}</CardTitle>
                        <Badge className={`text-xs ${getStatusColor(integration.status || 'ativo')}`}>{integration.status || 'ativo'}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 capitalize truncate">{integration.integration_type}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {integration.last_sync && (
                          <p className="text-xs text-gray-500">
                            Última sincronização: {new Date(integration.last_sync).toLocaleString('pt-PT')}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setEditIntegration(integration)} aria-label="Editar integração">
                                  <Settings className="h-4 w-4 mr-1" />Editar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Editar integração</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => handleExportCredentials(integration)} aria-label="Exportar credenciais">
                                  <Download className="h-4 w-4 mr-1" />Exportar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Exportar credenciais</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="destructive" onClick={() => handleRemoveIntegration(integration.id, integration.name || integration.integration_type)} aria-label="Remover integração">
                                  <Trash2 className="h-4 w-4 mr-1" />Remover
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Remover integração</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
                          <a href={integration.documentation_url} target="_blank" rel="noopener noreferrer" title="Ver documentação da integração">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Ver documentação</span>
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

        <IntegrationDialog
          integration={editIntegration}
          open={!!editIntegration}
          onOpenChange={(open) => setEditIntegration(open ? editIntegration : null)}
          onSave={updateIntegration}
        />
      </div>
    </DashboardLayout>
  );
};

export default MinhasIntegracoes;
