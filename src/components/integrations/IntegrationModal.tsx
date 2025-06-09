
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvailableIntegration, useIntegrations } from '@/hooks/useIntegrations';
import { ExternalLink, Key, Settings } from 'lucide-react';

interface IntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableIntegrations: AvailableIntegration[];
}

const IntegrationModal = ({ open, onOpenChange, availableIntegrations }: IntegrationModalProps) => {
  const [selectedIntegration, setSelectedIntegration] = useState<AvailableIntegration | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    api_key: '',
    secret: '',
    endpoint: '',
    config: ''
  });
  const [loading, setLoading] = useState(false);
  const { addIntegration } = useIntegrations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntegration) return;

    setLoading(true);
    try {
      const credentials = selectedIntegration.type === 'oauth' 
        ? { redirect_uri: `${window.location.origin}/integrations/callback` }
        : {
            api_key: formData.api_key,
            secret: formData.secret,
            endpoint: formData.endpoint
          };

      const config = formData.config ? JSON.parse(formData.config) : {};

      await addIntegration({
        integration_type: selectedIntegration.type,
        name: formData.name || selectedIntegration.name,
        credentials,
        config
      });

      onOpenChange(false);
      setSelectedIntegration(null);
      setFormData({ name: '', api_key: '', secret: '', endpoint: '', config: '' });
    } catch (error) {
      console.error('Error adding integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const initiateOAuth = () => {
    if (!selectedIntegration) return;
    
    // Simular redirecionamento OAuth - em produção seria para o provider real
    const oauthUrl = `https://oauth.provider.com/authorize?client_id=demo&redirect_uri=${encodeURIComponent(window.location.origin + '/integrations/callback')}&scope=read_write`;
    window.open(oauthUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Integração</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedIntegration ? (
            <div>
              <Label className="text-base font-medium">Escolha uma integração:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {availableIntegrations.map((integration) => (
                  <Button
                    key={integration.id}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{integration.description}</div>
                      <div className="text-xs text-primary-600 mt-1">{integration.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedIntegration.name}</h3>
                  <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIntegration(null)}
                >
                  ← Voltar
                </Button>
              </div>

              <Tabs defaultValue={selectedIntegration.type === 'oauth' ? 'oauth' : 'manual'}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="oauth" disabled={selectedIntegration.type !== 'oauth'}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    OAuth
                  </TabsTrigger>
                  <TabsTrigger value="manual" disabled={selectedIntegration.type !== 'manual'}>
                    <Key className="h-4 w-4 mr-2" />
                    Manual
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="oauth" className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Configuração OAuth</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Clique no botão abaixo para autorizar a integração com {selectedIntegration.name}.
                    </p>
                  </div>
                  <Button onClick={initiateOAuth} className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Autorizar {selectedIntegration.name}
                  </Button>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome da Integração</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={selectedIntegration.name}
                      />
                    </div>

                    <div>
                      <Label htmlFor="api_key">API Key</Label>
                      <Input
                        id="api_key"
                        type="password"
                        value={formData.api_key}
                        onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                        placeholder="Sua chave API"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="secret">Secret (opcional)</Label>
                      <Input
                        id="secret"
                        type="password"
                        value={formData.secret}
                        onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                        placeholder="Chave secreta"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endpoint">Endpoint (opcional)</Label>
                      <Input
                        id="endpoint"
                        value={formData.endpoint}
                        onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                        placeholder="https://api.exemplo.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="config">Configuração Avançada (JSON)</Label>
                      <Textarea
                        id="config"
                        value={formData.config}
                        onChange={(e) => setFormData({ ...formData, config: e.target.value })}
                        placeholder='{"timeout": 5000, "retries": 3}'
                        rows={3}
                      />
                    </div>

                    {selectedIntegration.documentation_url && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <a
                          href={selectedIntegration.documentation_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver documentação da API
                        </a>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'A adicionar...' : 'Adicionar Integração'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationModal;
