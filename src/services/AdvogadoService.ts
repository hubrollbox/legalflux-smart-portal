
import { supabase } from '@/integrations/supabase/client';

export async function fetchAdvogados() {
  const { data, error } = await supabase
    .from('users_extended')
    .select('id, nome')
    .eq('role', 'advogado')
    .order('nome', { ascending: true });
  if (error) throw error;
  return data;
}
