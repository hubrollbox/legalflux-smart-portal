
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const TermosUso = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Termos de Uso
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
                <h2 className="text-2xl font-bold text-primary-800 mb-4">1. Aceitação dos Termos</h2>
                <p className="text-gray-700">
                  Ao aceder e utilizar a plataforma LegalFlux, concorda em cumprir e estar vinculado 
                  a estes Termos de Uso. Se não concordar com alguma parte destes termos, não deve 
                  utilizar os nossos serviços.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">2. Elegibilidade</h2>
                <p className="text-gray-700 mb-4">
                  A plataforma destina-se exclusivamente a profissionais do direito licenciados 
                  e seus clientes. Todas as contas estão sujeitas a aprovação manual.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">3. Uso Aceitável</h2>
                <div className="text-gray-700">
                  <p className="mb-4"><strong>Permitido:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Gestão de processos jurídicos legítimos</li>
                    <li>Comunicação profissional com clientes</li>
                    <li>Armazenamento seguro de documentos legais</li>
                  </ul>
                  
                  <p className="mb-4"><strong>Proibido:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Actividades ilegais ou não éticas</li>
                    <li>Violação do sigilo profissional</li>
                    <li>Partilha não autorizada de credenciais</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Contacto</h2>
              <p className="text-gray-700 mb-4">
                Para questões sobre estes Termos de Uso, entre em contacto:
              </p>
              <div className="text-gray-700">
                <p><strong>Email:</strong> legal@legalflux.com</p>
                <p><strong>Telefone:</strong> +351 210 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermosUso;
