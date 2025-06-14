// NÃO USAR MAIS ESTE PROVIDER, VER DOCUMENTAÇÃO!
// Pode remover toda a lógica de contexto. Zustand cuida do estado.
import React, { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { AuthContext, UserData, AuthContextType } from './AuthContext';
import type { User, Session } from '@supabase/supabase-js';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // Helper para buscar o papel do user a partir do backend oficial
  const fetchUserRole = async (userId: string | undefined) => {
    if (!userId) {
      setRole(null);
      return;
    }
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    if (error || !data?.role) {
      setRole(null);
    } else {
      setRole(data.role);
    }
  };

  useEffect(() => {
    // Ouvinte de login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        // Atualiza role sempre que mudar a sessão/usuário
        if (session?.user?.id) {
          fetchUserRole(session.user.id);
        } else {
          setRole(null);
        }
      }
    );
    // Checar sessão persistida
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user?.id) {
        fetchUserRole(session.user.id);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cada vez que o user muda, refaz o fetch do role
  useEffect(() => {
    if (user?.id) {
      fetchUserRole(user.id);
    } else {
      setRole(null);
    }
  }, [user?.id]);

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
      setRole(null);
    } catch (error) {
      // handle error
    }
  };

  // Utilitário para verificar permissões (pode crescer depois)
  const hasPermission = (permission: string) => {
    if (role === 'admin') return true;
    if (role === 'jurista' || role === 'advogado' || role === 'advogado_senior') return permission !== 'admin';
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
