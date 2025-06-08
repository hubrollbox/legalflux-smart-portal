
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';

const LGPD = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Proteção de Dados Pessoais
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O LegalFlux está comprometido com a proteção dos seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introdução */}
          <Card className="rounded-2xl border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-primary-800 flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Esta Política de Proteção de Dados explica como o LegalFlux ("nós", "nosso" ou "empresa") 
                recolhe, utiliza, armazena e protege as suas informações pessoais quando utiliza a nossa plataforma 
                de gestão jurídica.
              </p>
              <p>
                Ao utilizar os nossos serviços, concorda com as práticas descritas nesta política. 
                Se não concordar com qualquer parte desta política, não deve utilizar os nossos serviços.
              </p>
            </CardContent>
          </Card>

          {/* Dados Recolhidos */}
          <Card className="rounded-2xl border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-primary-800 flex items-center">
                <Eye className="h-6 w-6 mr-3" />
                2. Dados Pessoais Recolhidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-800 mb-2">2.1 Dados de Registo</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Nome completo</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone</li>
                    <li>NIF (para profissionais e empresas)</li>
                    <li>Organização/Escritório</li>
                    <li>Tipo de utilizador</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary-800 mb-2">2.2 Dados de Utilização</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Informações sobre como utiliza a plataforma</li>
                    <li>Logs de acesso e atividade</li>
                    <li>Dados de navegação e preferências</li>
                    <li>Endereço IP e informações do dispositivo</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-800 mb-2">2.3 Dados Jurídicos</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Informações de processos jurídicos</li>
                    <li>Documentos legais carregados</li>
                    <li>Comunicações entre advogados e clientes</li>
                    <li>Dados financeiros relacionados com honorários</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contactos */}
          <Card className="rounded-2xl border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-primary-800 flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                Para Mais Informações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Para exercer os seus direitos ou esclarecer dúvidas sobre esta política, contacte-nos:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-800" />
                    <div>
                      <p className="font-medium text-primary-800">Email</p>
                      <p className="text-gray-600">privacidade@legalflux.pt</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-800" />
                    <div>
                      <p className="font-medium text-primary-800">Telefone</p>
                      <p className="text-gray-600">+351 21 000 0000</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                  <p className="text-sm text-accent-800">
                    <strong>Encarregado de Proteção de Dados:</strong> dpo@legalflux.pt
                  </p>
                  <p className="text-sm text-accent-600 mt-1">
                    Pode também apresentar queixa à Comissão Nacional de Proteção de Dados (CNPD).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alterações */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary-800">Alterações a Esta Política</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Podemos atualizar esta política ocasionalmente. Notificaremos sobre alterações significativas 
                através da plataforma ou por email.
              </p>
              <p>
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LGPD;
