
import React from "react";

const DocumentosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  return (
    <div>
      <div className="font-semibold mb-2">Documentos Legais Gerados:</div>
      <div className="text-muted-foreground italic">Funcionalidade de gestão de documentos brevemente.</div>
    </div>
  );
};

export default DocumentosSection;
