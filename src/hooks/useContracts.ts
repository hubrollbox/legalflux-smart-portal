
import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { fetchContracts } from '../services/ContractService';

interface Contract {
  id: string;
  title: string;
  status: string;
}

export const useContracts = () => {
  const toast = useToast();

  return useInfiniteQuery({
    queryKey: ['contracts'],
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
      // Garantir que retornamos um array de Contract corretamente mapeado
      const data = await fetchContracts({ pageParam: (pageParam as number) || 0 });
      return (data || []).map((item: any) => ({
        id: item.id,
        title: item.title ?? item.titulo ?? 'Sem título',
        status: item.status ?? 'pendente',
      })) as Contract[];
    },
    getNextPageParam: (lastPage: Contract[], allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
};
