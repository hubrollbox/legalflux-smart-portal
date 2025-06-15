
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

  return (
    <div className="w-full min-h-screen flex flex-row bg-gray-50 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 min-w-0 bg-gray-50 p-0 flex flex-col max-w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
