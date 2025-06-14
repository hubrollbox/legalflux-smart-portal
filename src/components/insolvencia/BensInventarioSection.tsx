
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BemInventario } from "@/integrations/supabase/insolvencyTypes";
import BemInventarioForm from "./BemInventarioForm";
import { toast } from "sonner";
import { Plus, Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchBens = async (insolvenciaId: string): Promise<BemInventario[]> => {
  const { data, error } = await supabase
    .from("bens_inventario")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("descricao", { ascending: true });
  if (error) throw error;
  return data || [];
};

const BensInventarioSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bens_inventario", insolvenciaId],
    queryFn: () => fetchBens(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const queryClient = useQueryClient();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editBem, setEditBem] = useState<BemInventario | null>(null);

  // Mutations: upsert (create/update)
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      if (editBem) {
        // Update
        const { error } = await supabase
          .from("bens_inventario")
          .update({
            descricao: values.descricao,
            valor_estimado: values.valor_estimado,
            estado: values.estado,
          })
          .eq("id", editBem.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("bens_inventario")
          .insert({
            insolvencia_id: insolvenciaId,
            descricao: values.descricao,
            valor_estimado: values.valor_estimado,
            estado: values.estado,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Bem de inventário guardado!");
      queryClient.invalidateQueries({ queryKey: ["bens_inventario", insolvenciaId] });
    },
    onError: (e: any) => {
      toast.error("Erro ao guardar: " + e.message);
    }
  });

  // Mutation: delete
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bens_inventario").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Bem removido");
      queryClient.invalidateQueries({ queryKey: ["bens_inventario", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Inventário de Bens:</span>
        <Button size="sm" onClick={() => { setEditBem(null); setModalOpen(true); }}>
          <Plus size={16} /> Novo bem
        </Button>
      </div>
      {isLoading && <div className="text-muted-foreground">A carregar bens...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar o inventário.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">Nenhum bem registado neste processo.</div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Descrição</th>
                <th className="px-3 py-2 text-left">Valor Estimado</th>
                <th className="px-3 py-2 text-left">Estado</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((bem) => (
                <tr key={bem.id} className="border-b">
                  <td className="px-3 py-2">{bem.descricao}</td>
                  <td className="px-3 py-2">
                    {bem.valor_estimado != null
                      ? Number(bem.valor_estimado).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })
                      : <span className="text-muted-foreground italic">—</span>}
                  </td>
                  <td className="px-3 py-2 capitalize">{bem.estado || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditBem(bem); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(bem.id)}
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
        <BemInventarioForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditBem(null); }}
          defaultValues={editBem}
          onSave={async (data) => mutationUpsert.mutateAsync(data)}
        />
      )}
    </div>
  );
};

export default BensInventarioSection;
