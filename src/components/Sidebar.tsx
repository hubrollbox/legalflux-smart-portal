
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
  User
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
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarFloatingTrigger from './SidebarFloatingTrigger';

// Menu com as principais secções
const sidebarMenu = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Processos', path: '/processos' },
  { icon: Calendar, label: 'Calendário', path: '/calendario' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Euro, label: 'Financeiro', path: '/financeiro' },
  { icon: Bot, label: 'IA Assistant', path: '/ia-assistant' },
  { icon: Settings, label: 'Definições', path: '/definicoes' },
  { icon: User, label: 'Meu Perfil', path: '/perfil' }, // <- nova entrada
];

// Menu Navigation adaptado para manter consistência na sidebar
const SidebarNavigationMenu = () => {
  const location = useLocation();
  return (
    <SidebarMenu>
      {sidebarMenu.map(item => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={location.pathname === item.path}>
            <Link to={item.path} className="flex items-center w-full">
              <item.icon className="mr-3 min-w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const Sidebar = () => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();

  // Botão de repetir tutorial
  const handleRestartOnboarding = () => {
    localStorage.removeItem('legalflux-onboarding-completed');
    window.location.reload();
  };

  return (
    <SidebarProvider>
      {/* Desktop Sidebar: só mostra no desktop */}
      <div className="hidden md:flex w-[260px] max-w-[90vw] min-h-screen bg-sidebar text-sidebar-foreground border-r border-gray-200 flex-col p-0">
        <ShadcnSidebar className="flex flex-col flex-1 p-0">
          {/* Cabeçalho */}
          <SidebarHeader className="relative px-4 pt-6 pb-3 flex flex-row items-center gap-3 min-h-[68px]">
            <div className="absolute left-3 top-3 hidden md:block">
              <SidebarTrigger />
            </div>
            <img 
              src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
              alt="Legalflux Logo"
              className="h-10 w-10 rounded-md"
            />
            <div className="ml-2 flex flex-col">
              <h1 className="text-lg font-bold text-primary-800 leading-none">LegalFlux</h1>
              <p className="text-[13px] text-gray-600 leading-tight tracking-tight">Portal Jurídico</p>
            </div>
          </SidebarHeader>
          {/* Navegação */}
          <SidebarContent className="flex-1 px-0 pt-1">
            <SidebarGroup>
              <SidebarGroupLabel className="hidden" />
              <SidebarGroupContent>
                <SidebarNavigationMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          {/* Footer */}
          <SidebarFooter className="pb-4 pt-2 px-4 border-t border-gray-200 flex-col flex gap-2">
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
      </div>
      {/* Mobile Sidebar: só mostra em mobile */}
      <div className="md:hidden">
        <ShadcnSidebar className="fixed inset-0 z-40 flex flex-col p-0 bg-sidebar text-sidebar-foreground min-h-screen w-[80vw] max-w-xs border-r border-gray-200">
          <SidebarHeader className="relative px-4 pt-6 pb-3 flex flex-row items-center gap-3 min-h-[68px]">
            <img 
              src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
              alt="Legalflux Logo"
              className="h-10 w-10 rounded-md"
            />
            <div className="ml-2 flex flex-col">
              <h1 className="text-lg font-bold text-primary-800 leading-none">LegalFlux</h1>
              <p className="text-[13px] text-gray-600 leading-tight tracking-tight">Portal Jurídico</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 px-0 pt-1">
            <SidebarGroup>
              <SidebarGroupLabel className="hidden" />
              <SidebarGroupContent>
                <SidebarNavigationMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="pb-4 pt-2 px-4 border-t border-gray-200 flex-col flex gap-2">
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
      </div>
      {/* Trigger flutuante (apenas mobile) */}
      <SidebarFloatingTrigger />
    </SidebarProvider>
  );
};

export default Sidebar;

