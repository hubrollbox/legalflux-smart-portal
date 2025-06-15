
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
    <div className="min-h-screen w-full flex flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        <main className="flex-1 flex flex-col min-w-0 max-w-full bg-gray-50 p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
