
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useScrollToTop();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
