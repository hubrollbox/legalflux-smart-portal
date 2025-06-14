
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Mantém o estado global de sessão/autenticação sincronizado com o Supabase Auth.
 */
export function useSupabaseAuthListener() {
  const store = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    // Listener para eventos auth (login/logout etc)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      store.setLoading(false);
      store.setUser(session?.user ?? null, session ?? null);
    });

    unsubscribe = authListener?.subscription?.unsubscribe;

    // Ao montar, faz bootstrap do estado (primeira renderização)
    supabase.auth.getSession().then(({ data: { session } }) => {
      store.setUser(session?.user ?? null, session ?? null);
      store.setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [store]);
}
