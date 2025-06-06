
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Search,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const IAAssistant = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const insights = [
    {
      id: 1,
      title: 'Prazo Urgente Detectado',
      description: 'Processo 2024/001 - João Silva tem prazo em 2 dias',
      type: 'warning',
      icon: AlertTriangle,
      action: 'Ver Processo'
    },
    {
      id: 2,
      title: 'Novo Precedente Relevante',
      description: 'Jurisprudência recente pode impactar 3 dos seus processos',
      type: 'info',
      icon: Lightbulb,
      action: 'Analisar'
    },
    {
      id: 3,
      title: 'Análise de Rentabilidade',
      description: 'Cliente TechCorp mostra potencial para novos serviços',
      type: 'success',
      icon: TrendingUp,
      action: 'Ver Análise'
    }
  ];

  const suggestions = [
    'Resumir último processo de divórcio',
    'Gerar minuta de petição trabalhista',
    'Analisar jurisprudência sobre contratos',
    'Calcular honorários do último mês'
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    // Aqui será implementada a integração com IA
    setTimeout(() => {
      setIsLoading(false);
      setMessage('');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <Brain className="h-8 w-8 mr-3" />
              Assistente IA
            </h1>
            <p className="text-gray-600">Inteligência artificial para otimizar o seu trabalho jurídico</p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            IA Ativa
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-0 shadow-lg h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat com IA
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Chat Messages Area */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 mb-4 overflow-y-auto">
                  <div className="text-center text-gray-500 mt-20">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-primary-800" />
                    <p>Olá! Sou o seu assistente jurídico inteligente.</p>
                    <p className="text-sm">Como posso ajudá-lo hoje?</p>
                  </div>
                </div>
                
                {/* Quick Suggestions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Sugestões rápidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Digite a sua pergunta ou pedido..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className="bg-primary-800 hover:bg-primary-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="p-4 rounded-xl bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <insight.icon className={`h-5 w-5 mt-1 ${
                          insight.type === 'warning' ? 'text-orange-600' :
                          insight.type === 'info' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-primary-800">{insight.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* IA Statistics */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Estatísticas IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consultas Hoje</span>
                    <span className="font-bold text-primary-800">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tempo Poupado</span>
                    <span className="font-bold text-green-600">4.2h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precisão</span>
                    <span className="font-bold text-blue-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800">Acções Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Documento
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Pesquisar Jurisprudência
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Verificar Prazos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IAAssistant;
