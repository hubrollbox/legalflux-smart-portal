
import React from "react";

interface ClientesStatsProps {
  total: number;
}

const ClientesStats: React.FC<ClientesStatsProps> = ({ total }) => (
  <div className="mb-6">
    <span className="font-medium text-primary-800">
      Total de clientes: {total}
    </span>
  </div>
);

export default ClientesStats;
