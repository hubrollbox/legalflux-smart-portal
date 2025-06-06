
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  Users, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Brain,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Processos', href: '/processos' },
    { icon: Calendar, label: 'Calendário', href: '/calendario' },
    { icon: Users, label: 'Clientes', href: '/clientes' },
    { icon: MessageSquare, label: 'Chat', href: '/chat' },
    { icon: CreditCard, label: 'Financeiro', href: '/financeiro' },
    { icon: Brain, label: 'IA Assistant', href: '/ia-assistant' },
    { icon: LinkIcon, label: 'Integrações', href: '/integracoes' },
    { icon: Settings, label: 'Definições', href: '/definicoes' },
  ];

  return (
    <div className={cn(
      "bg-primary-800 text-white h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-primary-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="/lovable-uploads/3c621e97-ebe6-4a63-be63-bcee1711ab40.png" 
                  alt="Legalflux Logo" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold">Legalflux</h1>
                <p className="text-xs text-primary-200">Portal Jurídico</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="bg-white p-2 rounded-lg mx-auto">
              <img 
                src="/lovable-uploads/3c621e97-ebe6-4a63-be63-bcee1711ab40.png" 
                alt="Legalflux Logo" 
                className="h-6 w-6 object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-primary-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-primary-300" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full bg-primary-700 text-white placeholder-primary-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-accent-600 text-white" 
                      : "text-primary-200 hover:bg-primary-700 hover:text-white",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-primary-700">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-primary-200 hover:bg-primary-700 hover:text-white",
              collapsed ? "px-2" : "justify-start"
            )}
          >
            <Bell className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Notificações</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-primary-200 hover:bg-primary-700 hover:text-white",
              collapsed ? "px-2" : "justify-start"
            )}
            asChild
          >
            <Link to="/login">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Sair</span>}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
