
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
  Link2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useRef } from 'react';

// MENU CORRIGIDO: ordem, rotas e ícones completos!
const sidebarItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/processos', label: 'Processos', icon: FileText },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/financeiro', label: 'Financeiro', icon: Euro },
  { to: '/ia-assistant', label: 'IA', icon: Bot }, // <-- IA ASSISTANT
  { to: '/minhas-integracoes', label: 'Minhas Integrações', icon: Link2 }, // <-- INTEGRAÇÕES
  { to: '/perfil', label: 'Minha Conta', icon: User },
  { to: '/definicoes', label: 'Definições', icon: Settings },
];

const SidebarMenuList = ({ onItemClick }: { onItemClick?: () => void }) => {
  const location = useLocation();
  return (
    <SidebarMenu>
      {sidebarItems.map((item) => (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton asChild isActive={location.pathname === item.to}>
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
  const { setOpen, isMobile } = useSidebar();
  const mqlRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (isMobile) return; // nunca auto-collapse em mobile (o drawer trata)
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setOpen(false); // colapsar
      } else {
        setOpen(true); // expandir
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen, isMobile]);
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
  let showTrigger = !isMobile;

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      {/* Efeito de auto-colapso apenas em desktop/tablet */}
      {!isMobile && <SidebarAutoCollapseEffect />}
      <div className="min-h-screen w-full flex flex-row">
        {/* SidebarTrigger como botão fixo (desktop) */}
        {showTrigger && (
          <div className="hidden md:flex flex-col justify-start z-50">
            <SidebarTrigger className="mt-4 ml-2 mb-2" />
          </div>
        )}
        {/* Sidebar DESKTOP (shadcn) */}
        <div className="hidden md:block">
          <ShadSidebar>
            <SidebarHeader className="flex flex-row items-center gap-3 min-h-[68px] p-4 border-b border-gray-200">
              <img
                src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
                alt="Legalflux Logo"
                className="h-10 w-10 rounded-md"
              />
              <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
            </SidebarHeader>
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
        {/* Sidebar MOBILE como drawer */}
        {isMobile && (
          <>
            <SidebarTrigger className="fixed z-50 top-3 left-3 bg-white rounded-full shadow p-2 border border-gray-200 md:hidden" />
            <div className="block md:hidden">
              <ShadSidebar>
                <SidebarHeader className="flex flex-row items-center gap-3 min-h-[68px] p-4 border-b border-gray-200">
                  <img
                    src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
                    alt="Legalflux Logo"
                    className="h-10 w-10 rounded-md"
                  />
                  <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel className="hidden" />
                    <SidebarGroupContent>
                      <SidebarMenuList onItemClick={() => {}} />
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
          </>
        )}
        {/* Conteudo principal ocupa todo o resto, sem margem extra */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full bg-gray-50">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
