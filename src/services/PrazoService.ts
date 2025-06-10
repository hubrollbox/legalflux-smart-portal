// PrazoService.ts
// CRUD for deadlines (prazos) using Supabase
import { supabase } from '@/integrations/supabase';

export interface Prazo {
  id?: string;
  titulo: string;
  descricao?: string;
  dataVencimento: string;
  processoId?: string;
  clienteId?: string;
  responsavelId?: string;
  alertaAntecedenciaDias?: number;
  criadoEm?: string;
  atualizadoEm?: string;
}

const TABLE = 'prazos';

export const PrazoService = {
  async list() {
    const { data, error } = await supabase.from(TABLE).select('*').order('dataVencimento', { ascending: true });
    if (error) throw error;
    return data as Prazo[];
  },
  async get(id: string) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    return data as Prazo;
  },
  async create(prazo: Prazo) {
    const { data, error } = await supabase.from(TABLE).insert([prazo]).select().single();
    if (error) throw error;
    return data as Prazo;
  },
  async update(id: string, prazo: Partial<Prazo>) {
    const { data, error } = await supabase.from(TABLE).update(prazo).eq('id', id).select().single();
    if (error) throw error;
    return data as Prazo;
  },
  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
