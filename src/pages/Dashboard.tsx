
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  Calendar, 
  File, 
  Users, 
  Clock, 
  Plus,
  Search,
  Filter,
  Bell,
  MoreVertical,
  Upload,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = [
    { title: 'Processos Ativos', value: '28', subtitle: '2 novos esta semana', icon: Scale, color: 'text-blue-600' },
    { title: 'Clientes', value: '42', subtitle: '5 novos este mês', icon: Users, color: 'text-green-600' },
    { title: 'Eventos na Agenda', value: '15', subtitle: '3 para esta semana', icon: Calendar, color: 'text-orange-600' },
    { title: 'Prazos Pendentes', value: '8', subtitle: '2 urgentes', icon: Clock, color: 'text-red-600' }
  ];

  const recentActivity = [
    { type: 'document', title: 'Documento adicionado', description: 'Petição inicial - Processo 0047/2023', time: 'Há 2 horas', status: 'new' },
    { type: 'deadline', title: 'Prazo adicionado', description: 'Contestação - Processo 0041/2023', time: 'Há 3 horas', status: 'urgent' },
    { type: 'client', title: 'Cliente adicionado', description: 'Maria Silva', time: 'Há 1 dia', status: 'completed' },
    { type: 'hearing', title: 'Audiência agendada', description: 'Processo 0035/2023 - 15/11/2023 às 14:00', time: 'Há 1 dia', status: 'scheduled' }
  ];

  const upcomingDeadlines = [
    { title: 'Contestação', process: 'Processo 0047/2023', date: '15/11/2023', priority: 'high' },
    { title: 'Recurso', process: 'Processo 0041/2023', date: '18/11/2023', priority: 'medium' },
    { title: 'Audiência Preliminar', process: 'Processo 0035/2023', date: '20/11/2023', priority: 'low' },
    { title: 'Envio de Documentos', process: 'Processo 0029/2023', date: '22/11/2023', priority: 'medium' }
  ];

  const processes = [
    { id: '0001/2023', client: 'Empresa ABC Lda', type: 'Trabalhista', court: '2ª Vara do Trabalho', nextDate: '15/10/2023', status: 'active' },
    { id: '0002/2023', client: 'João Santos', type: 'Civil', court: '1ª Vara Cível', nextDate: '18/10/2023', status: 'pending' },
    { id: '0003/2023', client: 'Maria Silva', type: 'Família', court: 'Vara de Família', nextDate: '20/10/2023', status: 'urgent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary-800 p-2 rounded-xl">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-800">Legalflux</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Painel de Controlo</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-primary-800 hover:bg-primary-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload de Documentos
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agendar
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-800 mb-2">
            Bem-vindo ao seu painel de controlo jurídico.
          </h2>
          <p className="text-gray-600">
            Uma plataforma completa que lhe oferece toda a gestão de que o seu escritório de advocacia precisa.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary-800">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gray-50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Processes Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-primary-800">
                    Processos
                  </CardTitle>
                  <Button size="sm" className="bg-primary-800 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Processo
                  </Button>
                </div>
                <p className="text-gray-600 text-sm">
                  Gerencie e acompanhe todos os processos jurídicos
                </p>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por número, cliente ou tipo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Ordenar
                  </Button>
                </div>

                {/* Processes List */}
                <div className="space-y-4">
                  {processes.map((process, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <File className="h-5 w-5 text-primary-800" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary-800">{process.id}</h4>
                            <p className="text-sm text-gray-600">{process.client}</p>
                            <p className="text-xs text-gray-500">{process.type} • {process.court}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(process.status)}>
                            {process.status === 'active' ? 'Em andamento' : 
                             process.status === 'pending' ? 'Pendente' : 'Urgente'}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Próxima data: {process.nextDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary-800">
                  Atividade Recente
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Últimas ações no sistema
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="bg-accent-100 p-2 rounded-lg">
                        {activity.type === 'document' && <File className="h-4 w-4 text-accent-600" />}
                        {activity.type === 'deadline' && <Clock className="h-4 w-4 text-accent-600" />}
                        {activity.type === 'client' && <Users className="h-4 w-4 text-accent-600" />}
                        {activity.type === 'hearing' && <Calendar className="h-4 w-4 text-accent-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-primary-800">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-800">
                  Prazos Próximos
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Prazos para os próximos 7 dias
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className={`border-l-4 ${getPriorityColor(deadline.priority)} pl-4 py-2`}>
                      <p className="font-medium text-primary-800 text-sm">{deadline.title}</p>
                      <p className="text-xs text-gray-600">{deadline.process}</p>
                      <p className="text-xs text-gray-500 mt-1">{deadline.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-800">
                  Alertas
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Alertas e notificações importantes
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-medium text-red-800">Prazo Urgente</p>
                    <p className="text-xs text-red-600">Contestação vence em 2 dias</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-sm font-medium text-yellow-800">Documento Pendente</p>
                    <p className="text-xs text-yellow-600">Aguardando assinatura do cliente</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-800">Nova Mensagem</p>
                    <p className="text-xs text-blue-600">Cliente Maria Silva enviou mensagem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Concluded */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-800">
                  Tarefas Concluídas
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Últimas tarefas finalizadas
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Últimas tarefas finalizadas aparecem aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
