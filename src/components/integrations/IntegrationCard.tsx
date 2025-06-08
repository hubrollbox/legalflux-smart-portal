
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Integration } from '@/data/integrations';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-100 text-green-800';
      case 'em_desenvolvimento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'disponivel':
        return CheckCircle;
      case 'em_desenvolvimento':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'Disponível';
      case 'em_desenvolvimento':
        return 'Em Desenvolvimento';
      default:
        return 'Indisponível';
    }
  };

  const StatusIcon = getStatusIcon(integration.status);

  return (
    <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-primary-50">
              <integration.icon className="h-6 w-6 text-primary-800" />
            </div>
            <div>
              <CardTitle className="text-primary-800 text-lg">{integration.name}</CardTitle>
              <p className="text-sm text-gray-500">{integration.category}</p>
            </div>
          </div>
          <Badge className={getStatusColor(integration.status)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {getStatusText(integration.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">{integration.description}</p>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-gray-700">Funcionalidades:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {integration.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={integration.documentationUrl}>
              Ver Instruções
            </Link>
          </Button>
          {integration.status === 'disponivel' ? (
            <Button size="sm" className="flex-1 bg-primary-800 hover:bg-primary-700" asChild>
              <Link to="/login">
                Começar
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled className="flex-1">
              Em Breve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
