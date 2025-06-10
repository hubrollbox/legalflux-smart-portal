// PrazoList.tsx
import { useEffect, useState } from 'react';
import { Prazo, PrazoService } from '@/services/PrazoService';

interface PrazoListProps {
  onEdit: (prazo: Prazo) => void;
  onDelete: (id: string) => void;
}

export default function PrazoList({ onEdit, onDelete }: PrazoListProps) {
  const [prazos, setPrazos] = useState<Prazo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PrazoService.list().then(setPrazos).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando prazos...</div>;
  if (!prazos.length) return <div>Nenhum prazo cadastrado.</div>;

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2 py-1">Título</th>
          <th className="border px-2 py-1">Data de Vencimento</th>
          <th className="border px-2 py-1">Alerta</th>
          <th className="border px-2 py-1">Ações</th>
        </tr>
      </thead>
      <tbody>
        {prazos.map(p => (
          <tr key={p.id}>
            <td className="border px-2 py-1">{p.titulo}</td>
            <td className="border px-2 py-1">{p.dataVencimento}</td>
            <td className="border px-2 py-1">{p.alertaAntecedenciaDias ? `${p.alertaAntecedenciaDias} dias antes` : '-'}</td>
            <td className="border px-2 py-1">
              <button className="btn btn-xs btn-primary mr-2" onClick={() => onEdit(p)}>Editar</button>
              <button className="btn btn-xs btn-danger" onClick={() => p.id && onDelete(p.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
