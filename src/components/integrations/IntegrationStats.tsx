
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, LinkIcon, Building } from 'lucide-react';
import { Integration } from '@/data/integrations';

interface IntegrationStatsProps {
  integrations: Integration[];
  categories: string[];
}

const IntegrationStats = ({ integrations, categories }: IntegrationStatsProps) => {
  const contarPorStatus = (status: string) => {
    return integrations.filter(int => int.status === status).length;
  };

  return (
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
              <p className="text-2xl font-bold text-primary-800">{integrations.length}</p>
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
              <p className="text-2xl font-bold text-blue-600">{categories.length - 1}</p>
            </div>
            <Building className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationStats;
