
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Server, Database, Shield, Zap, Globe } from 'lucide-react';

const StatusSistema = () => {
  const services = [
    {
      name: 'Aplicação Web',
      status: 'operational',
      uptime: '99.99%',
      icon: Globe
    },
    {
      name: 'API',
      status: 'operational',
      uptime: '99.98%',
      icon: Zap
    },
    {
      name: 'Base de Dados',
      status: 'operational',
      uptime: '99.99%',
      icon: Database
    },
    {
      name: 'Autenticação',
      status: 'operational',
      uptime: '99.97%',
      icon: Shield
    },
    {
      name: 'Armazenamento',
      status: 'operational',
      uptime: '99.99%',
      icon: Server
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Status do Sistema
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Operacional</Badge>
              <span className="text-gray-600">
                Todos os sistemas funcionam normalmente
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-800 mb-8 text-center">Estado dos Serviços</h2>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <service.icon className="h-6 w-6 text-primary-800" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-800">{service.name}</h3>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <Badge className="bg-green-100 text-green-800">Operacional</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Incidents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-800 mb-8 text-center">Histórico de Incidentes</h2>
          
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                Nenhum Incidente Reportado
              </h3>
              <p className="text-gray-600">
                Todos os serviços estão a funcionar normalmente nos últimos 30 dias.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StatusSistema;
