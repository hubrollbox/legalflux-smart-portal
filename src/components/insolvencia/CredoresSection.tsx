import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Credor } from "@/integrations/supabase/insolvencyTypes";
import CredorForm from "./CredorForm";
import { toast } from "sonner";
import { Plus, Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fetchCredores = async (insolvenciaId: string) => {
  const { data, error } = await supabase
    .from("credores")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("nome", { ascending: true });
  if (error) throw error;
  return data as Credor[];
};

const CredoresSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["credores", insolvenciaId],
    queryFn: () => fetchCredores(insolvenciaId),
    enabled: !!insolvenciaId,
  });
  const queryClient = useQueryClient();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editCredor, setEditCredor] = useState<Credor | null>(null);

  // Mutation: upsert (create/update)
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      if (editCredor) {
        // Update
        const { error } = await supabase
          .from("credores")
          .update({
            nome: values.nome,
            nif: values.nif,
            email: values.email,
          })
          .eq("id", editCredor.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("credores")
          .insert({
            insolvencia_id: insolvenciaId,
            nome: values.nome,
            nif: values.nif,
            email: values.email,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Credor guardado!");
      queryClient.invalidateQueries({ queryKey: ["credores", insolvenciaId] });
    },
    onError: (e: any) => {
      toast.error("Erro ao guardar: " + e.message);
    }
  });

  // Mutation: delete
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("credores").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Credor removido");
      queryClient.invalidateQueries({ queryKey: ["credores", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Credores deste processo:</span>
        <Button size="sm" onClick={() => { setEditCredor(null); setModalOpen(true); }}>
          <Plus size={16} /> Novo credor
        </Button>
      </div>
      {isLoading && (
        <div className="text-muted-foreground">A carregar credores...</div>
      )}
      {error && (
        <div className="text-destructive text-sm">Ocorreu um erro ao carregar os credores.</div>
      )}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">
          Nenhum credor registado neste processo.
        </div>
      )}
      {!isLoading && !error && !!data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Nome</th>
                <th className="px-3 py-2 text-left">NIF</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((credor) => (
                <tr key={credor.id} className="border-b">
                  <td className="px-3 py-2">{credor.nome}</td>
                  <td className="px-3 py-2">{credor.nif || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {credor.email ? (
                      <a href={`mailto:${credor.email}`} className="text-blue-700 underline">{credor.email}</a>
                    ) : <span className="text-muted-foreground italic">—</span>}
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditCredor(credor); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(credor.id)}
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
        <CredorForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditCredor(null); }}
          defaultValues={editCredor}
          onSave={async (data) => mutationUpsert.mutateAsync(data)}
        />
      )}
    </div>
  );
};

export default CredoresSection;
