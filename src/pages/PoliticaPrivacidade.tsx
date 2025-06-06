
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const PoliticaPrivacidade = () => {
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
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-600">
              Última atualização: 6 de junho de 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">1. Informações que Recolhemos</h2>
                <p className="text-gray-700 mb-4">
                  Recolhemos informações que nos fornece directamente, como quando cria uma conta, 
                  actualiza o seu perfil, ou entra em contacto connosco.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Informações de conta (nome, email, telefone)</li>
                  <li>Informações profissionais (número da Ordem, especialização)</li>
                  <li>Dados de utilização da plataforma</li>
                  <li>Dados jurídicos (processos, documentos, comunicações)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">2. Como Utilizamos as Suas Informações</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Fornecer e manter os nossos serviços</li>
                  <li>Processar transações e enviar confirmações</li>
                  <li>Comunicar consigo sobre a sua conta</li>
                  <li>Melhorar a nossa plataforma</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">3. Proteção de Dados</h2>
                <p className="text-gray-700 mb-4">
                  Implementamos medidas de segurança rigorosas para proteger as suas informações:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Criptografia AES-256 para dados em repouso</li>
                  <li>TLS 1.3 para transmissão de dados</li>
                  <li>Autenticação de dois factores</li>
                  <li>Auditoria e monitorização contínua</li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-accent-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Contacto</h2>
              <p className="text-gray-700 mb-4">
                Se tiver questões sobre esta Política de Privacidade, contacte-nos:
              </p>
              <div className="text-gray-700">
                <p><strong>Email:</strong> privacidade@legalflux.com</p>
                <p><strong>Endereço:</strong> Avenida da Liberdade, 123, Lisboa, Portugal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
