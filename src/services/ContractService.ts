import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchContracts = async ({ pageParam = 0 }) => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .range(pageParam * 10, pageParam * 10 + 9);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export async function getTemplate(templateId: string, userId: string) {
  const { data: template } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .eq('owner_id', userId) // Verifica se o usuário é o dono
    .single();
  if (!template) {
    throw new Error('Acesso negado ao template.');
  }
  return template;
}

export async function getUserContracts(userId: string) {
  return supabase
    .from('contracts')
    .select('id, title, status') // Remove 'parties'
    .eq('user_id', userId);
}
