import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Calendar, 
  Users, 
  Clock,
  AlertTriangle,
  Paperclip,
  MessageSquare
} from 'lucide-react';
import type { Processo } from '@/pages/Processos';

interface ProcessoDetalhesProps {
  processo: Processo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProcessoDetalhes = ({ processo, open, onOpenChange }: ProcessoDetalhesProps) => {
  const [activeTab, setActiveTab] = useState('resumo');
  const [docs, setDocs] = useState([
    { name: 'Petição Inicial.pdf', url: '#' },
    { name: 'Contestação.pdf', url: '#' },
    { name: 'Despacho.pdf', url: '#' }
  ]);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PAGE_SIZE = 5;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "arquivado":
        return "bg-gray-100 text-gray-800";
      case "concluido":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        setDocs((prev) => [...prev, { name: file.name, url: '#' }]);
        setUploading(false);
      }, 1200);
    }
  };

  const paginatedDocs = docs.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-800 flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            {processo.titulo || processo.numero}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="p-4">
            {/* Upload Button with Feedback */}
            <div className="flex items-center space-x-4 mb-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                title="Selecione um arquivo para upload"
                placeholder="Escolha um arquivo"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className={`transition-colors ${uploading ? 'bg-gray-400' : 'bg-primary-800 hover:bg-primary-700'}`}
              >
                {uploading ? 'Carregando...' : 'Anexar Documento'}
              </Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary-800" />
                    <div>
                      <p className="text-sm font-medium">Cliente</p>
                      <p className="text-lg">{processo.cliente || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary-800" />
                    <div>
                      <p className="text-sm font-medium">Prazo</p>
                      <p className="text-lg">{processo.prazo || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-primary-800" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge className={getStatusColor(processo.status)}>{processo.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="resumo" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes do Processo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Informações Gerais</h4>
                      <p className="text-gray-600">Número: {processo.numero}</p>
                      <p className="text-gray-600">Advogado: {processo.advogado}</p>
                      <p className="text-gray-600">Valor: {processo.valor}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico do Processo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {processo.movimentos?.map((movimento, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="min-w-[100px] text-sm text-gray-500">
                            {movimento.data}
                          </div>
                          <div>
                            <p className="text-gray-900">{movimento.descricao}</p>
                          </div>
                        </div>
                      )) || <p className="text-gray-500">Nenhum movimento registrado</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos do Processo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paginatedDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{doc.name}</span>
                          <Button
                            variant="outline"
                            className="text-sm"
                            onClick={() => console.log(`Downloading ${doc.name}`)}
                          >
                            Baixar
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        disabled={(currentPage + 1) * PAGE_SIZE >= docs.length}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Próxima
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessoDetalhes;
