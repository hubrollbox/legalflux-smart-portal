import { createClient } from '@supabase/supabase-js';
import { ConflictService } from './ConflictService';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function fetchProcessos(page = 1, limit = 5) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from('processos')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data, total: count || 0 };
}

export async function addProcesso(processo) {
  // Verificação automática de conflito
  if (processo.clienteId) {
    const conflicts = await ConflictService.list({ entity_id: processo.clienteId, resolved: false });
    if (conflicts.length > 0) {
      throw new Error('Conflito de interesse detectado para este cliente. Processo não pode ser criado até resolução.');
    }
  }
  const { data, error } = await supabase
    .from('processos')
    .insert([processo])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function updateProcesso(id, updates) {
  const { data, error } = await supabase
    .from('processos')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteProcesso(id) {
  const { error } = await supabase
    .from('processos')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

export const ProcessoService = {
  fetchProcessos,
  addProcesso,
  updateProcesso,
  deleteProcesso,
};
