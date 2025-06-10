import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchClientes } from '@/services/ClienteService';
import { fetchAdvogados } from '@/services/AdvogadoService';

interface ProcessoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  processo?: any;
}

const ProcessoForm = ({ open, onOpenChange, onSubmit, processo }: ProcessoFormProps) => {
  const [formData, setFormData] = useState({
    numero: processo?.numero || '',
    titulo: processo?.titulo || '',
    cliente: processo?.cliente || '',
    advogado: processo?.advogado || '',
    status: processo?.status || 'pendente',
    prazo: processo?.prazo || '',
    valor: processo?.valor || '',
  });
  const [clientes, setClientes] = useState([]);
  const [advogados, setAdvogados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClientes().then(setClientes);
    fetchAdvogados().then(setAdvogados);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{processo ? 'Editar Processo' : 'Novo Processo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" value={formData.numero} onChange={e => setFormData({ ...formData, numero: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input id="titulo" value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={formData.cliente} onValueChange={v => setFormData({ ...formData, cliente: v })}>
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((c: any) => (
                  <SelectItem key={c.id} value={c.nome}>{c.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="advogado">Advogado</Label>
            <Select value={formData.advogado} onValueChange={v => setFormData({ ...formData, advogado: v })}>
              <SelectTrigger id="advogado">
                <SelectValue placeholder="Selecione o advogado" />
              </SelectTrigger>
              <SelectContent>
                {advogados.map((a: any) => (
                  <SelectItem key={a.id} value={a.nome}>{a.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="prazo">Prazo</Label>
            <Input id="prazo" value={formData.prazo} onChange={e => setFormData({ ...formData, prazo: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input id="valor" value={formData.valor} onChange={e => setFormData({ ...formData, valor: e.target.value })} />
          </div>
          <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700" disabled={loading}>
            {loading ? 'Aguarde...' : processo ? 'Salvar' : 'Criar Processo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessoForm;
