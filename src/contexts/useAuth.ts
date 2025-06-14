
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/useAuthStore";
import { useSupabaseAuthListener } from "./hooks/useSupabaseAuthListener";

// Função para verificar permissões baseada no papel atual
const getHasPermission = (role: string | null) => (permission: string) => {
  if (role === "admin") return true;
  if (role === "jurista" || role === "advogado" || role === "advogado_senior")
    return permission !== "admin";
  if (role === "assistente" || role === "cliente")
    return permission === "view";
  return false;
};

export const useAuth = () => {
  const store = useAuthStore();
  useSupabaseAuthListener();
  const hasPermission = getHasPermission(store.role);

  return {
    user: store.user,
    session: store.session,
    role: store.role,
    loading: store.loading,
    setUser: store.setUser,
    setRole: store.setRole,
    setLoading: store.setLoading,
    clear: store.clear,
    hasPermission, // Disponível no hook
    signIn: async (email: string, password: string) => {
      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
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
    },
  };
};
