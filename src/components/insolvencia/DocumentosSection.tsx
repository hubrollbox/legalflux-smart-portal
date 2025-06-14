
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DocumentoInsolvencia } from "@/integrations/supabase/insolvencyTypes";

const fetchDocumentos = async (insolvenciaId: string): Promise<DocumentoInsolvencia[]> => {
  const { data, error } = await supabase
    .from("documentos_insolvencia")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("data", { ascending: false });
  if (error) throw error;
  return data || [];
};

const DocumentosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["documentos_insolvencia", insolvenciaId],
    queryFn: () => fetchDocumentos(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  return (
    <div>
      <div className="font-semibold mb-2">Documentos Legais Gerados:</div>
      {isLoading && <div className="text-muted-foreground">A carregar documentos...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar os documentos.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">
          Nenhum documento registado para este processo.
        </div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Tipo de Documento</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc) => (
                <tr key={doc.id} className="border-b">
                  <td className="px-3 py-2">{doc.tipo_documento}</td>
                  <td className="px-3 py-2">{doc.data ? new Date(doc.data).toLocaleDateString("pt-PT") : <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {doc.conteudo
                      ? (
                        <button
                          className="text-blue-700 underline font-medium hover:text-blue-900"
                          onClick={() => {
                            // Abre uma nova aba apenas se for um URL (futuramente pode suportar html/pdf inline)
                            if (doc.conteudo?.startsWith("http")) {
                              window.open(doc.conteudo, "_blank", "noopener");
                            } else {
                              alert("Conteúdo disponível apenas internamente.");
                            }
                          }}
                        >
                          Ver
                        </button>
                      )
                      : <span className="text-muted-foreground italic">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentosSection;
