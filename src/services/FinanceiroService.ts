
// FinanceiroService.ts
// CRUD para contas a pagar/receber, faturas e pagamentos
import { supabase } from '@/integrations/supabase/client';

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
  metodo_pagamento?: string;
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
    // Map Supabase fields to ContaFinanceira
    return (data || []).map((row: any) => ({
      id: row.id,
      descricao: row.descricao,
      valor: row.valor,
      tipo: row.tipo,
      status: 'pendente', // Default status since it doesn't exist in DB
      dataVencimento: row.data_transacao || '',
      dataPagamento: '', // Default empty since it doesn't exist in DB
      processoId: row.caso_id || undefined,
      clienteId: row.cliente_id || undefined,
      criadoEm: row.created_at || undefined,
      atualizadoEm: undefined, // Default undefined since it doesn't exist in DB
      metodo_pagamento: row.metodo_pagamento || '',
    })) as ContaFinanceira[];
  },
  async get(id: string) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) throw new Error('Transação não encontrada');
    return {
      id: data.id,
      descricao: data.descricao,
      valor: data.valor,
      tipo: data.tipo,
      status: 'pendente', // Default status since it doesn't exist in DB
      dataVencimento: data.data_transacao || '',
      dataPagamento: '', // Default empty since it doesn't exist in DB
      processoId: data.caso_id || undefined,
      clienteId: data.cliente_id || undefined,
      criadoEm: data.created_at || undefined,
      atualizadoEm: undefined, // Default undefined since it doesn't exist in DB
      metodo_pagamento: data.metodo_pagamento || '',
    } as ContaFinanceira;
  },
  async create(conta: ContaFinanceira) {
    // Map ContaFinanceira to Supabase fields
    const insertData = {
      descricao: conta.descricao,
      valor: conta.valor,
      tipo: conta.tipo,
      data_transacao: conta.dataVencimento,
      caso_id: conta.processoId,
      cliente_id: conta.clienteId,
      metodo_pagamento: conta.metodo_pagamento,
    };
    const { data, error } = await supabase.from(TABLE).insert([insertData]).select().single();
    if (error) throw error;
    if (!data) throw new Error('Erro ao criar transação');
    return {
      id: data.id,
      descricao: data.descricao,
      valor: data.valor,
      tipo: data.tipo,
      status: 'pendente', // Default status
      dataVencimento: data.data_transacao || '',
      dataPagamento: '', // Default empty
      processoId: data.caso_id || undefined,
      clienteId: data.cliente_id || undefined,
      criadoEm: data.created_at || undefined,
      atualizadoEm: undefined, // Default undefined
      metodo_pagamento: data.metodo_pagamento || '',
    } as ContaFinanceira;
  },
  async update(id: string, conta: Partial<ContaFinanceira>) {
    const updateData = {
      descricao: conta.descricao,
      valor: conta.valor,
      tipo: conta.tipo,
      data_transacao: conta.dataVencimento,
      caso_id: conta.processoId,
      cliente_id: conta.clienteId,
      metodo_pagamento: conta.metodo_pagamento,
    };
    const { data, error } = await supabase.from(TABLE).update(updateData).eq('id', id).select().single();
    if (error) throw error;
    if (!data) throw new Error('Erro ao atualizar transação');
    return {
      id: data.id,
      descricao: data.descricao,
      valor: data.valor,
      tipo: data.tipo,
      status: 'pendente', // Default status
      dataVencimento: data.data_transacao || '',
      dataPagamento: '', // Default empty
      processoId: data.caso_id || undefined,
      clienteId: data.cliente_id || undefined,
      criadoEm: data.created_at || undefined,
      atualizadoEm: undefined, // Default undefined
      metodo_pagamento: data.metodo_pagamento || '',
    } as ContaFinanceira;
  },
  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
