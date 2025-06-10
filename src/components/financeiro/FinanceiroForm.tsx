// FinanceiroForm.tsx
import { useState } from 'react';
import { ContaFinanceira, FinanceiroService } from '@/services/FinanceiroService';

interface FinanceiroFormProps {
  initial?: ContaFinanceira;
  onSave: (conta: ContaFinanceira) => void;
  onCancel?: () => void;
}

export default function FinanceiroForm({ initial, onSave, onCancel }: FinanceiroFormProps) {
  const [conta, setConta] = useState<ContaFinanceira>(initial || { descricao: '', valor: 0, tipo: 'receita', status: 'pendente', dataVencimento: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConta({ ...conta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let saved: ContaFinanceira;
      if (conta.id) {
        saved = await FinanceiroService.update(conta.id, conta);
      } else {
        saved = await FinanceiroService.create(conta);
      }
      onSave(saved);
    } catch (err) {
      alert('Erro ao salvar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Descrição</label>
        <input name="descricao" value={conta.descricao} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="block font-medium">Valor</label>
        <input type="number" name="valor" value={conta.valor} onChange={handleChange} required className="input" min={0} step={0.01} />
      </div>
      <div>
        <label className="block font-medium">Tipo</label>
        <select name="tipo" value={conta.tipo} onChange={handleChange} className="input">
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Status</label>
        <select name="status" value={conta.status} onChange={handleChange} className="input">
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Data de Vencimento</label>
        <input type="date" name="dataVencimento" value={conta.dataVencimento} onChange={handleChange} required className="input" />
      </div>
      {conta.status === 'pago' && (
        <div>
          <label className="block font-medium">Data de Pagamento</label>
          <input type="date" name="dataPagamento" value={conta.dataPagamento || ''} onChange={handleChange} className="input" />
        </div>
      )}
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
