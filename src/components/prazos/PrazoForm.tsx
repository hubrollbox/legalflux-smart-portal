// PrazoForm.tsx
import { useState } from 'react';
import { Prazo, PrazoService } from '@/services/PrazoService';

interface PrazoFormProps {
  initial?: Prazo;
  onSave: (prazo: Prazo) => void;
  onCancel?: () => void;
}

export default function PrazoForm({ initial, onSave, onCancel }: PrazoFormProps) {
  const [prazo, setPrazo] = useState<Prazo>(initial || { titulo: '', dataVencimento: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPrazo({ ...prazo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let saved: Prazo;
      if (prazo.id) {
        saved = await PrazoService.update(prazo.id, prazo);
      } else {
        saved = await PrazoService.create(prazo);
      }
      onSave(saved);
    } catch (err) {
      alert('Erro ao salvar prazo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Título</label>
        <input name="titulo" value={prazo.titulo} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="block font-medium">Descrição</label>
        <textarea name="descricao" value={prazo.descricao || ''} onChange={handleChange} className="input" />
      </div>
      <div>
        <label className="block font-medium">Data de Vencimento</label>
        <input type="date" name="dataVencimento" value={prazo.dataVencimento} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="block font-medium">Dias de antecedência para alerta</label>
        <input type="number" name="alertaAntecedenciaDias" value={prazo.alertaAntecedenciaDias || ''} onChange={handleChange} className="input" min={0} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
