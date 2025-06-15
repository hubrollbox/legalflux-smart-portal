import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import {
  Sidebar as ShadSidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Euro,
  Settings,
  LogOut,
  User,
  Bot,
  Link2,
  FileText as FileTextIcon,
  ArrowLeft, // Importar icone Rever
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useRef } from 'react';
import SidebarQuickActions from './SidebarQuickActions';
import UniversalSearchBar from './UniversalSearchBar';
import SidebarDrawerMenu from "./SidebarDrawerMenu";

// MENU CORRIGIDO: ordem, rotas e ícones completos!
const sidebarItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/processos', label: 'Processos', icon: FileText },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/financeiro', label: 'Financeiro', icon: Euro },
  { to: '/ia-assistant', label: 'IA', icon: Bot }, // IA ASSISTANT
  { to: '/minhas-integrações', label: 'Minhas Integrações', icon: Link2 }, // INTEGRAÇÕES
  { to: '/subscricoes', label: 'Subscrições', icon: FileTextIcon }, // ADICIONADO aqui
  { to: '/definicoes', label: 'Definições', icon: Settings },
];

const SidebarMenuList = ({ onItemClick }: { onItemClick?: () => void }) => {
  const location = useLocation();
  return (
    <SidebarMenu>
      {sidebarItems.map((item) => (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton
            asChild
            isActive={location.pathname === item.to}
          >
            <Link to={item.to} onClick={onItemClick} className="flex items-center w-full">
              <item.icon className="mr-3 min-w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

// Hook para auto-colapso da sidebar (>= 1200px desktops)
function useAutoCollapseSidebar() {
  const { setOpen, isMobile, userToggledSidebar } = useSidebar();
  useEffect(() => {
    if (isMobile) return;
    if (userToggledSidebar) return; // NUNCA auto-colapsa depois do user clicar
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen, isMobile, userToggledSidebar]);
}

// Componente apenas para garantir o efeito é aplicado só dentro do Provider
function SidebarAutoCollapseEffect() {
  useAutoCollapseSidebar();
  return null;
}

const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  // Detetar manualmente: mostrar trigger sempre em md+ e NUNCA ocultar nem bloquear
  const showTrigger = !isMobile;

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      {/* Efeito apenas desktop/tablet */}
      {!isMobile && <SidebarAutoCollapseEffect />}
      <div className="min-h-screen w-full flex flex-row">
        {showTrigger && (
          <div className="flex flex-col justify-start z-50">
            <SidebarTrigger className="mt-4 ml-2 mb-2" />
          </div>
        )}
        {/* Sidebar desktop */}
        <div className="hidden md:block">
          <ShadSidebar>
            <SidebarHeader className="flex flex-row items-center gap-3 min-h-[68px] p-4 border-b border-gray-200 relative">
              {/* Logo, sem botão Rever */}
              <img
                src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
                alt="Legalflux Logo"
                className="h-10 w-10 rounded-md ml-8"
              />
              <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
            </SidebarHeader>
            {/* Universal search bar (desktop) */}
            <div className="px-4 py-3">
              <UniversalSearchBar />
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="hidden" />
                <SidebarGroupContent>
                  <SidebarMenuList />
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="pb-4 px-4 border-t border-gray-200 flex-col flex gap-2">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-2 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
                type="button"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </SidebarFooter>
          </ShadSidebar>
        </div>
        {/* Sidebar mobile drawer */}
        {isMobile && (
          <>
            <SidebarTrigger className="fixed z-50 top-3 left-3 bg-white rounded-full shadow p-2 border border-gray-200 md:hidden" />
            <div className="block md:hidden">
              <ShadSidebar>
                <SidebarHeader className="flex flex-row items-center gap-3 min-h-[68px] p-4 border-b border-gray-200 relative">
                  {/* Logo mobile, sem botão Rever */}
                  <img
                    src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
                    alt="Legalflux Logo"
                    className="h-10 w-10 rounded-md ml-8"
                  />
                  <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
                </SidebarHeader>
                {/* NOVO: DrawerMenu enxuto mobile */}
                <SidebarDrawerMenu onLinkClick={() => {}} />
                {/* Sign out sempre no rodapé */}
                <SidebarFooter className="pb-4 px-4 border-t border-gray-200 flex-col flex gap-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-2 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
                    type="button"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </SidebarFooter>
              </ShadSidebar>
            </div>
          </>
        )}
        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full bg-gray-50">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
