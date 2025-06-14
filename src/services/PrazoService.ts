
// PrazoService.ts
// Funções de CRUD para prazos (mock enquanto não existe tabela real no Supabase)

import { supabase } from '@/integrations/supabase/client';

// Definição da interface Prazo (mantém a mesma)
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

// Nome da tabela que NÃO EXISTE ainda na tipagem do Supabase
const TABLE = 'prazos';

export const PrazoService = {
  // Buscar todos os prazos (mock)
  async list(): Promise<Prazo[]> {
    // Não existe fallback para consultas reais no momento!
    // const { data, error } = await supabase.from(TABLE).select('*').order('dataVencimento', { ascending: true });
    // if (error) throw error;
    // return data as Prazo[];
    return [];
  },
  // Buscar 1 prazo por id (mock)
  async get(id: string): Promise<Prazo | null> {
    // const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    // if (error) throw error;
    // return data as Prazo;
    return null;
  },
  // Criar novo prazo (mock)
  async create(prazo: Prazo): Promise<Prazo> {
    // const { data, error } = await supabase.from(TABLE).insert([prazo]).select().single();
    // if (error) throw error;
    // return data as Prazo;
    return { ...prazo, id: Date.now().toString() };
  },
  // Atualizar prazo (mock)
  async update(id: string, prazo: Partial<Prazo>): Promise<Prazo> {
    // const { data, error } = await supabase.from(TABLE).update(prazo).eq('id', id).select().single();
    // if (error) throw error;
    // return data as Prazo;
    return { ...prazo, id } as Prazo;
  },
  // Remover prazo (mock)
  async remove(id: string): Promise<boolean> {
    // const { error } = await supabase.from(TABLE).delete().eq('id', id);
    // if (error) throw error;
    return true;
  },
};

// ATENÇÃO: Para acessar dados reais, é necessário criar a tabela 'prazos' no Supabase
// e REGISTRAR os tipos no arquivo src/integrations/supabase/types.ts
