// ConflictList.tsx
import { useEffect, useState } from 'react';
import { Conflict, ConflictService } from '@/services/ConflictService';
import { Button } from '@/components/ui/button';

interface ConflictListProps {
  entityId?: string;
  caseId?: string;
}

export default function ConflictList({ entityId, caseId }: ConflictListProps) {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ConflictService.list({ entity_id: entityId, case_id: caseId }).then(setConflicts).finally(() => setLoading(false));
  }, [entityId, caseId]);

  const handleResolve = async (id: string) => {
    await ConflictService.resolve(id);
    setConflicts(cs => cs.map(c => c.id === id ? { ...c, resolved: true } : c));
  };

  if (loading) return <div>Carregando conflitos...</div>;
  if (!conflicts.length) return <div>Nenhum conflito encontrado.</div>;

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2 py-1">Motivo</th>
          <th className="border px-2 py-1">Resolvido</th>
          <th className="border px-2 py-1">Ações</th>
        </tr>
      </thead>
      <tbody>
        {conflicts.map(c => (
          <tr key={c.id}>
            <td className="border px-2 py-1">{c.reason}</td>
            <td className="border px-2 py-1">{c.resolved ? 'Sim' : 'Não'}</td>
            <td className="border px-2 py-1">
              {!c.resolved && (
                <Button className="btn btn-xs btn-success" onClick={() => handleResolve(c.id!)}>Marcar como resolvido</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
