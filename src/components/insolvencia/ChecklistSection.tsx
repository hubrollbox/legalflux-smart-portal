
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ChecklistInsolvencia } from "@/integrations/supabase/insolvencyTypes";
import ChecklistForm from "./ChecklistForm";
import { toast } from "sonner";
import { Plus, Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  "atrasado": "bg-red-100 text-red-700 animate-pulse"
};

const ChecklistSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["checklist_insolvencia", insolvenciaId],
    queryFn: () => fetchChecklist(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editChecklist, setEditChecklist] = useState<ChecklistInsolvencia | null>(null);

  // Add or update
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      if (editChecklist) {
        // Update
        const { error } = await supabase
          .from("checklist_insolvencia")
          .update({
            etapa: values.etapa,
            status: values.status,
            prazo: values.prazo,
          })
          .eq("id", editChecklist.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("checklist_insolvencia")
          .insert({
            insolvencia_id: insolvenciaId,
            etapa: values.etapa,
            status: values.status,
            prazo: values.prazo,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Checklist guardado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["checklist_insolvencia", insolvenciaId] });
    },
    onError: (e: any) => {
      toast.error("Erro ao guardar: " + e.message);
    },
  });

  // Remove item
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("checklist_insolvencia").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tarefa removida");
      queryClient.invalidateQueries({ queryKey: ["checklist_insolvencia", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  // Helper: verifica se algum prazo é para breve ou atrasado
  const getRowAlert = (item: ChecklistInsolvencia) => {
    if (!item.prazo) return "";
    const prazoData = new Date(item.prazo);
    const hoje = new Date();
    const diff = Math.ceil((prazoData.getTime() - hoje.getTime()) / (1000*60*60*24));
    if (item.status === "concluido") return "";
    if (diff < 0) return "bg-red-50 outline-red-300 outline outline-2";
    if (diff <= 3) return "bg-yellow-50 outline-yellow-200 outline outline-2 animate-pulse";
    return "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Checklist Legal:</span>
        <Button size="sm" onClick={() => { setEditChecklist(null); setModalOpen(true); }}>
          <Plus size={16} /> Nova etapa
        </Button>
      </div>
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
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className={`border-b ${getRowAlert(item)}`}>
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
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditChecklist(item); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(item.id)}
                      className="text-sm p-1 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <ChecklistForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditChecklist(null); }}
          defaultValues={editChecklist}
          onSave={async (data) => mutationUpsert.mutateAsync(data)}
        />
      )}
    </div>
  );
};
export default ChecklistSection;
