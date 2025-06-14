
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DividaMassa } from "@/integrations/supabase/insolvencyTypes";

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

  return (
    <div>
      <div className="font-semibold mb-2">Dívidas da Massa:</div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DividasMassaSection;

