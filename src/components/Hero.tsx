
import { Button } from '@/components/ui/button';
import { ArrowDown, Check } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-16 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
            Revolucione sua gestão jurídica com IA
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-800 mb-6 leading-tight">
            Portal Jurídico
            <span className="block text-accent-600">Inteligente</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Centralize e automatize toda sua vida jurídica. Uma plataforma segura e intuitiva 
            para clientes, advogados e escritórios, com inteligência artificial integrada.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              'Gestão completa de processos',
              'IA para insights automáticos',
              'Comunicação segura',
              'Mobile-first'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <Check className="h-5 w-5 text-accent-600 mr-2" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary-800 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Trial Gratuito
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-800 text-primary-800 hover:bg-primary-50 px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              Ver Demonstração
            </Button>
          </div>

          {/* Trial Info */}
          <p className="text-gray-500 text-sm">
            ✨ 15 dias gratuitos • Sem cartão de crédito • Configuração em 2 minutos
          </p>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;
