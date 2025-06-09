const mockProcessos = [
  {
    id: 1,
    numero: '2024/001',
    titulo: 'Ação Trabalhista',
    cliente: 'João Silva',
    advogado: 'Dra. Maria',
    status: 'activo',
    prazo: '2025-01-15',
    valor: 2500,
    movimentos: [
      { data: '2024-01-10', descricao: 'Distribuição do processo' },
      { data: '2024-02-01', descricao: 'Audiência inicial' }
    ]
  },
  {
    id: 2,
    numero: '2024/002',
    titulo: 'Divórcio',
    cliente: 'Maria Santos',
    advogado: 'Dr. Paulo',
    status: 'pendente',
    prazo: '2025-02-10',
    valor: 1800,
    movimentos: [
      { data: '2024-01-15', descricao: 'Petição inicial' }
    ]
  },
  {
    id: 3,
    numero: '2024/003',
    titulo: 'Contrato TechCorp',
    cliente: 'TechCorp',
    advogado: 'Dra. Ana',
    status: 'concluido',
    prazo: '2024-12-01',
    valor: 5000,
    movimentos: [
      { data: '2024-03-10', descricao: 'Assinatura do contrato' }
    ]
  }
];

export const fetchProcessos = async (page = 1, limit = 5) => {
  try {
    const url = `https://my-json-server.typicode.com/seu-usuario/seu-repositorio/processos?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar processos');
    const data = await response.json();
    const total = response.headers.get('x-total-count');
    return { data, total: Number(total) };
  } catch {
    // Fallback para mock local
    const start = (page - 1) * limit;
    const data = mockProcessos.slice(start, start + limit);
    return { data, total: mockProcessos.length };
  }
};
