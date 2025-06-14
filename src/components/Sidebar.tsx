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

  // Botão de repetir tutorial
  const handleRestartOnboarding = () => {
    localStorage.removeItem('legalflux-onboarding-completed');
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <ShadcnSidebar className="!w-[260px] max-w-[90vw] min-h-screen bg-sidebar text-sidebar-foreground border-r border-gray-200 flex flex-col items-stretch p-0">
        {/* Cabeçalho alinhado sem espaço lateral */}
        <SidebarHeader className="relative px-4 pt-6 pb-3 flex flex-row items-center gap-3 min-h-[68px]">
          {/* Botão collapse/expand desktop, extremo-esquerdo */}
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
          {/* Botão trigger mobile no extremo direito */}
          <div className="absolute right-3 top-3 md:hidden">
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        {/* Conteúdo de navegação SEM padding horizontal extra */}
        <SidebarContent className="flex-1 px-0 pt-1">
          <SidebarGroup>
            <SidebarGroupLabel className="hidden" />
            <SidebarGroupContent>
              <SidebarNavigationMenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* Footer alinhado, sem espaçamento extra */}
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
      {/* Botão flutuante mobile sempre visível */}
      <SidebarTrigger className="fixed bottom-4 left-4 z-50 md:hidden shadow-lg bg-white hover:bg-accent-100 border rounded-full px-3 py-2" />
    </SidebarProvider>
  );
};

export default Sidebar;
