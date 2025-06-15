
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/useAuth";

// Retorna todas as subscrições de add-ons do utilizador autenticado
export function useUserAddonsAssinaturas() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user-addon-assinaturas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("addons_assinaturas")
        .select("id,addon,plano,ativo,data_ativacao,data_finalizacao")
        .eq("user_id", user.id)
        .order("data_ativacao", { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });
}
