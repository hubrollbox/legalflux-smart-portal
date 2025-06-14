
import React from "react";

const CreditosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  return (
    <div>
      <div className="font-semibold mb-2">Créditos associados:</div>
      <div className="text-muted-foreground italic">Funcionalidade de gestão de créditos em breve.</div>
    </div>
  );
};

export default CreditosSection;
