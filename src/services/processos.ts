export const fetchProcessos = async (page = 1, limit = 5) => {
  // Substitua 'seu-usuario' e 'seu-repositorio' pelos seus dados reais do GitHub
  const url = `https://my-json-server.typicode.com/seu-usuario/seu-repositorio/processos?_page=${page}&_limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar processos');
  const data = await response.json();
  const total = response.headers.get('x-total-count');
  return { data, total: Number(total) };
};
