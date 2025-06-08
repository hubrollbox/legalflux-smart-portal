
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Settings, RefreshCw } from 'lucide-react';

interface ActiveIntegration {
  id: number;
  name: string;
  status: string;
  lastSync: string;
  icon: any;
  syncFrequency: string;
  category: string;
}

interface ActiveIntegrationCardProps {
  integration: ActiveIntegration;
}

const ActiveIntegrationCard = ({ integration }: ActiveIntegrationCardProps) => {
  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-primary-50">
              <integration.icon className="h-6 w-6 text-primary-800" />
            </div>
            <div>
              <CardTitle className="text-primary-800 text-lg">{integration.name}</CardTitle>
              <p className="text-sm text-gray-500">{integration.category}</p>
              <Badge className="bg-green-100 text-green-800 mt-1">
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
            <p className="text-sm font-medium">{integration.lastSync}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Frequência:</p>
            <p className="text-sm font-medium">{integration.syncFrequency}</p>
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
  );
};

export default ActiveIntegrationCard;
