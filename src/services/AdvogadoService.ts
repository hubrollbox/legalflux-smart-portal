import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function fetchAdvogados() {
  const { data, error } = await supabase
    .from('users_extended')
    .select('id, nome')
    .eq('role', 'advogado')
    .order('nome', { ascending: true });
  if (error) throw error;
  return data;
}
