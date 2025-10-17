// FinanceiroService.ts
// CRUD para contas a pagar/receber, faturas e pagamentos
import { supabase } from '@/integrations/supabase/client';

export interface ContaFinanceira {
  id?: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  dataVencimento: string;
  processoId?: string;
  clienteId?: string;
  criadoEm?: string;
}

const TABLE = 'transacoes';

export const FinanceiroService = {
  async list(filtro: Partial<ContaFinanceira> = {}) {
    let query = supabase.from(TABLE).select('*');
    if (filtro.processoId) query = query.eq('caso_id', filtro.processoId);
    if (filtro.tipo) query = query.eq('tipo', filtro.tipo);
    if (filtro.clienteId) query = query.eq('cliente_id', filtro.clienteId);
    if (filtro.dataVencimento) query = query.gte('data_transacao', filtro.dataVencimento);
    const { data, error } = await query.order('data_transacao', { ascending: true });
    if (error) throw error;
    return (data || []).map((row: {
      id: string;
      descricao: string;
      valor: number;
      tipo: string;
      data_transacao: string;
      caso_id?: string;
      cliente_id?: string;
    }) => ({
      id: row.id,
      descricao: row.descricao,
      valor: row.valor,
      tipo: row.tipo === 'receita' || row.tipo === 'despesa' ? row.tipo : 'receita', // Default to 'receita' if invalid
      dataVencimento: row.data_transacao,
      processoId: row.caso_id,
      clienteId: row.cliente_id,
    }));
  },
  async get(id: string) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) throw new Error('Transação não encontrada');
    return {
      id: data.id,
      descricao: data.descricao,
      valor: data.valor,
      tipo: data.tipo === 'receita' || data.tipo === 'despesa' ? data.tipo : 'receita', // Default to 'receita' if invalid
      dataVencimento: data.data_transacao,
      processoId: data.caso_id,
      clienteId: data.cliente_id,
      criadoEm: data.created_at,
    };
  },
  async create(conta: ContaFinanceira) {
    const insertData = {
      descricao: conta.descricao,
      valor: conta.valor,
      tipo: conta.tipo,
      data_transacao: conta.dataVencimento,
      caso_id: conta.processoId,
      cliente_id: conta.clienteId,
    };
    const { data, error } = await supabase.from(TABLE).insert([insertData]).select().single();
    if (error) throw error;
    if (!data) throw new Error('Erro ao criar transação');
    return {
      id: data.id,
      descricao: data.descricao,
      valor: data.valor,
      tipo: data.tipo === 'receita' || data.tipo === 'despesa' ? data.tipo : 'receita', // Default to 'receita' if invalid
      dataVencimento: data.data_transacao,
      processoId: data.caso_id,
      clienteId: data.cliente_id,
    };
  },
};
