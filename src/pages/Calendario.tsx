
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const eventos = [
    {
      id: 1,
      titulo: 'Audiência - Caso Silva',
      tipo: 'audiencia',
      data: '2024-01-12',
      hora: '14:30',
      local: 'Tribunal de Lisboa',
      processo: 'Processo Trabalhista',
      cliente: 'João Silva'
    },
    {
      id: 2,
      titulo: 'Reunião - Cliente Santos',
      tipo: 'reuniao',
      data: '2024-01-13',
      hora: '10:00',
      local: 'Escritório',
      processo: 'Divórcio',
      cliente: 'Maria Santos'
    },
    {
      id: 3,
      titulo: 'Prazo - Entrega de Petição',
      tipo: 'prazo',
      data: '2024-01-15',
      hora: '17:00',
      local: 'Online',
      processo: 'Contrato Empresarial',
      cliente: 'TechCorp'
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'audiencia':
        return 'bg-red-100 text-red-800';
      case 'reuniao':
        return 'bg-blue-100 text-blue-800';
      case 'prazo':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Calendário</h1>
            <p className="text-gray-600">Gerir prazos, audiências e compromissos</p>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-primary-800 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid - Simplified view */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6; // Start from previous month
                    const isCurrentMonth = day > 0 && day <= 31;
                    const hasEvent = [12, 13, 15].includes(day);
                    
                    return (
                      <div 
                        key={i}
                        className={`aspect-square p-2 text-center text-sm rounded-lg cursor-pointer transition-colors ${
                          isCurrentMonth 
                            ? 'text-gray-900 hover:bg-primary-50' 
                            : 'text-gray-300'
                        } ${hasEvent ? 'bg-accent-100 text-accent-800' : ''}`}
                      >
                        {isCurrentMonth ? day : ''}
                        {hasEvent && (
                          <div className="w-2 h-2 bg-accent-600 rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div>
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventos.map((evento) => (
                    <div key={evento.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-primary-800">{evento.titulo}</h4>
                        <Badge className={getTipoColor(evento.tipo)}>
                          {evento.tipo}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {evento.data} às {evento.hora}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {evento.local}
                        </div>
                        <p className="text-xs text-gray-500">
                          {evento.processo} - {evento.cliente}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-primary-800 text-primary-800">
                  Ver Todos os Eventos
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="rounded-2xl border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-primary-800">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Esta Semana</span>
                    <span className="font-medium">7 eventos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Próximo Mês</span>
                    <span className="font-medium">23 eventos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prazos Urgentes</span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendario;
