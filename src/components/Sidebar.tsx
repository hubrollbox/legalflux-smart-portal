
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
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Menu, LayoutDashboard, Users, FileText, Calendar, MessageSquare, Euro, Settings, LogOut, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const sidebarItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/processos', label: 'Processos', icon: FileText },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/financeiro', label: 'Financeiro', icon: Euro },
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

const Sidebar = () => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
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
        {/* Mobile sidebar trigger */}
        {isMobile && (
          <SidebarTrigger className="fixed z-50 top-3 left-3 bg-white rounded-full shadow p-2 border border-gray-200" />
        )}
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          {/* Conteúdo real do dashboard será children nas páginas */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;

