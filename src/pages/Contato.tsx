
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

const Contato = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Entre em Contacto
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar. Entre em contacto connosco através de qualquer 
              um dos canais disponíveis ou envie-nos uma mensagem.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: 'Email',
                description: 'Resposta em até 24 horas',
                contact: 'suporte@legalflux.com'
              },
              {
                icon: Phone,
                title: 'Telefone',
                description: 'Seg-Sex, 9h às 18h',
                contact: '+351 210 123 456'
              },
              {
                icon: MessageSquare,
                title: 'Chat ao Vivo',
                description: 'Disponível durante horário comercial',
                contact: 'Resposta imediata'
              },
              {
                icon: MapPin,
                title: 'Escritório',
                description: 'Lisboa, Portugal',
                contact: 'Avenida da Liberdade, 123'
              }
            ].map((method, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <method.icon className="h-8 w-8 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {method.description}
                  </p>
                  <p className="text-primary-800 font-semibold">
                    {method.contact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="rounded-2xl border-0 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
                Envie-nos uma Mensagem
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <Input 
                      type="text" 
                      placeholder="O seu nome"
                      className="rounded-xl border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="seu@email.com"
                      className="rounded-xl border-gray-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Como podemos ajudar?"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <Textarea 
                    placeholder="Descreva a sua questão ou necessidade..."
                    rows={5}
                    className="rounded-xl border-gray-200"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-primary-800 hover:bg-primary-700 text-white py-4 text-lg font-semibold rounded-xl"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
