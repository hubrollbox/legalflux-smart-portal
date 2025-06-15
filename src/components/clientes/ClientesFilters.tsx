
import React from "react";

interface ClientesFiltersProps {
  searchTerm: string;
  onSearch: (q: string) => void;
}

const ClientesFilters: React.FC<ClientesFiltersProps> = ({ searchTerm, onSearch }) => (
  <div className="mb-4 flex gap-2">
    <input
      type="text"
      placeholder="Pesquisar clientes..."
      value={searchTerm}
      className="flex-1 border px-3 py-2 rounded"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default ClientesFilters;
