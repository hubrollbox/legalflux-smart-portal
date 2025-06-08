
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface MyIntegrationsStatsProps {
  activeIntegrationsCount: number;
}

const MyIntegrationsStats = ({ activeIntegrationsCount }: MyIntegrationsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="rounded-2xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Integrações Ativas</p>
              <p className="text-2xl font-bold text-green-600">{activeIntegrationsCount}</p>
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
              <p className="text-lg font-bold text-primary-800">Hoje, 16:00</p>
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
  );
};

export default MyIntegrationsStats;
