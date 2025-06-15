
import { Link } from "react-router-dom";
import { Plus, Users, MessageSquare } from "lucide-react";

/**
 * Atalhos rápidos para ações principais (sidebar mobile)
 */
const quickActions = [
  {
    to: "/insolvencias",
    label: "Novo Processo",
    icon: Plus,
    description: "Criar novo processo de insolvência",
  },
  {
    to: "/clientes",
    label: "Clientes",
    icon: Users,
    description: "Listar clientes",
  },
  {
    to: "/chat",
    label: "Chat",
    icon: MessageSquare,
    description: "Abrir chat interno",
  },
];

function SidebarQuickActions({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="flex gap-3 pt-2 pb-4 justify-center bg-white/90 z-20 sticky top-0">
      {quickActions.map((act) => (
        <Link
          key={act.to}
          to={act.to}
          onClick={onItemClick}
          tabIndex={0}
          className="flex flex-col items-center justify-center min-w-[64px] min-h-[56px] gap-1 rounded-xl bg-accent-100 hover:bg-accent-200 shadow transition 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent border
          active:scale-95"
          aria-label={act.description}
          style={{ touchAction: "manipulation" }}
        >
          <act.icon size={24} className="text-accent-700" aria-hidden />
          <span className="text-xs font-semibold text-accent-800">{act.label}</span>
        </Link>
      ))}
    </div>
  );
}
export default SidebarQuickActions;
