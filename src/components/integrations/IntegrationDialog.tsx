
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserIntegration } from '@/hooks/useIntegrations';
import { Settings, Save } from 'lucide-react';

interface IntegrationDialogProps {
  integration: UserIntegration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<UserIntegration>) => Promise<void>;
}

const IntegrationDialog = ({ integration, open, onOpenChange, onSave }: IntegrationDialogProps) => {
  const [formData, setFormData] = useState({
    name: integration?.name || '',
    api_key: integration?.credentials?.api_key || '',
    secret: integration?.credentials?.secret || '',
    endpoint: integration?.credentials?.endpoint || '',
    config: JSON.stringify(integration?.config || {}, null, 2)
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!integration) return;

    setLoading(true);
    try {
      const updates = {
        name: formData.name,
        credentials: {
          ...integration.credentials,
          api_key: formData.api_key,
          secret: formData.secret,
          endpoint: formData.endpoint
        },
        config: formData.config ? JSON.parse(formData.config) : {}
      };

      await onSave(integration.id, updates);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating integration:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!integration) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Editar {integration.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nome da Integração</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {integration.integration_type === 'manual' && (
            <>
              <div>
                <Label htmlFor="edit-api-key">API Key</Label>
                <Input
                  id="edit-api-key"
                  type="password"
                  value={formData.api_key}
                  onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-secret">Secret</Label>
                <Input
                  id="edit-secret"
                  type="password"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-endpoint">Endpoint</Label>
                <Input
                  id="edit-endpoint"
                  value={formData.endpoint}
                  onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="edit-config">Configuração (JSON)</Label>
            <Textarea
              id="edit-config"
              value={formData.config}
              onChange={(e) => setFormData({ ...formData, config: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'A guardar...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDialog;
