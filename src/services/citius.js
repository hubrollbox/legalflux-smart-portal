export const fetchProcesso = async (numero) => {
  const response = await fetch(`/api/citius?numero=${numero}`);
  if (!response.ok) throw new Error("Processo não encontrado");
  return response.json();
};
