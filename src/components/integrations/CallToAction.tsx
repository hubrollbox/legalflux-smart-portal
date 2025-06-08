
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-primary-50 to-accent-50">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold text-primary-800 mb-4">
          Pronto para começar?
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          Registe-se no LegalFlux e conecte-se aos sistemas que já utiliza
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-primary-800 hover:bg-primary-700" asChild>
            <Link to="/register">
              <Users className="h-5 w-5 mr-2" />
              Criar Conta
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contato">
              <ExternalLink className="h-5 w-5 mr-2" />
              Falar Connosco
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallToAction;
