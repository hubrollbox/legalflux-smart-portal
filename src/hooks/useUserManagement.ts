
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ExtendedUser {
  id: string;
  email: string;
  role: 'cliente' | 'advogado' | 'assistente' | 'admin';
  status: 'pending' | 'approved' | 'suspended' | 'cancelled';
  nome: string | null;
  telefone: string | null;
  nif: string | null;
  numero_profissional: string | null;
  morada: string | null;
  dados_faturacao: any;
  metodo_pagamento: string | null;
  criado_por: string | null;
  data_criacao: string;
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [pendingUsers, setPendingUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUsers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users_extended')
        .select('*')
        .order('data_criacao', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
      setPendingUsers((data || []).filter(u => u.status === 'pending'));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os utilizadores.",
        variant: "destructive"
      });
    }
  };

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
        description: "Não foi possível aprovar o utilizador.",
        variant: "destructive"
      });
    }
  };

  const createUser = async (userData: {
    email: string;
    nome: string;
    role: 'cliente' | 'assistente';
    telefone?: string;
    nif?: string;
  }) => {
    if (!user) return null;

    try {
      // Criar utilizador no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        email_confirm: true,
        user_metadata: {
          nome: userData.nome,
          role: userData.role
        }
      });

      if (authError) throw authError;

      // Criar entrada na tabela users_extended
      const { data, error } = await supabase
        .from('users_extended')
        .insert([{
          id: authData.user.id,
          email: userData.email,
          role: userData.role,
          status: 'approved',
          nome: userData.nome,
          telefone: userData.telefone || null,
          nif: userData.nif || null,
          criado_por: user.id
        }])
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
        description: "Não foi possível criar o utilizador.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateUserStatus = async (userId: string, status: ExtendedUser['status']) => {
    try {
      const { error } = await supabase
        .from('users_extended')
        .update({ status })
        .eq('id', userId);

      if (error) throw error;

      await fetchUsers();
      toast({
        title: "Sucesso",
        description: "Status do utilizador atualizado com sucesso!"
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do utilizador.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };

    loadUsers();
  }, [user]);

  return {
    users,
    pendingUsers,
    loading,
    approveUser,
    createUser,
    updateUserStatus,
    refetch: fetchUsers
  };
};
