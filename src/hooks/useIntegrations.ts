import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

// Ajustar o tipo UserIntegration para refletir apenas os campos realmente existentes na tabela user_integrations
export interface UserIntegration {
  id: string;
  user_id: string;
  integration_type: string;
  credentials: Json | null;
  created_at: string | null;
  updated_at: string | null;
  // Os campos abaixo são mockados para compatibilidade de UI, mas não existem no banco
  name?: string;
  status?: 'ativo' | 'inativo' | 'erro' | 'pendente';
  last_sync?: string | null;
  config?: Json;
}

export interface AvailableIntegration {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  icon_url: string | null;
  documentation_url: string | null;
  is_active: boolean;
  oauth_config: Json;
}

export const useIntegrations = () => {
  const [userIntegrations, setUserIntegrations] = useState<UserIntegration[]>([]);
  const [availableIntegrations, setAvailableIntegrations] = useState<AvailableIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserIntegrations = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Ajustar o mapeamento para refletir apenas os campos realmente existentes na tabela user_integrations
      const mappedData: UserIntegration[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        integration_type: item.integration_type,
        credentials: item.credentials ?? {},
        created_at: item.created_at ?? '',
        updated_at: item.updated_at ?? ''
      }));
      
      setUserIntegrations(mappedData);
    } catch (error) {
      console.error('Error fetching user integrations:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as suas integrações.",
        variant: "destructive"
      });
    }
  }, [user, toast]);

  const fetchAvailableIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('available_integrations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setAvailableIntegrations((data || []).map(item => ({
        ...item,
        oauth_config: item.oauth_config ?? {},
      })));
    } catch (error) {
      console.error('Error fetching available integrations:', error);
    }
  };

  const addIntegration = async (integrationData: {
    integration_type: string;
    name: string;
    credentials: Json;
    config?: Json;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .insert([
          {
            ...integrationData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      await fetchUserIntegrations();
      toast({
        title: "Sucesso",
        description: "Integração adicionada com sucesso!"
      });

      return data;
    } catch (error) {
      console.error('Error adding integration:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a integração.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateIntegration = async (id: string, updates: Partial<UserIntegration>) => {
    try {
      const { error } = await supabase
        .from('user_integrations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchUserIntegrations();
      toast({
        title: "Sucesso",
        description: "Integração atualizada com sucesso!"
      });
    } catch (error) {
      console.error('Error updating integration:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a integração.",
        variant: "destructive"
      });
    }
  };

  const removeIntegration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_integrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchUserIntegrations();
      toast({
        title: "Sucesso",
        description: "Integração removida com sucesso!"
      });
    } catch (error) {
      console.error('Error removing integration:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a integração.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserIntegrations(),
        fetchAvailableIntegrations()
      ]);
      setLoading(false);
    };

    loadData();
  }, [user, fetchUserIntegrations]);

  return {
    userIntegrations,
    availableIntegrations,
    loading,
    addIntegration,
    updateIntegration,
    removeIntegration,
    refetch: fetchUserIntegrations
  };
};
