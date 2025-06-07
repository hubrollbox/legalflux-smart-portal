
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BookOpen, Calendar, Award, Lightbulb, ExternalLink } from 'lucide-react';

const Comunidade = () => {
  const handleJoinCommunity = () => {
    // Link para Discord da comunidade (pode ser alterado para Slack ou outro canal)
    window.open('https://discord.gg/legalflux', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-800 p-6 rounded-full">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Comunidade LegalFlux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Entra na comunidade LegalFlux: partilha dúvidas, ideias e boas práticas com colegas da área jurídica.
            </p>
            
            <Button 
              onClick={handleJoinCommunity}
              size="lg" 
              className="bg-primary-800 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Entrar na Comunidade
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Fórum de Discussões',
                description: 'Participe em discussões sobre casos, jurisprudência e práticas jurídicas.',
                action: 'Participar'
              },
              {
                icon: BookOpen,
                title: 'Base de Conhecimento',
                description: 'Acesso a artigos, estudos de caso e melhores práticas partilhadas pela comunidade.',
                action: 'Explorar'
              },
              {
                icon: Calendar,
                title: 'Eventos e Webinars',
                description: 'Participe em eventos exclusivos, webinars e formações especializadas.',
                action: 'Ver Eventos'
              },
              {
                icon: Award,
                title: 'Programa de Mentoria',
                description: 'Conecte-se com mentores experientes ou torne-se um mentor para novos profissionais.',
                action: 'Inscrever-se'
              },
              {
                icon: Lightbulb,
                title: 'Ideias e Sugestões',
                description: 'Partilhe as suas ideias para melhorar a plataforma e vote nas sugestões de outros.',
                action: 'Contribuir'
              },
              {
                icon: Users,
                title: 'Networking',
                description: 'Conecte-se com profissionais de toda a comunidade jurídica dos PALOP.',
                action: 'Conectar'
              }
            ].map((feature, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Button 
                    onClick={handleJoinCommunity}
                    variant="outline" 
                    className="border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white"
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              A Nossa Comunidade em Números
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2,500+', label: 'Membros Activos' },
              { number: '150+', label: 'Escritórios' },
              { number: '50+', label: 'Eventos Realizados' },
              { number: '8', label: 'Países Representados' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Se Juntar à Comunidade?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Faça parte da maior rede de profissionais jurídicos dos PALOP e 
            acelere o seu crescimento profissional.
          </p>
          <Button 
            onClick={handleJoinCommunity}
            size="lg" 
            className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Entrar na Comunidade
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comunidade;
