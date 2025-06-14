
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  // Hook que retorna estado e setters de auth
  const store = useAuthStore();
  return {
    user: store.user,
    session: store.session,
    role: store.role,
    loading: store.loading,
    setUser: store.setUser,
    setRole: store.setRole,
    setLoading: store.setLoading,
    clear: store.clear,
    // Métodos abaixo espelham o contexto antigo ↓↓↓
    signIn: async (email: string, password: string) => {
      try {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          store.setUser(data.user, data.session);
        }
        return { error };
      } catch (error) {
        return { error };
      }
    },
    signUp: async (email: string, password: string, userData?: any) => {
      try {
        const redirectUrl = `${window.location.origin}/`;
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl, data: userData },
        });
        if (!error && data?.user) {
          store.setUser(data.user, data.session);
        }
        return { error };
      } catch (error) {
        return { error };
      }
    },
    signOut: async () => {
      await supabase.auth.signOut();
      store.clear();
    }
  };
};
