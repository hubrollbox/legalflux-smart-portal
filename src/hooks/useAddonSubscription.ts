
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/useAuth";

export function useAddonSubscription(addon: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["addon-assinatura", addon, user?.id],
    enabled: !!user && !!addon,
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .from("addons_assinaturas")
        .select("id,plano,ativo")
        .eq("user_id", user.id)
        .eq("addon", addon)
        .eq("ativo", true)
        .maybeSingle();
      if (error) throw error;
      return !!(data && data.ativo);
    }
  });
}
