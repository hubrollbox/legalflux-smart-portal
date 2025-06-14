
import React from "react";

const NegociosCursoSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  return (
    <div>
      <div className="font-semibold mb-2">Negócios em Curso:</div>
      <div className="text-muted-foreground italic">Funcionalidade de gestão de negócios em curso em breve.</div>
    </div>
  );
};

export default NegociosCursoSection;
