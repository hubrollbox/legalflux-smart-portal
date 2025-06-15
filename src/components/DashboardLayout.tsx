import React from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MobileBottomBar from "./MobileBottomBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <Sidebar>
        <main className="flex-1 w-full max-w-full">
          {children}
        </main>
      </Sidebar>
      <MobileBottomBar />
    </div>
  );
};

export default DashboardLayout;
