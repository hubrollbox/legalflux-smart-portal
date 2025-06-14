
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ChecklistInsolvencia } from "@/integrations/supabase/insolvencyTypes";

const fetchChecklist = async (insolvenciaId: string): Promise<ChecklistInsolvencia[]> => {
  const { data, error } = await supabase
    .from("checklist_insolvencia")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("prazo", { ascending: true });
  if (error) throw error;
  return data || [];
};

const statusLabels: Record<string, string> = {
  "pendente": "Pendente",
  "em_progresso": "Em progresso",
  "concluido": "Concluído",
  "atrasado": "Atrasado"
};

const statusColors: Record<string, string> = {
  "pendente": "bg-gray-100 text-gray-600",
  "em_progresso": "bg-blue-100 text-blue-700",
  "concluido": "bg-green-100 text-green-700",
  "atrasado": "bg-red-100 text-red-700"
};

const ChecklistSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["checklist_insolvencia", insolvenciaId],
    queryFn: () => fetchChecklist(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  return (
    <div>
      <div className="font-semibold mb-2">Checklist Legal:</div>
      {isLoading && <div className="text-muted-foreground">A carregar checklist...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar a checklist.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">Nenhuma tarefa registada para este processo.</div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Etapa</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Prazo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-3 py-2">{item.etapa}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded ${statusColors[item.status] || ""}`}>
                      {statusLabels[item.status] ?? item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {item.prazo 
                      ? new Date(item.prazo).toLocaleDateString("pt-PT") 
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

export default ChecklistSection;
