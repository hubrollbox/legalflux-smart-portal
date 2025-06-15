
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import { useNavigate } from "react-router-dom";

const SidebarSignOutButton = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center w-full px-2 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
      type="button"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sair
    </button>
  );
};

export default SidebarSignOutButton;
