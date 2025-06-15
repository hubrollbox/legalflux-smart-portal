
import { useLocation, Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Euro,
  Settings,
  User,
  Bot,
  Link2,
  FileText as FileTextIcon,
  // ArrowLeft, // No need
} from "lucide-react";

// Ordem, rotas e ícones completos!
const sidebarItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/processos', label: 'Processos', icon: FileText },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/financeiro', label: 'Financeiro', icon: Euro },
  { to: '/ia-assistant', label: 'IA', icon: Bot },
  { to: '/minhas-integrações', label: 'Minhas Integrações', icon: Link2 },
  { to: '/subscricoes', label: 'Subscrições', icon: FileTextIcon },
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

export default SidebarMenuList;
