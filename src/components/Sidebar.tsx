
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
  Play
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import {
  Sidebar as ShadcnSidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import logo from '@/../public/logo.png';

// Menu com as principais secções
const sidebarMenu = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Processos', path: '/processos' },
  { icon: Calendar, label: 'Calendário', path: '/calendario' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Euro, label: 'Financeiro', path: '/financeiro' },
  { icon: Bot, label: 'IA Assistant', path: '/ia-assistant' },
  { icon: Settings, label: 'Definições', path: '/definicoes' }
];

// SidebarNavigationMenu refatorado do SidebarMenu
const SidebarNavigationMenu = () => {
  const location = useLocation();
  return (
    <SidebarMenu>
      {sidebarMenu.map(item => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={location.pathname === item.path}>
            <Link to={item.path}>
              <item.icon className="mr-2" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const Sidebar = () => {
  const { signOut } = useAuth();

  // Botão de repetir tutorial
  const handleRestartOnboarding = () => {
    localStorage.removeItem('legalflux-onboarding-completed');
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <ShadcnSidebar>
        {/* Cabeçalho com logo e trigger desktop (collapse) */}
        <SidebarHeader className="border-b border-gray-200 p-6 pb-4 flex flex-col items-center relative">
          {/* Botão collapse/expand SÓ DESKTOP */}
          <div className="absolute left-2 top-2 hidden md:block">
            <SidebarTrigger />
          </div>
          <img 
            src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
            alt="Legalflux Logo"
            className="h-10 w-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-primary-800">LegalFlux</h1>
          <p className="text-sm text-gray-600 mt-1">Portal Jurídico</p>
          {/* Botão trigger para mobile/colapso */}
          <div className="absolute right-2 top-2 md:hidden">
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs mt-3 mb-1" />
            <SidebarGroupContent>
              <SidebarNavigationMenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="pb-4 px-4 border-t border-gray-200 gap-2 flex flex-col">
          <button
            onClick={handleRestartOnboarding}
            className="flex items-center w-full px-2 py-2 rounded-md border border-accent-200 text-accent-700 hover:bg-accent-50 transition"
            type="button"
          >
            <Play className="h-4 w-4 mr-2" />
            Repetir Tutorial
          </button>
          <button
            onClick={signOut}
            className="flex items-center w-full px-2 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
            type="button"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </SidebarFooter>
      </ShadcnSidebar>
      {/* Botão flutuante para abrir/collapse no mobile */}
      <SidebarTrigger className="fixed bottom-4 left-4 z-50 md:hidden shadow-lg bg-white hover:bg-accent-100 border rounded-full px-3 py-2" />
    </SidebarProvider>
  );
};

export default Sidebar;

