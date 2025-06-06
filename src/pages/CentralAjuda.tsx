
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Book, 
  Search, 
  FileText, 
  Video, 
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Clock,
  Star
} from 'lucide-react';

const CentralAjuda = () => {
  const categories = [
    {
      icon: FileText,
      title: 'Primeiros Passos',
      description: 'Guias para começar a usar o LegalFlux',
      articles: 8,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Video,
      title: 'Tutoriais em Vídeo',
      description: 'Aprenda através de vídeos explicativos',
      articles: 12,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Gestão de Casos',
      description: 'Como gerir os seus processos jurídicos',
      articles: 15,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Book,
      title: 'Documentação API',
      description: 'Guias técnicos para developers',
      articles: 6,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const popularArticles = [
    {
      title: 'Como criar o primeiro processo',
      category: 'Primeiros Passos',
      readTime: '5 min',
      rating: 4.9
    },
    {
      title: 'Configurar notificações de prazos',
      category: 'Configurações',
      readTime: '3 min',
      rating: 4.8
    },
    {
      title: 'Upload de documentos seguros',
      category: 'Documentos',
      readTime: '7 min',
      rating: 4.7
    },
    {
      title: 'Gestão de clientes e contactos',
      category: 'CRM',
      readTime: '6 min',
      rating: 4.6
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
              Central de Ajuda
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Encontre respostas, guias e tutoriais para aproveitar ao máximo o LegalFlux
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pesquise por artigos, tutoriais ou funcionalidades..."
                  className="pl-12 py-4 text-lg rounded-2xl border-gray-200 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-primary-800 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary-800 mb-2">Contacto Direto</h3>
                <p className="text-gray-600 mb-4">Fale connosco por telefone</p>
                <Button variant="outline" className="border-primary-800 text-primary-800">
                  +351 210 123 456
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary-800 mb-2">Chat ao Vivo</h3>
                <p className="text-gray-600 mb-4">Suporte instantâneo online</p>
                <Button className="bg-accent-600 hover:bg-accent-700">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary-800 mb-2">Email</h3>
                <p className="text-gray-600 mb-4">Envie-nos uma mensagem</p>
                <Button variant="outline" className="border-green-600 text-green-600">
                  suporte@legalflux.com
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Categorias de Ajuda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Navegue pelas diferentes categorias para encontrar rapidamente o que procura
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`p-4 rounded-xl mr-6 ${category.color}`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-800 mb-3">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {category.articles} artigos
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Artigos Mais Populares
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os guias mais consultados pela nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-accent-100 text-accent-800 text-xs px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{article.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary-800 mb-3 hover:text-accent-600">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Recursos Adicionais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Materiais complementares para maximizar o seu uso da plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-primary-800 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-primary-800 mb-4">
                  Manual do Utilizador
                </h3>
                <p className="text-gray-600 mb-6">
                  Guia completo em PDF com todas as funcionalidades
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Video className="h-12 w-12 text-purple-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-primary-800 mb-4">
                  Biblioteca de Vídeos
                </h3>
                <p className="text-gray-600 mb-6">
                  Tutoriais em vídeo passo a passo
                </p>
                <Button 
                  variant="outline" 
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Vídeos
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Book className="h-12 w-12 text-green-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-primary-800 mb-4">
                  Base de Conhecimento
                </h3>
                <p className="text-gray-600 mb-6">
                  Artigos detalhados e FAQs
                </p>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explorar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CentralAjuda;
