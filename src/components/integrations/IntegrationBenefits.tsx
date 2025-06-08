
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Database } from 'lucide-react';

const IntegrationBenefits = () => {
  return (
    <Card className="rounded-2xl border-0 shadow-lg mb-12">
      <CardHeader>
        <CardTitle className="text-primary-800 text-center text-2xl">
          Benefícios das Integrações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-50 p-6 rounded-xl mb-4">
              <Zap className="h-12 w-12 text-green-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-primary-800 mb-2 text-lg">Automatização</h4>
            <p className="text-gray-600">Reduz o trabalho manual e aumenta a eficiência do seu escritório</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 p-6 rounded-xl mb-4">
              <Shield className="h-12 w-12 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-primary-800 mb-2 text-lg">Segurança</h4>
            <p className="text-gray-600">Conexões seguras e conformes com RGPD e legislação portuguesa</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-50 p-6 rounded-xl mb-4">
              <Database className="h-12 w-12 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-primary-800 mb-2 text-lg">Centralização</h4>
            <p className="text-gray-600">Todos os dados numa só plataforma, acessível a qualquer momento</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationBenefits;
