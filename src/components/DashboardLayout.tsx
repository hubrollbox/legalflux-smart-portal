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
    // Wrapper FLEX garante colagem e centralização.
    <div className="w-full min-h-screen flex flex-row bg-gray-50">
      {/* Sidebar SEM margem nem padding lateral */}
      <Sidebar />
      {/* Main perfeitamente colado sem gaps */}
      <main className="flex-1 min-w-0 overflow-auto p-0 bg-gray-50">
        {/* Removido max-w-7xl e mx-auto */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
