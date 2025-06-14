
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NegocioCurso } from "@/integrations/supabase/insolvencyTypes";

const fetchNegocios = async (insolvenciaId: string): Promise<NegocioCurso[]> => {
  const { data, error } = await supabase
    .from("negocios_curso")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("descricao", { ascending: true });
  if (error) throw error;
  return data || [];
};

const NegociosCursoSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["negocios_curso", insolvenciaId],
    queryFn: () => fetchNegocios(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  return (
    <div>
      <div className="font-semibold mb-2">Negócios em Curso:</div>
      {isLoading && <div className="text-muted-foreground">A carregar negócios em curso...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar os negócios.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">Nenhum negócio em curso registado.</div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Descrição</th>
                <th className="px-3 py-2 text-left">Estado</th>
                <th className="px-3 py-2 text-left">Documento</th>
              </tr>
            </thead>
            <tbody>
              {data.map((negocio) => (
                <tr key={negocio.id} className="border-b">
                  <td className="px-3 py-2">{negocio.descricao}</td>
                  <td className="px-3 py-2">{negocio.estado || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {negocio.documento
                      ? <span className="text-blue-700 underline cursor-pointer">Ver documento</span>
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

export default NegociosCursoSection;

