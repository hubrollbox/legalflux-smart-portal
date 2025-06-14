
import { supabase } from '@/integrations/supabase/client';

// Função para buscar contratos - comentada pois a tabela 'contracts' não existe
export const fetchContracts = async ({ pageParam = 0 }) => {
  // A tabela 'contracts' não existe no banco de dados atual
  // Retornando array vazio por enquanto
  return [];
  
  // const { data, error } = await supabase
  //   .from('contracts')
  //   .select('*')
  //   .range(pageParam * 10, pageParam * 10 + 9);

  // if (error) {
  //   throw new Error(error.message);
  // }

  // return data;
};

// Função para buscar template - comentada pois a tabela 'templates' não existe
export async function getTemplate(templateId: string, userId: string) {
  // A tabela 'templates' não existe no banco de dados atual
  // Retornando null por enquanto
  return null;
  
  // const { data: template } = await supabase
  //   .from('templates')
  //   .select('*')
  //   .eq('id', templateId)
  //   .eq('owner_id', userId) // Verifica se o usuário é o dono
  //   .single();
  // if (!template) {
  //   throw new Error('Acesso negado ao template.');
  // }
  // return template;
}

// Função para buscar contratos do usuário - comentada pois a tabela 'contracts' não existe
export async function getUserContracts(userId: string) {
  // A tabela 'contracts' não existe no banco de dados atual
  // Retornando objeto com data vazia por enquanto
  return { data: [], error: null };
  
  // return supabase
  //   .from('contracts')
  //   .select('id, title, status') // Remove 'parties'
  //   .eq('user_id', userId);
}
