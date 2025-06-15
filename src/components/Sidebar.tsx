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
import SidebarLogo from './SidebarLogo';
import SidebarSignOutButton from './SidebarSignOutButton';
import SidebarMenuList from './SidebarMenuList';
import SidebarAutoCollapseEffect from './SidebarAutoCollapseEffect';
import SidebarQuickActions from './SidebarQuickActions';
import UniversalSearchBar from './UniversalSearchBar';
import SidebarDrawerMenu from "./SidebarDrawerMenu";

// Main Sidebar component:
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
              <SidebarLogo />
              <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
            </SidebarHeader>
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
              <SidebarSignOutButton />
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
                  <SidebarLogo />
                  <span className="ml-2 text-lg font-bold text-primary-800">LegalFlux</span>
                </SidebarHeader>
                <SidebarDrawerMenu onLinkClick={() => {}} />
                <SidebarFooter className="pb-4 px-4 border-t border-gray-200 flex-col flex gap-2">
                  <SidebarSignOutButton />
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
