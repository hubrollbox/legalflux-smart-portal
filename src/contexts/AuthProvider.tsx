import React, { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { AuthContext, UserData, AuthContextType } from './AuthContext';
import type { User, Session } from '@supabase/supabase-js';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData?: UserData) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      // handle error
    }
  };

  // RBAC: role extraído do user_metadata (Supabase) ou session
  const role = user?.user_metadata?.role || session?.user?.user_metadata?.role || null;
  // Utilitário para verificar permissões (pode crescer depois)
  const hasPermission = (permission: string) => {
    if (role === 'admin') return true;
    if (role === 'advogado') return permission !== 'admin';
    if (role === 'assistente') return permission === 'view';
    if (role === 'cliente') return permission === 'view';
    return false;
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    role,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
