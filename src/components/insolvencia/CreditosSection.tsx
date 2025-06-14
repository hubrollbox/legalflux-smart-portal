import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Credor, Credito } from "@/integrations/supabase/insolvencyTypes";
import CreditoForm from "./CreditoForm";
import { toast } from "sonner";
import { Plus, Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

type CreditoComCredor = Credito & { credor: Pick<Credor, "id" | "nome"> | null };

const fetchCredores = async (insolvenciaId: string): Promise<Credor[]> => {
  const { data, error } = await supabase
    .from("credores")
    .select("id, insolvencia_id, nome, nif, email") // select all required fields!
    .eq("insolvencia_id", insolvenciaId);
  if (error) throw error;
  return data || [];
};

const fetchCreditos = async (insolvenciaId: string): Promise<CreditoComCredor[]> => {
  const credores = await fetchCredores(insolvenciaId);
  if (!credores || credores.length === 0) return [];

  const credorIds = credores.map((c) => c.id);
  const { data: creditos, error: errorCreditos } = await supabase
    .from("creditos")
    .select("*")
    .in("credor_id", credorIds);

  if (errorCreditos) throw errorCreditos;
  if (!creditos) return [];

  return creditos.map((credito: Credito) => ({
    ...credito,
    credor: credores.find((c: Credor) => c.id === credito.credor_id) ?? null,
  }));
};

const CreditosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data: creditos, isLoading, error } = useQuery({
    queryKey: ["creditos", insolvenciaId],
    queryFn: () => fetchCreditos(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const { data: credores = [] } = useQuery({
    queryKey: ["credores", insolvenciaId],
    queryFn: () => fetchCredores(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const queryClient = useQueryClient();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editCredito, setEditCredito] = useState<CreditoComCredor | null>(null);

  // CRUD mutations
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      if (editCredito) {
        // Update
        const { error } = await supabase
          .from("creditos")
          .update({
            tipo_credito: values.tipo_credito,
            valor: values.valor,
            data: values.data,
          })
          .eq("id", editCredito.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("creditos")
          .insert({
            credor_id: values.credor_id,
            tipo_credito: values.tipo_credito,
            valor: values.valor,
            data: values.data,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Crédito guardado!");
      queryClient.invalidateQueries({ queryKey: ["creditos", insolvenciaId] });
    },
    onError: (e: any) => {
      toast.error("Erro ao guardar: " + e.message);
    }
  });

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("creditos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Crédito removido");
      queryClient.invalidateQueries({ queryKey: ["creditos", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Créditos associados:</span>
        <Button size="sm" onClick={() => { setEditCredito(null); setModalOpen(true); }}>
          <Plus size={16} /> Novo crédito
        </Button>
      </div>
      {isLoading && (
        <div className="text-muted-foreground">A carregar créditos...</div>
      )}
      {error && (
        <div className="text-destructive text-sm">Ocorreu um erro ao carregar os créditos.</div>
      )}
      {!isLoading && !error && creditos && creditos.length === 0 && (
        <div className="text-muted-foreground italic">
          Nenhum crédito registado neste processo.
        </div>
      )}
      {!isLoading && !error && !!creditos && creditos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Credor</th>
                <th className="px-3 py-2 text-left">Tipo de Crédito</th>
                <th className="px-3 py-2 text-left">Valor</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((credito) => (
                <tr key={credito.id} className="border-b">
                  <td className="px-3 py-2">{credito.credor?.nome ?? <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">{credito.tipo_credito}</td>
                  <td className="px-3 py-2">{Number(credito.valor).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}</td>
                  <td className="px-3 py-2">{credito.data ? new Date(credito.data).toLocaleDateString("pt-PT") : <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditCredito(credito); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(credito.id)}
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
        <CreditoForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditCredito(null); }}
          defaultValues={editCredito}
          credores={credores}
          onSave={async (data) => mutationUpsert.mutateAsync(data)}
        />
      )}
    </div>
  );
};

export default CreditosSection;
