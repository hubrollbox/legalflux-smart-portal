
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  Euro,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Processos Activos',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Clientes',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Receita Mensal',
      value: '€15.280',
      change: '+23%',
      icon: Euro,
      color: 'text-purple-600'
    },
    {
      title: 'Prazos Esta Semana',
      value: '7',
      change: '-2',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const recentCases = [
    {
      id: 1,
      title: 'Processo Trabalhista - João Silva',
      status: 'Em andamento',
      deadline: '2024-01-15',
      priority: 'Alta'
    },
    {
      id: 2,
      title: 'Divórcio - Maria Santos',
      status: 'Aguardando documentos',
      deadline: '2024-01-20',
      priority: 'Média'
    },
    {
      id: 3,
      title: 'Contrato Empresarial - TechCorp',
      status: 'Revisão',
      deadline: '2024-01-25',
      priority: 'Baixa'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Audiência - Caso Silva',
      date: '2024-01-12',
      time: '14:30',
      type: 'Audiência'
    },
    {
      id: 2,
      title: 'Reunião - Cliente Santos',
      date: '2024-01-13',
      time: '10:00',
      type: 'Reunião'
    },
    {
      id: 3,
      title: 'Prazo - Entrega de Petição',
      date: '2024-01-15',
      time: '17:00',
      type: 'Prazo'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo dos seus processos.</p>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-primary-800 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} vs mês anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Cases */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary-800 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Processos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_item) => (
                  <div key={case_item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-medium text-primary-800">{case_item.title}</h4>
                      <p className="text-sm text-gray-600">{case_item.status}</p>
                      <p className="text-xs text-gray-500">Prazo: {case_item.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        case_item.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                        case_item.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {case_item.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary-800 text-primary-800 hover:bg-primary-50">
                Ver Todos os Processos
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary-800 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-medium text-primary-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.type}</p>
                      <p className="text-xs text-gray-500">{event.date} às {event.time}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {event.type === 'Prazo' && (
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary-800 text-primary-800 hover:bg-primary-50">
                Ver Calendário Completo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-primary-800">Acções Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Novo Processo</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Adicionar Cliente</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Agendar Evento</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Relatório</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
