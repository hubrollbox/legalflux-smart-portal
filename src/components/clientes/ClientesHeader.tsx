
import React from "react";

interface ClientesHeaderProps {
  onAdd: () => void;
}

const ClientesHeader: React.FC<ClientesHeaderProps> = ({ onAdd }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-primary-800">Clientes</h1>
      <p className="text-gray-600">Gestão de todos os clientes cadastrados</p>
    </div>
    <button
      className="bg-primary-800 hover:bg-primary-700 text-white px-4 py-2 rounded"
      onClick={onAdd}
    >
      Novo Cliente
    </button>
  </div>
);

export default ClientesHeader;
