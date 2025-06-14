
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Calendar, 
  Users, 
  MessageSquare, 
  Euro, 
  Settings, 
  LogOut,
  Bot,
  Play,
  // Link as LinkIcon // Removido, não será mais exibido na sidebar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import logo from '@/../public/logo.png';

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const handleRestartOnboarding = () => {
    localStorage.removeItem('legalflux-onboarding-completed');
    window.location.reload();
  };

  // Integrações removido daqui
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Processos', path: '/processos' },
    { icon: Calendar, label: 'Calendário', path: '/calendario' },
    { icon: Users, label: 'Clientes', path: '/clientes' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Euro, label: 'Financeiro', path: '/financeiro' },
    { icon: Bot, label: 'IA Assistant', path: '/ia-assistant' },
    // { icon: LinkIcon, label: 'Integrações', path: '/minhas-integracoes' }, // Removido
    { icon: Settings, label: 'Definições', path: '/definicoes' }
  ];

  return (
    <aside className="bg-white p-2 md:p-4 min-h-[60px] md:min-h-screen w-full md:w-64 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img 
          src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
          alt="Legalflux Logo"
          className="h-10 w-auto mb-0 md:mb-4" 
        />
        <h1 className="text-2xl font-bold text-primary-800">LegalFlux</h1>
        <p className="text-sm text-gray-600 mt-1">Portal Jurídico</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? 'bg-primary-800 text-white hover:bg-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Tutorial */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={handleRestartOnboarding}
          className="w-full justify-start text-accent-600 border-accent-200 hover:bg-accent-50"
        >
          <Play className="h-4 w-4 mr-3" />
          Repetir Tutorial
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={signOut}
          className="w-full justify-start text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
