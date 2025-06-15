
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Mini campo de busca global (prototipo - incrementa conforme integrações reais)
 * Pode ser adaptado para buscar casos, clientes ou docs via texto.
 */
const UniversalSearchBar = ({ className = "" }: { className?: string }) => {
  const [v, setV] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (v.trim().length === 0) return;
    // FUTURO: decidir destino conforme lógica de busca, por ora redireciona para pesquisa de processos
    navigate(`/processos?busca=${encodeURIComponent(v)}`);
    setV("");
  }

  return (
    <form onSubmit={handleSearch} className={`flex items-center gap-2 ${className}`}>
      <Input
        value={v}
        onChange={e => setV(e.target.value)}
        placeholder="Buscar casos, clientes, docs..."
        className="rounded-lg pl-10 pr-3 py-2 min-w-[0] w-full bg-accent-50 placeholder:text-accent-400 focus:ring-2 focus:ring-accent-600"
        inputMode="search"
        name="busca-universal"
        aria-label="Buscar"
        autoComplete="off"
        style={{minHeight:40}}
      />
      <Search className="absolute left-3 text-accent-400 pointer-events-none" aria-hidden size={18} />
    </form>
  );
};

export default UniversalSearchBar;
