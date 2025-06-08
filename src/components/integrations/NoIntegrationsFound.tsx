
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoIntegrationsFound = () => {
  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Não encontra a integração que procura?
        </h3>
        <p className="text-gray-600 mb-4">
          Contacte-nos para sugerir novas integrações ou solicitar suporte.
        </p>
        <Button variant="outline" asChild>
          <Link to="/contato">
            <ExternalLink className="h-4 w-4 mr-2" />
            Contactar Suporte
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoIntegrationsFound;
