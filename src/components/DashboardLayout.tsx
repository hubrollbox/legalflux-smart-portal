
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useScrollToTop();

  return (
    // Usar w-full para garantir que o layout preenche todo o espaço e não há espaço entre sidebar e conteúdo
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar mantém-se à esquerda sem espaço extra */}
      <Sidebar />
      {/* Utilizar grow para ocupar o resto, sem margin ou gap! */}
      <main className="flex-1 min-w-0 overflow-auto p-2 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

