
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Key, Server } from 'lucide-react';

const Seguranca = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Segurança de Nível Bancário
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A sua informação jurídica é extremamente sensível. Por isso, implementamos 
              os mais altos padrões de segurança da indústria para proteger os seus dados.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: 'Criptografia de Ponta a Ponta',
                description: 'Todos os dados são criptografados usando AES-256, o mesmo padrão utilizado por instituições bancárias.',
                details: ['AES-256 encryption', 'TLS 1.3 para transmissão', 'Chaves únicas por utilizador']
              },
              {
                icon: Key,
                title: 'Autenticação Dupla (2FA)',
                description: 'Camada adicional de segurança com autenticação de dois fatores obrigatória.',
                details: ['SMS ou aplicação authenticator', 'Backup codes seguros', 'Gestão centralizada']
              },
              {
                icon: Server,
                title: 'Infraestrutura Segura',
                description: 'Servidores em data centers certificados ISO 27001 com monitorização 24/7.',
                details: ['Data centers certificados', 'Backups automáticos', 'Monitorização 24/7']
              },
              {
                icon: Shield,
                title: 'Conformidade LGPD',
                description: 'Total conformidade com a Lei Geral de Proteção de Dados e regulamentações internacionais.',
                details: ['Conformidade LGPD', 'GDPR compliant', 'Políticas transparentes']
              }
            ].map((feature, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-4 rounded-xl mr-6">
                      <feature.icon className="h-8 w-8 text-primary-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Seguranca;
