
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useAuth } from "@/contexts/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useScrollToTop();
  useAuth(); // Garantir load de sessão e persistência

  // Removida a div flex redundante, o Sidebar já faz o layout geral
  return (
    <Sidebar>
      <main className="flex-1 flex flex-col min-w-0 max-w-full bg-gray-50 p-0">
        {children}
      </main>
    </Sidebar>
  );
};

export default DashboardLayout;
