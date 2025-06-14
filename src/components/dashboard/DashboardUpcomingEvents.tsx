
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle } from "lucide-react";
import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
}

interface DashboardUpcomingEventsProps {
  events: Event[];
  onSeeCalendar: () => void;
}

const DashboardUpcomingEvents: React.FC<DashboardUpcomingEventsProps> = React.memo(({ events, onSeeCalendar }) => (
  <Card className="rounded-2xl border-0 shadow-lg" data-tour="upcoming-events">
    <CardHeader className="pb-4">
      <CardTitle className="text-primary-800 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Próximos Eventos
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-medium text-primary-800">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.type}</p>
              <p className="text-xs text-gray-500">{event.date} às {event.time}</p>
            </div>
            <div className="flex items-center space-x-2">
              {event.type === "Prazo" && (
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full mt-4 border-primary-800 text-primary-800 hover:bg-primary-50"
        onClick={onSeeCalendar}
      >
        Ver Calendário Completo
      </Button>
    </CardContent>
  </Card>
));
export default DashboardUpcomingEvents;
