
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useUserAddonsAssinaturas } from "@/hooks/useUserAddonsAssinaturas";
import { useState } from "react";

function getStatusLabel(ativo: boolean, data_finalizacao?: string) {
  if (ativo) return <Badge variant="default" className="bg-green-500">Ativo</Badge>;
  if (data_finalizacao) return <Badge variant="destructive" className="bg-gray-400">Expirado</Badge>;
  return <Badge variant="secondary">Inativo</Badge>;
}

export default function SubscricoesTable() {
  const { data, isLoading, error } = useUserAddonsAssinaturas();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function terminarAssinatura(id: string) {
    // Segurança extra: early return se não houver utilizador autenticado
    if (!user?.id) {
      console.warn("Tentativa de terminar assinatura sem utilizador autenticado. Abortar operação por segurança.");
      toast({ title: "Erro de autenticação", description: "É necessário iniciar sessão para terminar subscrições.", variant: "destructive" });
      return;
    }
    setLoadingId(id);
    const { error } = await supabase
      .from("addons_assinaturas")
      .update({ ativo: false, data_finalizacao: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id); // check sempre presente
    setLoadingId(null);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível terminar esta subscrição.", variant: "destructive" });
    } else {
      toast({ title: "Subscrição terminada", description: "O add-on foi desativado." });
      queryClient.invalidateQueries({ queryKey: ["user-addon-assinaturas"] });
    }
  }

  if (isLoading) {
    return <div className="text-gray-500 p-4">A carregar subscrições...</div>;
  }
  if (error) {
    return <div className="text-red-600 p-4">Erro ao carregar subscrições.</div>;
  }
  if (!data?.length) {
    return (
      <div className="p-8 text-center text-neutral-700 border rounded-xl shadow-sm max-w-xl mx-auto bg-white" tabIndex={0}>
        <p>Não existem add-ons/subscrições em curso nesta conta.</p>
        <a
          href="/integracoes"
          className="inline-block mt-4 text-accent-700 font-bold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="Ir para integrações (novo separador)"
        >
          Ative o seu primeiro add-on
          <svg xmlns="http://www.w3.org/2000/svg" className="inline ml-1" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    );
  }
  // Checagem de paginação/lazy
  const showPaginationNotice = data.length > 15;
  return (
    <div className="overflow-x-auto" tabIndex={0} aria-label="Tabela de subscrições. Use tab para navegar células.">
      {showPaginationNotice && (
        <div className="mb-2 text-xs text-orange-600" role="alert">
          ⚠️ Muitas subscrições encontradas. Considere implementar paginação/lazy loading.
        </div>
      )}
      <table className="min-w-full text-sm border rounded-xl shadow bg-white" tabIndex={0}>
        <thead>
          <tr>
            <th className="font-medium px-4 py-2 text-left text-gray-900" tabIndex={0}>Add-on</th>
            <th className="font-medium px-4 py-2 text-left text-gray-900" tabIndex={0}>Plano</th>
            <th className="font-medium px-4 py-2 text-left text-gray-900" tabIndex={0}>Data Ativação</th>
            <th className="font-medium px-4 py-2 text-left text-gray-900" tabIndex={0}>Data Fim</th>
            <th className="font-medium px-4 py-2" tabIndex={0}>Estado</th>
            <th className="font-medium px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((a: any, rowIdx: number) => (
            <tr key={a.id} className="border-b" tabIndex={0} aria-label={`Linha ${rowIdx + 1}: ${a.addon}, plano ${a.plano ?? '-'}, estado ${a.ativo ? 'ativo' : 'inativo'}`}>
              <td className="px-4 py-2">{a.addon}</td>
              <td className="px-4 py-2 capitalize">{a.plano ?? "-"}</td>
              <td className="px-4 py-2">{a.data_ativacao ? new Date(a.data_ativacao).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-2">{a.data_finalizacao ? new Date(a.data_finalizacao).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-2">{getStatusLabel(a.ativo, a.data_finalizacao)}</td>
              <td className="px-4 py-2 text-center">
                {a.ativo && (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={loadingId === a.id}
                    onClick={() => terminarAssinatura(a.id)}
                    tabIndex={0}
                    aria-label={`Terminar subscrição de ${a.addon}`}
                  >
                    {loadingId === a.id ? "A terminar..." : "Terminar"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

