import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import OnboardingTour from '@/components/OnboardingTour';
import DashboardChart from '@/components/DashboardChart';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardRecentCases from '@/components/dashboard/DashboardRecentCases';
import DashboardUpcomingEvents from '@/components/dashboard/DashboardUpcomingEvents';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSearchBar from '@/components/dashboard/DashboardSearchBar';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Euro, Clock } from 'lucide-react';

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

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('legalflux-onboarding-completed');
    if (!hasSeenOnboarding) {
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('legalflux-onboarding-completed', 'true');
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('legalflux-onboarding-completed', 'true');
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
        <DashboardSearchBar />
        <DashboardHeader onNewProcess={() => navigate('/processos')} />
        <DashboardStats stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardRecentCases cases={recentCases} onSeeAll={() => navigate('/processos')} />
          <DashboardUpcomingEvents events={upcomingEvents} onSeeCalendar={() => navigate('/calendario')} />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4">Análises</h2>
          <DashboardChart />
        </div>
        <DashboardQuickActions
          onNewProcess={() => navigate('/processos')}
          onAddClient={() => navigate('/clientes')}
          onCreateEvent={() => navigate('/calendario')}
          onReport={() => navigate('/financeiro')}
        />
      </div>
      <OnboardingTour
        isActive={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
