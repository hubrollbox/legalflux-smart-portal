// Prazos.tsx
import { useState, useEffect } from 'react';
import PrazoForm from '@/components/prazos/PrazoForm';
import PrazoList from '@/components/prazos/PrazoList';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PrazoService } from '@/services/PrazoService';
import { Prazo } from '@/services/PrazoService';

export default function PrazosPage() {
  const [editing, setEditing] = useState<Prazo | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [prazos, setPrazos] = useState<Prazo[]>([]);

  useEffect(() => {
    PrazoService.list().then(setPrazos);
  }, [refresh]);

  const handleSave = () => {
    setEditing(null);
    setRefresh(r => r + 1);
  };
  const handleEdit = (prazo: Prazo) => setEditing(prazo);
  const handleDelete = async (id: string) => {
    if (window.confirm('Excluir este prazo?')) {
      await PrazoService.remove(id);
      setRefresh(r => r + 1);
    }
  };

  // Converter prazos para eventos do calendário
  const calendarEvents = prazos.map(p => ({
    id: p.id,
    title: p.titulo,
    start: p.dataVencimento,
    extendedProps: p,
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Gestão de Prazos</h1>
      <div className="mb-6">
        <button className="btn btn-primary" onClick={() => setEditing({ titulo: '', dataVencimento: '' })}>Novo Prazo</button>
      </div>
      {editing && (
        <div className="mb-6">
          <PrazoForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PrazoList key={refresh} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            events={calendarEvents}
            eventClick={info => {
              const prazo = prazos.find(p => p.id === info.event.id);
              if (prazo) setEditing(prazo);
            }}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}
