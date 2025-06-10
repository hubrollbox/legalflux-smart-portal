// FinanceiroService.ts
// CRUD para contas a pagar/receber, faturas e pagamentos
import { supabase } from '@/integrations/supabase';

export interface ContaFinanceira {
  id?: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  status: 'pago' | 'pendente';
  dataVencimento: string;
  dataPagamento?: string;
  processoId?: string;
  clienteId?: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

const TABLE = 'contas_financeiras';

export const FinanceiroService = {
  async list(filtro: Partial<ContaFinanceira> = {}) {
    let query = supabase.from(TABLE).select('*');
    if (filtro.processoId) query = query.eq('processoId', filtro.processoId);
    if (filtro.tipo) query = query.eq('tipo', filtro.tipo);
    if (filtro.status) query = query.eq('status', filtro.status);
    if (filtro.clienteId) query = query.eq('clienteId', filtro.clienteId);
    if (filtro.dataVencimento) query = query.gte('dataVencimento', filtro.dataVencimento);
    const { data, error } = await query.order('dataVencimento', { ascending: true });
    if (error) throw error;
    return data as ContaFinanceira[];
  },
  async get(id: string) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    return data as ContaFinanceira;
  },
  async create(conta: ContaFinanceira) {
    const { data, error } = await supabase.from(TABLE).insert([conta]).select().single();
    if (error) throw error;
    return data as ContaFinanceira;
  },
  async update(id: string, conta: Partial<ContaFinanceira>) {
    const { data, error } = await supabase.from(TABLE).update(conta).eq('id', id).select().single();
    if (error) throw error;
    return data as ContaFinanceira;
  },
  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
