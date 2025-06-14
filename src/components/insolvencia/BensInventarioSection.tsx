
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BemInventario } from "@/integrations/supabase/insolvencyTypes";

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

  return (
    <div>
      <div className="font-semibold mb-2">Inventário de Bens:</div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BensInventarioSection;

