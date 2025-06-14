// Agenda.tsx
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { AlarmeService } from '@/services/AlarmeService';

interface EventoAgenda {
  id?: string;
  titulo: string;
  descricao?: string;
  dataInicio: string;
  dataFim?: string;
  tipo: 'audiência' | 'reunião' | 'outro';
  local?: string;
  lembreteMinutos?: number;
  criadoEm?: string;
}

// Mock: Substituir por integração real (ex: Supabase)
const mockEventos: EventoAgenda[] = [
  { id: '1', titulo: 'Audiência Trabalhista', dataInicio: '2025-06-12T10:00', dataFim: '2025-06-12T11:00', tipo: 'audiência', local: 'Fórum Central', lembreteMinutos: 30 },
  { id: '2', titulo: 'Reunião com Cliente', dataInicio: '2025-06-13T15:00', dataFim: '2025-06-13T16:00', tipo: 'reunião', local: 'Escritório', lembreteMinutos: 60 },
];

export default function AgendaPage() {
  const [eventos, setEventos] = useState<EventoAgenda[]>(mockEventos);

  // Solicita permissão e subscreve push ao carregar
  useEffect(() => {
    AlarmeService.requestPermission();
    AlarmeService.subscribeUserToPush();
  }, []);

  // Agenda lembretes para eventos futuros
  useEffect(() => {
    const now = new Date();
    eventos.forEach(ev => {
      if (ev.lembreteMinutos && ev.dataInicio) {
        const eventoDate = new Date(ev.dataInicio);
        const diff = (eventoDate.getTime() - now.getTime()) / 60000;
        if (diff > 0) {
          // Agenda notificação para o horário correto
          const notifyAt = new Date(eventoDate.getTime() - ev.lembreteMinutos * 60000);
          if (notifyAt > now) {
            AlarmeService.scheduleLocalNotification({
              title: `Lembrete: ${ev.titulo}`,
              body: `O evento começa em ${ev.lembreteMinutos} minutos!`,
              date: notifyAt
            });
          }
        }
      }
    });
  }, [eventos]);

  // Exportar para Google Calendar/iCal
  const exportarGoogle = (evento: EventoAgenda) => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evento.titulo)}&dates=${evento.dataInicio.replace(/[-:]/g, '').slice(0,15)}/${evento.dataFim ? evento.dataFim.replace(/[-:]/g, '').slice(0,15) : evento.dataInicio.replace(/[-:]/g, '').slice(0,15)}&details=${encodeURIComponent(evento.descricao || '')}&location=${encodeURIComponent(evento.local || '')}`;
    window.open(url, '_blank');
  };
  const exportarICal = (evento: EventoAgenda) => {
    const dtStart = evento.dataInicio.replace(/[-:]/g, '').slice(0,15);
    const dtEnd = evento.dataFim ? evento.dataFim.replace(/[-:]/g, '').slice(0,15) : dtStart;
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${evento.titulo}\nDESCRIPTION:${evento.descricao || ''}\nLOCATION:${evento.local || ''}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${evento.titulo}.ics`;
    link.click();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>
      <div className="mb-6">
        <Button className="btn btn-primary" onClick={() => alert('Formulário de novo evento (implementar)')}>Novo Evento</Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        locale="pt-br"
        events={eventos.map(ev => ({
          id: ev.id,
          title: ev.titulo,
          start: ev.dataInicio,
          end: ev.dataFim,
          extendedProps: ev,
        }))}
        eventClick={info => {
          const ev = eventos.find(e => e.id === info.event.id);
          if (ev) {
            alert(`Evento: ${ev.titulo}\n${ev.descricao || ''}`);
          }
        }}
        height="auto"
      />
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Exportar Evento</h2>
        {eventos.map(ev => (
          <div key={ev.id} className="flex gap-2 items-center mb-1">
            <span>{ev.titulo}</span>
            <Button size="sm" onClick={() => exportarGoogle(ev)}>Google Calendar</Button>
            <Button size="sm" onClick={() => exportarICal(ev)}>iCal</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
