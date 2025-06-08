
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AvailableIntegration {
  id: number;
  name: string;
  description: string;
  icon: any;
  category: string;
}

interface AvailableIntegrationCardProps {
  integration: AvailableIntegration;
}

const AvailableIntegrationCard = ({ integration }: AvailableIntegrationCardProps) => {
  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-primary-50">
            <integration.icon className="h-6 w-6 text-primary-800" />
          </div>
          <div>
            <CardTitle className="text-primary-800 text-lg">{integration.name}</CardTitle>
            <p className="text-sm text-gray-500">{integration.category}</p>
            <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
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
  );
};

export default AvailableIntegrationCard;
