
// ConflictService.ts
// Serviço para gestão de conflitos de interesse
import { supabase } from '@/integrations/supabase/client';

export interface Conflict {
  id?: string;
  entity_id: string;
  case_id: string;
  reason: string;
  resolved?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Toda referência a 'conflitos' pode não existir no tipo gerado do Supabase
const TABLE = 'conflitos';

export const ConflictService = {
  async list(filtro: Partial<Conflict> = {}) {
    let query = supabase.from(TABLE).select('*');
    if (filtro.entity_id) query = query.eq('entity_id', filtro.entity_id);
    if (filtro.case_id) query = query.eq('case_id', filtro.case_id);
    if (filtro.resolved !== undefined) query = query.eq('resolved', filtro.resolved);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    // Defensive: reta os dados para Conflict[]
    return Array.isArray(data)
      ? data.filter((item): item is Conflict => typeof item.entity_id === 'string' && typeof item.case_id === 'string' && typeof item.reason === 'string')
      : [];
  },
  async create(conflict: Omit<Conflict, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from(TABLE).insert([conflict]).select().single();
    if (error) throw error;
    // Defensive: valida tipo
    if (data && typeof data.entity_id === 'string' && typeof data.case_id === 'string' && typeof data.reason === 'string') {
      return data as Conflict;
    }
    throw new Error('Conflito inserido não possui campos mínimos.');
  },
  async resolve(id: string) {
    const { data, error } = await supabase.from(TABLE).update({ resolved: true, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    // Defensive: valida tipo
    if (data && typeof data.entity_id === 'string' && typeof data.case_id === 'string' && typeof data.reason === 'string') {
      return data as Conflict;
    }
    throw new Error('Conflito atualizado não possui campos mínimos.');
  },
};
