
import React from "react";

interface Cliente {
  id: number | string;
  nome: string;
  email?: string;
  telefone?: string;
}

interface ClientesListProps {
  clientes: Cliente[];
  loading: boolean;
  onView?: (cliente: Cliente) => void;
}

const ClientesList: React.FC<ClientesListProps> = ({
  clientes,
  loading,
  onView,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
      </div>
    );
  }
  if (!clientes.length)
    return (
      <div className="text-gray-500 text-center py-8">Nenhum cliente encontrado.</div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {clientes.map((cliente) => (
        <div
          key={cliente.id}
          className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <div className="text-lg font-bold text-primary-800">{cliente.nome}</div>
            <div className="text-sm text-gray-600">{cliente.email || "—"}</div>
            <div className="text-sm text-gray-600">{cliente.telefone || "—"}</div>
          </div>
          {onView && (
            <button
              className="mt-2 text-sm text-primary-700 hover:underline self-end"
              onClick={() => onView(cliente)}
            >
              Ver detalhes
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientesList;
