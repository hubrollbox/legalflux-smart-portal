import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ExtendedUser {
  id: string;
  email: string;
  role: 'cliente' | 'assistente' | 'advogado' | 'admin';
  status: 'pending' | 'approved' | 'suspended' | 'cancelled';
  nome: string | null;
  telefone: string | null;
  nif: string | null;
  numero_profissional: string | null;
  morada: string | null;
  dados_faturacao: unknown;
  metodo_pagamento: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  criado_por: string | null;
  data_criacao: string;
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [pendingUsers, setPendingUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('users_extended')
        .select('*')
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      
      // Map data to ensure type compatibility
      const mappedData: ExtendedUser[] = (data || []).map(item => ({
        ...item,
        role: item.role as ExtendedUser['role'],
        status: item.status as ExtendedUser['status'],
        dados_faturacao: typeof item.dados_faturacao === 'object' && item.dados_faturacao !== null ? item.dados_faturacao : null
      }));
      
      setUsers(mappedData);
      setPendingUsers(mappedData.filter(u => u.status === 'pending'));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar utilizadores.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const approveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users_extended')
        .update({ status: 'approved' })
        .eq('id', userId);

      if (error) throw error;

      await fetchUsers();
      toast({
        title: "Sucesso",
        description: "Utilizador aprovado com sucesso!"
      });
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        title: "Erro",
        description: "Erro ao aprovar utilizador.",
        variant: "destructive"
      });
    }
  };

  const createUser = async (userData: {
    email: string;
    nome: string;
    role: ExtendedUser['role'];
    telefone?: string;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('users_extended')
        .insert([
          {
            ...userData,
            status: 'approved',
            criado_por: user.id,
            id: crypto.randomUUID(), // Gera um id único para o novo usuário
            dados_faturacao: null,
            data_criacao: new Date().toISOString(),
            metodo_pagamento: null,
            morada: null,
            nif: null,
            numero_profissional: null,
            stripe_customer_id: null,
            stripe_subscription_id: null
          }
        ])
        .select()
        .single();

      if (error) throw error;

      await fetchUsers();
      toast({
        title: "Sucesso",
        description: "Utilizador criado com sucesso!"
      });

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar utilizador.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchUsers();
    setLoading(false);
  }, [fetchUsers]);

  return {
    users,
    pendingUsers,
    loading,
    approveUser,
    createUser,
    refetch: fetchUsers
  };
};
