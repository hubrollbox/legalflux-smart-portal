
import React from "react";

const CredoresSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  // No futuro: useQuery para buscar credores do processo
  return (
    <div>
      <div className="font-semibold mb-2">Credores deste processo:</div>
      <div className="text-muted-foreground italic">Funcionalidade de gestão de credores em breve.</div>
    </div>
  );
};

export default CredoresSection;
