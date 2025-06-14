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

// Ajuste para ignorar erro de tipagem, caso a tabela 'conflitos' não exista nas tipagens do SDK.
// @ts-expect-error: Tabela 'conflitos' pode não constar na tipagem gerada do SDK
const TABLE = 'conflitos';

export const ConflictService = {
  async list(filtro: Partial<Conflict> = {}) {
    // @ts-expect-error
    let query = supabase.from(TABLE).select('*');
    if (filtro.entity_id) query = query.eq('entity_id', filtro.entity_id);
    if (filtro.case_id) query = query.eq('case_id', filtro.case_id);
    if (filtro.resolved !== undefined) query = query.eq('resolved', filtro.resolved);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data as Conflict[];
  },
  async create(conflict: Omit<Conflict, 'id' | 'created_at' | 'updated_at'>) {
    // @ts-expect-error
    const { data, error } = await supabase.from(TABLE).insert([conflict]).select().single();
    if (error) throw error;
    return data as Conflict;
  },
  async resolve(id: string) {
    // @ts-expect-error
    const { data, error } = await supabase.from(TABLE).update({ resolved: true, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data as Conflict;
  },
};
