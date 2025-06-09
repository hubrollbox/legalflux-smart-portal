
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
  CheckCircle,
  Calendar,
  Gavel,
  Users,
  FileCheck
} from 'lucide-react';
import { useState } from 'react';

const IAAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('resumir');

  // Estados para cada funcionalidade
  const [summarizeData, setSummarizeData] = useState({
    caseDescription: '',
    result: ''
  });

  const [nextStepsData, setNextStepsData] = useState({
    caseHistory: '',
    currentStatus: '',
    result: ''
  });

  const [datesData, setDatesData] = useState({
    caseText: '',
    result: ''
  });

  const [draftData, setDraftData] = useState({
    documentType: '',
    parties: '',
    context: '',
    result: ''
  });

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

  const handleSummarizeCase = async () => {
    setLoading(true);
    try {
      // Simular chamada à IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSummarizeData({
        ...summarizeData,
        result: 'Resumo gerado automaticamente: Este caso envolve uma disputa contratual entre as partes, com questões principais relacionadas com incumprimento de obrigações contratuais e pedido de indemnização por danos.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestNextSteps = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setNextStepsData({
        ...nextStepsData,
        result: 'Próximas ações sugeridas:\n1. Solicitar documentação adicional ao cliente\n2. Preparar resposta à contestação\n3. Agendar reunião com perito\n4. Verificar prazos processuais'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExtractKeyDates = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDatesData({
        ...datesData,
        result: 'Datas importantes extraídas:\n• 15/01/2025 - Prazo para contestação\n• 22/01/2025 - Audiência preliminar\n• 05/02/2025 - Entrega de documentos\n• 20/02/2025 - Julgamento'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDraft = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDraftData({
        ...draftData,
        result: 'Minuta jurídica gerada:\n\nEXMO. SENHOR JUIZ DE DIREITO\n\n[Conteúdo da minuta baseado nos dados fornecidos seria gerado aqui pela IA]\n\nTermos em que,\nPede deferimento.\n\n[Assinatura do Advogado]'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <Brain className="h-8 w-8 mr-3" />
              Assistente IA Jurídico
            </h1>
            <p className="text-gray-600">Inteligência artificial especializada para o trabalho jurídico</p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <Brain className="h-4 w-4 mr-1" />
            IA Ativa
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funcionalidades IA */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800">
                  Ferramentas IA Jurídica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="resumir">Resumir</TabsTrigger>
                    <TabsTrigger value="acoes">Ações</TabsTrigger>
                    <TabsTrigger value="datas">Datas</TabsTrigger>
                    <TabsTrigger value="minutas">Minutas</TabsTrigger>
                  </TabsList>

                  {/* 1. Resumir Caso */}
                  <TabsContent value="resumir" className="space-y-4">
                    <div>
                      <Label htmlFor="case-description">Descrição do Caso</Label>
                      <Textarea
                        id="case-description"
                        placeholder="Cole ou digite a descrição do caso para gerar um resumo automático..."
                        value={summarizeData.caseDescription}
                        onChange={(e) => setSummarizeData({ ...summarizeData, caseDescription: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleSummarizeCase}
                      disabled={loading || !summarizeData.caseDescription}
                      className="w-full bg-primary-800 hover:bg-primary-700"
                    >
                      <FileCheck className="h-4 w-4 mr-2" />
                      {loading ? 'A gerar resumo...' : 'Gerar Resumo'}
                    </Button>
                    {summarizeData.result && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h4 className="font-medium text-green-800 mb-2">Resumo Gerado:</h4>
                        <p className="text-green-700 text-sm">{summarizeData.result}</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* 2. Sugerir Próximas Ações */}
                  <TabsContent value="acoes" className="space-y-4">
                    <div>
                      <Label htmlFor="case-history">Histórico do Caso</Label>
                      <Textarea
                        id="case-history"
                        placeholder="Descreva o histórico e estado atual do processo..."
                        value={nextStepsData.caseHistory}
                        onChange={(e) => setNextStepsData({ ...nextStepsData, caseHistory: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-status">Estado Atual</Label>
                      <Select 
                        value={nextStepsData.currentStatus}
                        onValueChange={(value) => setNextStepsData({ ...nextStepsData, currentStatus: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado atual" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inicial">Fase Inicial</SelectItem>
                          <SelectItem value="instrucao">Instrução</SelectItem>
                          <SelectItem value="julgamento">Julgamento</SelectItem>
                          <SelectItem value="execucao">Execução</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleSuggestNextSteps}
                      disabled={loading || !nextStepsData.caseHistory}
                      className="w-full bg-primary-800 hover:bg-primary-700"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      {loading ? 'A analisar...' : 'Sugerir Próximas Ações'}
                    </Button>
                    {nextStepsData.result && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Ações Sugeridas:</h4>
                        <pre className="text-blue-700 text-sm whitespace-pre-wrap">{nextStepsData.result}</pre>
                      </div>
                    )}
                  </TabsContent>

                  {/* 3. Extrair Datas Importantes */}
                  <TabsContent value="datas" className="space-y-4">
                    <div>
                      <Label htmlFor="case-text">Texto do Processo</Label>
                      <Textarea
                        id="case-text"
                        placeholder="Cole o texto do processo para extrair datas e prazos importantes..."
                        value={datesData.caseText}
                        onChange={(e) => setDatesData({ ...datesData, caseText: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleExtractKeyDates}
                      disabled={loading || !datesData.caseText}
                      className="w-full bg-primary-800 hover:bg-primary-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {loading ? 'A extrair datas...' : 'Extrair Datas Importantes'}
                    </Button>
                    {datesData.result && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <h4 className="font-medium text-orange-800 mb-2">Datas Encontradas:</h4>
                        <pre className="text-orange-700 text-sm whitespace-pre-wrap">{datesData.result}</pre>
                      </div>
                    )}
                  </TabsContent>

                  {/* 4. Gerar Minutas */}
                  <TabsContent value="minutas" className="space-y-4">
                    <div>
                      <Label htmlFor="document-type">Tipo de Documento</Label>
                      <Select 
                        value={draftData.documentType}
                        onValueChange={(value) => setDraftData({ ...draftData, documentType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="peticao">Petição Inicial</SelectItem>
                          <SelectItem value="contestacao">Contestação</SelectItem>
                          <SelectItem value="recurso">Recurso</SelectItem>
                          <SelectItem value="contrato">Contrato</SelectItem>
                          <SelectItem value="parecer">Parecer Jurídico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="parties">Partes Envolvidas</Label>
                      <Input
                        id="parties"
                        placeholder="Ex: João Silva vs. Empresa XYZ"
                        value={draftData.parties}
                        onChange={(e) => setDraftData({ ...draftData, parties: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="context">Contexto e Detalhes</Label>
                      <Textarea
                        id="context"
                        placeholder="Descreva o contexto, fatos relevantes e pedidos..."
                        value={draftData.context}
                        onChange={(e) => setDraftData({ ...draftData, context: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={handleGenerateDraft}
                      disabled={loading || !draftData.documentType || !draftData.context}
                      className="w-full bg-primary-800 hover:bg-primary-700"
                    >
                      <Gavel className="h-4 w-4 mr-2" />
                      {loading ? 'A gerar minuta...' : 'Gerar Minuta Jurídica'}
                    </Button>
                    {draftData.result && (
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <h4 className="font-medium text-purple-800 mb-2">Minuta Gerada:</h4>
                        <pre className="text-purple-700 text-sm whitespace-pre-wrap bg-white p-3 rounded border">{draftData.result}</pre>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Documentos Gerados</span>
                    <span className="font-bold text-purple-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Verificar Jurisprudência
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Pesquisar Precedentes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Verificar Prazos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Analisar Clientes
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
