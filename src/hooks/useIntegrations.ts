import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

// Tipagem para configuração OAuth
export interface OAuthConfig {
  auth_url: string;
  token_url: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  scope?: string;
  response_type?: string;
  [key: string]: unknown;
}

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
  oauth_config: OAuthConfig | null;
}

export const useIntegrations = () => {
  const [userIntegrations, setUserIntegrations] = useState<UserIntegration[]>([]);
  const [availableIntegrations, setAvailableIntegrations] = useState<AvailableIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Função mock para simular status e last_sync
  const enrichIntegration = useCallback((integration: UserIntegration): UserIntegration => {
    // Simulação: status alterna entre 'ativo', 'pendente', 'erro' com base no id
    const statusOptions = ['ativo', 'pendente', 'erro'] as const;
    const status = statusOptions[Math.abs(hashCode(integration.id)) % statusOptions.length];
    // Simulação: last_sync é uma data recente
    const last_sync = new Date(Date.now() - Math.abs(hashCode(integration.id)) % 86400000).toISOString();
    return {
      ...integration,
      status,
      last_sync
    };
  }, []);

  const fetchUserIntegrations = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Ajustar o mapeamento para refletir apenas os campos realmente existentes na tabela user_integrations
      const mappedData: UserIntegration[] = (data || []).map(item => enrichIntegration({
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
  }, [user, toast, enrichIntegration]);

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
        oauth_config: item.oauth_config && typeof item.oauth_config === 'object' && item.oauth_config !== null && !Array.isArray(item.oauth_config)
          ? item.oauth_config as OAuthConfig
          : null,
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

  // Inicia o fluxo OAuth redirecionando para o provedor
  const startOAuthFlow = async (integrationType: string) => {
    // Busca a integração disponível para obter o endpoint de autorização
    const integration = availableIntegrations.find(i => i.type === integrationType);
    if (!integration || !integration.oauth_config) {
      toast({
        title: "Erro",
        description: "Configuração OAuth não encontrada para esta integração.",
        variant: "destructive"
      });
      return;
    }
    // Exemplo de construção da URL de autorização (ajuste conforme o provedor)
    const { auth_url, client_id, redirect_uri, scope, response_type } = integration.oauth_config || {};
    if (!auth_url || !client_id || !redirect_uri) {
      toast({
        title: "Erro",
        description: "Parâmetros obrigatórios ausentes na configuração OAuth.",
        variant: "destructive"
      });
      return;
    }
    const state = Math.random().toString(36).substring(2); // Pode salvar no localStorage/sessionStorage para validação posterior
    const url = `${auth_url}?client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${encodeURIComponent(response_type || 'code')}&scope=${encodeURIComponent(scope || '')}&state=${state}`;
    window.location.href = url;
  };

  // Lida com o callback OAuth, troca o código por tokens e salva em credentials
  const handleOAuthCallback = async (integrationType: string, query: Record<string, string>) => {
    if (!user) return null;
    // Espera-se que query contenha ?code=...&state=...
    const code = query.code;
    if (!code) {
      toast({
        title: "Erro",
        description: "Código de autorização não encontrado no callback.",
        variant: "destructive"
      });
      return null;
    }
    // Busca a integração disponível para obter o endpoint de token
    const integration = availableIntegrations.find(i => i.type === integrationType);
    if (!integration || !integration.oauth_config) {
      toast({
        title: "Erro",
        description: "Configuração OAuth não encontrada para esta integração.",
        variant: "destructive"
      });
      return null;
    }
    const { token_url, client_id, client_secret, redirect_uri, ...extraConfig } = integration.oauth_config || {};
    if (!token_url || !client_id || !client_secret || !redirect_uri) {
      toast({
        title: "Erro",
        description: "Parâmetros obrigatórios ausentes na configuração OAuth.",
        variant: "destructive"
      });
      return null;
    }
    try {
      // Chamar Edge Function para efetuar token exchange seguro
      const resp = await fetch(
        "https://iibvdqcwycrcyskxvsgu.supabase.co/functions/v1/oauth_token_exchange",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token_url,
            code,
            client_id,
            client_secret,
            redirect_uri,
            extra: { ...extraConfig }
          }),
        }
      );
      const tokens = await resp.json();
      if (!resp.ok || tokens.error) {
        toast({
          title: "Erro",
          description: tokens.error || "Não foi possível concluir a integração OAuth.",
          variant: "destructive"
        });
        return null;
      }
      await addIntegration({
        integration_type: integrationType,
        name: integration.name,
        credentials: tokens
      });
      toast({
        title: "Sucesso",
        description: "Integração OAuth concluída com sucesso!"
      });
      return tokens;
    } catch (error) {
      console.error('Erro no callback OAuth:', error);
      toast({
        title: "Erro",
        description: "Não foi possível concluir a integração OAuth.",
        variant: "destructive"
      });
      return null;
    }
  };

  function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

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

  // RBAC: bloqueia métodos sensíveis para quem não tem permissão
  const { hasPermission } = useAuth();

  // Wrapper para métodos sensíveis
  const canManageIntegrations = hasPermission?.('manage_integrations');

  const addIntegrationRBAC = async (...args: Parameters<typeof addIntegration>) => {
    if (!canManageIntegrations) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para adicionar integrações.',
        variant: 'destructive'
      });
      return null;
    }
    return addIntegration(...args);
  };

  const updateIntegrationRBAC = async (...args: Parameters<typeof updateIntegration>) => {
    if (!canManageIntegrations) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para editar integrações.',
        variant: 'destructive'
      });
      return;
    }
    return updateIntegration(...args);
  };

  const removeIntegrationRBAC = async (...args: Parameters<typeof removeIntegration>) => {
    if (!canManageIntegrations) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para remover integrações.',
        variant: 'destructive'
      });
      return;
    }
    return removeIntegration(...args);
  };

  return {
    userIntegrations,
    availableIntegrations,
    loading,
    addIntegration: addIntegrationRBAC,
    updateIntegration: updateIntegrationRBAC,
    removeIntegration: removeIntegrationRBAC,
    refetch: fetchUserIntegrations,
    startOAuthFlow,
    handleOAuthCallback
  };
};
