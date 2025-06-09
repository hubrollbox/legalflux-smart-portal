import { createContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';

export interface UserData {
  nome?: string;
  telefone?: string;
  tipo?: string;
  nif?: string;
  numero_profissional?: string;
  morada?: string;
  metodo_pagamento?: string;
  dados_empresa?: {
    nome_empresa?: string;
    setor?: string;
  };
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: unknown }>;
  signUp: (email: string, password: string, userData?: UserData) => Promise<{ error: unknown }>;
  signOut: () => Promise<void>;
  // RBAC: role e método de verificação de permissão
  role?: string | null;
  hasPermission?: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
