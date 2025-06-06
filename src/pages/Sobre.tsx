
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Shield, Users, Zap, Heart, Target } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Sobre o LegalFlux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolucionamos a gestão jurídica com tecnologia avançada, inteligência artificial 
              e foco na experiência do utilizador, desenvolvido com ❤️ para a comunidade jurídica dos PALOP.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">
                A Nossa Missão
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Democratizar o acesso à tecnologia jurídica de alta qualidade, oferecendo 
                uma plataforma que centraliza e automatiza toda a vida jurídica de clientes, 
                advogados e escritórios.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-accent-600 mr-3" />
                  <span className="text-gray-700">Eficiência máxima</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-accent-600 mr-3" />
                  <span className="text-gray-700">Segurança total</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-accent-600 mr-3" />
                  <span className="text-gray-700">Colaboração simples</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-accent-600 mr-3" />
                  <span className="text-gray-700">IA integrada</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-8 rounded-2xl">
              <Scale className="h-32 w-32 text-primary-800 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Os Nossos Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Construímos cada funcionalidade com base em princípios sólidos que guiam 
              o nosso trabalho diário.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Scale className="h-10 w-10 text-primary-800" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Transparência</h3>
                <p className="text-gray-600">
                  Processos claros, comunicação aberta e informações sempre acessíveis 
                  para todos os utilizadores.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-accent-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Segurança</h3>
                <p className="text-gray-600">
                  Proteção máxima de dados com criptografia avançada e conformidade 
                  total com o LGPD.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Comunidade</h3>
                <p className="text-gray-600">
                  Desenvolvido com amor para fortalecer a comunidade jurídica dos 
                  países de língua portuguesa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Transformar a Sua Gestão Jurídica?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais que já revolucionaram 
            a forma como gerem os seus processos jurídicos.
          </p>
          <Button 
            size="lg" 
            className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            Começar Trial Gratuito
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
