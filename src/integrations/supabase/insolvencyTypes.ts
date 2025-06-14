
// Tipos TypeScript para o módulo de insolvências
export type Insolvencia = {
  id: string;
  numero_processo: string;
  tribunal: string;
  tipo: string;
  devedor: string;
  data_abertura: string;
  juridico_id: string;
  created_at: string;
};

export type Credor = {
  id: string;
  insolvencia_id: string;
  nome: string;
  nif?: string;
  email?: string;
};

export type Credito = {
  id: string;
  credor_id: string;
  tipo_credito: string;
  valor: number;
  data?: string;
  documentos?: any;
};

export type BemInventario = {
  id: string;
  insolvencia_id: string;
  descricao: string;
  valor_estimado?: number;
  estado: "livre" | "penhorado" | "alienado" | "indisponível" | "vendido";
};

export type DividaMassa = {
  id: string;
  insolvencia_id: string;
  descricao: string;
  categoria?: string;
  valor?: number;
};

export type NegocioCurso = {
  id: string;
  insolvencia_id: string;
  descricao: string;
  estado?: string;
  documento?: string;
};

export type DocumentoInsolvencia = {
  id: string;
  insolvencia_id: string;
  tipo_documento: string;
  conteudo?: string;
  data: string;
};

export type ChecklistInsolvencia = {
  id: string;
  insolvencia_id: string;
  etapa: string;
  status: "pendente" | "em_progresso" | "concluido" | "atrasado";
  prazo?: string;
};
