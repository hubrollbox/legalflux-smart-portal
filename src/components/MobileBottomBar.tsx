
import { Home, FileText, Users, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const nav = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/processos", icon: FileText, label: "Processos" },
  { to: "/clientes", icon: Users, label: "Clientes" },
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

export default function MobileBottomBar() {
  const location = useLocation();
  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-white border-t shadow flex justify-around items-center h-[62px]">
      {nav.map(({ to, icon: Icon, label }) => (
        <Link
          to={to}
          tabIndex={0}
          aria-label={label}
          key={to}
          className={`flex flex-col items-center justify-center flex-1 px-2 py-1 transition 
            ${location.pathname === to ? "text-accent-700 font-bold" : "text-accent-500"}
          `}
          style={{ minWidth: 0 }}
        >
          <Icon size={24} />
          <span className="text-[11px] leading-none">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
