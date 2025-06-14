
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useScrollToTop();

  return (
    // Wrapper FLEX garante colagem e centralização.
    <div className="w-full min-h-screen flex flex-row bg-gray-50">
      {/* Sidebar SEM margem nem padding lateral */}
      <Sidebar />
      {/* Main perfeitamente colado sem gaps */}
      <main className="flex-1 min-w-0 overflow-auto p-0 md:p-8 max-w-full">
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

