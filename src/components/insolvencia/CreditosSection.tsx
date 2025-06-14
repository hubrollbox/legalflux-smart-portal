
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Credor, Credito } from "@/integrations/supabase/insolvencyTypes";

type CreditoComCredor = Credito & { credor: Pick<Credor, "nome"> | null };

const fetchCreditos = async (insolvenciaId: string): Promise<CreditoComCredor[]> => {
  // Primeiro, busca todos os credores do processo
  const { data: credores, error: errorCred } = await supabase
    .from("credores")
    .select("id, nome")
    .eq("insolvencia_id", insolvenciaId);

  if (errorCred) throw errorCred;
  if (!credores || credores.length === 0) return [];

  const credorIds = credores.map((c: any) => c.id);

  // Busca créditos cujos credor_id pertencem aos credores do processo
  const { data: creditos, error: errorCreditos } = await supabase
    .from("creditos")
    .select("*")
    .in("credor_id", credorIds);

  if (errorCreditos) throw errorCreditos;
  if (!creditos) return [];

  // Junta dados de crédito e credor pelo credor_id
  return creditos.map((credito: Credito) => ({
    ...credito,
    credor: credores.find((c: Credor) => c.id === credito.credor_id) ?? null,
  }));
};

const CreditosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["creditos", insolvenciaId],
    queryFn: () => fetchCreditos(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  return (
    <div>
      <div className="font-semibold mb-2">Créditos associados:</div>
      {isLoading && (
        <div className="text-muted-foreground">A carregar créditos...</div>
      )}
      {error && (
        <div className="text-destructive text-sm">Ocorreu um erro ao carregar os créditos.</div>
      )}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">
          Nenhum crédito registado neste processo.
        </div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Credor</th>
                <th className="px-3 py-2 text-left">Tipo de Crédito</th>
                <th className="px-3 py-2 text-left">Valor</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Documento</th>
              </tr>
            </thead>
            <tbody>
              {data.map((credito) => (
                <tr key={credito.id} className="border-b">
                  <td className="px-3 py-2">{credito.credor?.nome ?? <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">{credito.tipo_credito}</td>
                  <td className="px-3 py-2">{Number(credito.valor).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}</td>
                  <td className="px-3 py-2">{credito.data ? new Date(credito.data).toLocaleDateString("pt-PT") : <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {credito.documentos && Object.keys(credito.documentos).length > 0 ? (
                      // Simplesmente lista o tipo, implementar download/link futuramente
                      <span className="text-blue-700 underline cursor-pointer">Ver documento</span>
                    ) : (
                      <span className="text-muted-foreground italic">—</span>
                    )}
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

export default CreditosSection;
