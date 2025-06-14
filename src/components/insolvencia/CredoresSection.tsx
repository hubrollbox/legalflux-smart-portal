
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Credor } from "@/integrations/supabase/insolvencyTypes";

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

  return (
    <div>
      <div className="font-semibold mb-2">Credores deste processo:</div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CredoresSection;
