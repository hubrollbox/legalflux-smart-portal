
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Calendar,
  Trophy,
  Star,
  Heart,
  ArrowRight,
  MapPin,
  Clock,
  User
} from 'lucide-react';

const Comunidade = () => {
  const stats = [
    { number: '2,500+', label: 'Membros Ativos', icon: Users },
    { number: '850+', label: 'Discussões', icon: MessageCircle },
    { number: '1,200+', label: 'Recursos Partilhados', icon: BookOpen },
    { number: '45+', label: 'Eventos Realizados', icon: Calendar }
  ];

  const forumTopics = [
    {
      title: 'Dicas para gestão eficiente de prazos',
      category: 'Melhores Práticas',
      author: 'Ana Costa',
      replies: 23,
      likes: 45,
      time: '2 horas',
      badge: 'Popular'
    },
    {
      title: 'Como integrar o LegalFlux com sistemas existentes?',
      category: 'Integração Técnica',
      author: 'Carlos Silva',
      replies: 12,
      likes: 28,
      time: '5 horas',
      badge: 'Técnico'
    },
    {
      title: 'Experiências com automação de documentos',
      category: 'Automação',
      author: 'Maria Santos',
      replies: 18,
      likes: 34,
      time: '1 dia',
      badge: 'Destaque'
    },
    {
      title: 'Configuração avançada de notificações',
      category: 'Configurações',
      author: 'João Oliveira',
      replies: 8,
      likes: 15,
      time: '2 dias',
      badge: 'Novo'
    }
  ];

  const events = [
    {
      title: 'Webinar: Novas Funcionalidades Q1 2024',
      date: '15 Jan 2024',
      time: '15:00',
      type: 'Online',
      attendees: 150,
      status: 'Próximo'
    },
    {
      title: 'Workshop: Automação Jurídica',
      date: '22 Jan 2024',
      time: '14:00',
      type: 'Lisboa',
      attendees: 45,
      status: 'Inscrições Abertas'
    },
    {
      title: 'Meetup: Comunidade Porto',
      date: '29 Jan 2024',
      time: '18:30',
      type: 'Porto',
      attendees: 32,
      status: 'Confirmado'
    }
  ];

  const champions = [
    {
      name: 'Dr. António Ferreira',
      title: 'Especialista em Direito Comercial',
      contributions: 89,
      avatar: '/lovable-uploads/a384d644-b035-424c-ad6e-bdc19644ca60.png',
      badge: 'Expert'
    },
    {
      name: 'Dra. Sofia Mendes',
      title: 'Advogada Sénior',
      contributions: 76,
      avatar: '/lovable-uploads/6cabeee3-1107-4495-aae9-f0952361852c.png',
      badge: 'Mentor'
    },
    {
      name: 'Dr. Miguel Rocha',
      title: 'Consultor Jurídico',
      contributions: 54,
      avatar: '/lovable-uploads/f31eb3e4-6a83-4353-b115-83b88083ce56.png',
      badge: 'Contribuidor'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Comunidade LegalFlux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecte-se com profissionais jurídicos, partilhe experiências e aprenda 
              com a maior comunidade de utilizadores do LegalFlux.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary-800" />
                  </div>
                  <div className="text-3xl font-bold text-primary-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Topics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-4">
                Discussões em Destaque
              </h2>
              <p className="text-gray-600">
                Participe nas conversas mais interessantes da comunidade
              </p>
            </div>
            <Button className="bg-primary-800 hover:bg-primary-700">
              Ver Todas as Discussões
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {forumTopics.map((topic, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-accent-100 text-accent-800 mr-3">
                          {topic.badge}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {topic.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary-800 mb-2 hover:text-accent-600 cursor-pointer">
                        {topic.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {topic.author}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {topic.replies} respostas
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {topic.likes} likes
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          há {topic.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participe nos nossos eventos e expanda a sua rede profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`${
                      event.status === 'Próximo' 
                        ? 'bg-green-100 text-green-800'
                        : event.status === 'Inscrições Abertas'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {event.status}
                    </Badge>
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-4">
                    {event.title}
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} às {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.type}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} participantes
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-accent-600 hover:bg-accent-700"
                  >
                    Inscrever-me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Champions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Membros em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os membros mais ativos que contribuem para o crescimento da nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {champions.map((champion, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={champion.avatar} 
                      alt={champion.name}
                      className="h-20 w-20 rounded-full mx-auto"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Badge className={`${
                        champion.badge === 'Expert' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : champion.badge === 'Mentor'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        <Trophy className="h-3 w-3 mr-1" />
                        {champion.badge}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">
                    {champion.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {champion.title}
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {champion.contributions} contribuições
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Faça parte de uma rede de profissionais que partilham conhecimento 
            e experiências sobre gestão jurídica moderna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              <Users className="h-5 w-5 mr-2" />
              Participar no Fórum
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Ver Próximos Eventos
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comunidade;
