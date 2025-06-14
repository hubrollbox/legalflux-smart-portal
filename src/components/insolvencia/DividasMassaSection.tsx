
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DividaMassa } from "@/integrations/supabase/insolvencyTypes";
import DividaMassaForm from "./DividaMassaForm";
import { toast } from "sonner";
import { Plus, Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchDividas = async (insolvenciaId: string): Promise<DividaMassa[]> => {
  const { data, error } = await supabase
    .from("dividas_massa")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("descricao", { ascending: true });
  if (error) throw error;
  return data || [];
};

const DividasMassaSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dividas_massa", insolvenciaId],
    queryFn: () => fetchDividas(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const queryClient = useQueryClient();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editDivida, setEditDivida] = useState<DividaMassa | null>(null);

  // Mutations: upsert (create/update)
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      if (editDivida) {
        // Update
        const { error } = await supabase
          .from("dividas_massa")
          .update({
            descricao: values.descricao,
            valor: values.valor,
            categoria: values.categoria,
          })
          .eq("id", editDivida.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("dividas_massa")
          .insert({
            insolvencia_id: insolvenciaId,
            descricao: values.descricao,
            valor: values.valor,
            categoria: values.categoria,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Dívida da massa guardada!");
      queryClient.invalidateQueries({ queryKey: ["dividas_massa", insolvenciaId] });
    },
    onError: (e: any) => {
      toast.error("Erro ao guardar: " + e.message);
    }
  });

  // Mutation: delete
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("dividas_massa").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Dívida da massa removida");
      queryClient.invalidateQueries({ queryKey: ["dividas_massa", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Dívidas da Massa:</span>
        <Button size="sm" onClick={() => { setEditDivida(null); setModalOpen(true); }}>
          <Plus size={16} /> Nova dívida
        </Button>
      </div>
      {isLoading && <div className="text-muted-foreground">A carregar dívidas da massa...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar as dívidas da massa.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">Nenhuma dívida da massa registada.</div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Descrição</th>
                <th className="px-3 py-2 text-left">Categoria</th>
                <th className="px-3 py-2 text-left">Valor</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((divida) => (
                <tr key={divida.id} className="border-b">
                  <td className="px-3 py-2">{divida.descricao}</td>
                  <td className="px-3 py-2">{divida.categoria || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {divida.valor != null
                      ? Number(divida.valor).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })
                      : <span className="text-muted-foreground italic">—</span>}
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditDivida(divida); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(divida.id)}
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
        <DividaMassaForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditDivida(null); }}
          defaultValues={editDivida}
          onSave={async (data) => mutationUpsert.mutateAsync(data)}
        />
      )}
    </div>
  );
};

export default DividasMassaSection;
