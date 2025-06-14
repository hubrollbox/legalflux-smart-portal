
import { supabase } from '@/integrations/supabase/client';
// import { ConflictService } from './ConflictService';

// Exemplo simples de estrutura Processo
export interface Processo {
  id?: number | string;
  numero: string;
  titulo?: string;
  cliente?: string;
  advogado?: string;
  status: string;
  prazo?: string;
  valor?: string | number;
  movimentos?: Array<{ data: string; descricao: string }>;
}

// Função mock para gerar dados fake
function mockProcessos(): Processo[] {
  return [
    {
      id: 1,
      numero: "PROC-001",
      titulo: "Ação Trabalhista",
      cliente: "Maria da Silva",
      advogado: "Dr. João",
      status: "pendente",
      prazo: "2025-09-15",
      valor: "10000",
      movimentos: [
        { data: '2025-06-20', descricao: 'Distribuição da inicial' }
      ]
    },
    {
      id: 2,
      numero: "PROC-002",
      titulo: "Cobrança",
      cliente: "Empresa ABC Ltda.",
      advogado: "Dra. Ana",
      status: "activo",
      prazo: "",
      valor: "5000",
      movimentos: []
    }
  ];
}

export async function fetchProcessos(page = 1, limit = 5) {
  // MOCK: Paginação simples
  const data = mockProcessos().slice((page - 1) * limit, (page) * limit);
  const total = mockProcessos().length;
  return { data, total };
}

export async function addProcesso(processo) {
  // // Verificação automática de conflito (desabilitada)
  // if (processo.clienteId) {
  //   const conflicts = await ConflictService.list({ entity_id: processo.clienteId, resolved: false });
  //   if (conflicts.length > 0) {
  //     throw new Error('Conflito de interesse detectado para este cliente. Processo não pode ser criado até resolução.');
  //   }
  // }
  // Mock: retorna processo com id aleatório
  return { ...processo, id: Math.floor(Math.random() * 10000) };
}

export async function updateProcesso(id, updates) {
  // Mock: retorna atualização simulada
  return { ...updates, id };
}

export async function deleteProcesso(id) {
  // Mock: retorna true
  return true;
}

export const ProcessoService = {
  fetchProcessos,
  addProcesso,
  updateProcesso,
  deleteProcesso,
};
