
import { Link } from "react-router-dom";
import { Home, FileText, Users, MessageSquare, User, MoreHorizontal } from "lucide-react";
import SidebarQuickActions from "./SidebarQuickActions";
import React, { useState } from "react";

// Essenciais e extras modularizados
const essentialLinks = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/processos", label: "Processos", icon: FileText },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/perfil", label: "Perfil", icon: User },
];

const extraLinks = [
  { to: "/calendario", label: "Calendário" },
  { to: "/financeiro", label: "Financeiro" },
  { to: "/ia-assistant", label: "IA Assistant" },
  { to: "/minhas-integrações", label: "Integrações" },
  { to: "/subscricoes", label: "Subscrições" },
  { to: "/definicoes", label: "Definições" },
];

// Componente para lista de links essenciais
function EssentialLinks({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <>
      {essentialLinks.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold hover:bg-accent-100 active:bg-accent-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          tabIndex={0}
          aria-label={item.label}
        >
          <item.icon size={24} className="text-accent-700" aria-hidden />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
}

// Componente para extras (só aparece ao expandir)
function ExtraLinks({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="mt-1 flex flex-col gap-1 animate-fade-in">
      {extraLinks.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-normal text-accent-700 hover:bg-accent-100 transition focus:outline-none"
          tabIndex={0}
          aria-label={item.label}
        >
          <span className="ml-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

// Botão Mais/Menos isolado
function MoreButton({ showMore, setShowMore }: { showMore: boolean; setShowMore: (v: boolean) => void }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold border-t mt-2 text-accent-900 hover:bg-accent-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      onClick={() => setShowMore(!showMore)}
      aria-expanded={showMore}
    >
      <MoreHorizontal size={24} className="text-accent-700" />
      <span>{showMore ? "Menos" : "Mais"}</span>
    </button>
  );
}

/**
 * Drawer menu refatorado para mobile/md:
 * Essenciais + botão para extras, tudo bem modular.
 */
const SidebarDrawerMenu = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <nav
      className="flex flex-col gap-2 px-4 pt-2 pb-6 w-full"
      aria-label="Menu"
    >
      <SidebarQuickActions onItemClick={onLinkClick} />
      <div className="mt-2 flex flex-col gap-1">
        <EssentialLinks onLinkClick={onLinkClick} />
        <MoreButton showMore={showMore} setShowMore={setShowMore} />
        {showMore && <ExtraLinks onLinkClick={onLinkClick} />}
      </div>
    </nav>
  );
};

export default SidebarDrawerMenu;

