
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus } from 'lucide-react';

interface EmptyActiveIntegrationsProps {
  onAddIntegration: () => void;
}

const EmptyActiveIntegrations = ({ onAddIntegration }: EmptyActiveIntegrationsProps) => {
  return (
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
        <Button onClick={onAddIntegration}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Integração
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyActiveIntegrations;
