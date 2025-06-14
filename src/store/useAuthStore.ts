
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
  setUser: (user: User | null, session: Session | null) => void;
  setRole: (role: string | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      role: null,
      loading: true,
      setUser: (user, session) => set({ user, session }),
      setRole: (role) => set({ role }),
      setLoading: (loading) => set({ loading }),
      clear: () => set({ user: null, session: null, role: null, loading: false }),
    }),
    { name: "auth-store" }
  )
);
