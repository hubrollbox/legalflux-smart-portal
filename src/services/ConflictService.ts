
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
    // Força o tipo da tabela como any para evitar erro de tipagem do SDK
    let query = (supabase.from as any)(TABLE).select('*');
    if (filtro.entity_id) query = query.eq('entity_id', filtro.entity_id);
    if (filtro.case_id) query = query.eq('case_id', filtro.case_id);
    if (typeof filtro.resolved === "boolean") query = query.eq('resolved', filtro.resolved);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data)
      ? data.filter((item: any): item is Conflict =>
        typeof item.entity_id === 'string' &&
        typeof item.case_id === 'string' &&
        typeof item.reason === 'string'
      )
      : [];
  },
  async create(conflict: Omit<Conflict, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await (supabase.from as any)(TABLE).insert([conflict]).select().single();
    if (error) throw error;
    if (data && typeof data.entity_id === 'string' && typeof data.case_id === 'string' && typeof data.reason === 'string') {
      return data as Conflict;
    }
    throw new Error('Conflito inserido não possui campos mínimos.');
  },
  async resolve(id: string) {
    const { data, error } = await (supabase.from as any)(TABLE).update({ resolved: true, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    if (data && typeof data.entity_id === 'string' && typeof data.case_id === 'string' && typeof data.reason === 'string') {
      return data as Conflict;
    }
    throw new Error('Conflito atualizado não possui campos mínimos.');
  },
};
