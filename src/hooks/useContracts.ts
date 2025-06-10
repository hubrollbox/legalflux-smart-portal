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
    queryFn: ({ pageParam = 0 }: { pageParam: number }) => fetchContracts({ pageParam }),
    getNextPageParam: (lastPage: Contract[], allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    onError: (error) => {
      toast({
        title: 'Erro ao carregar contratos',
        description: error.message,
        status: 'error',
      });
    },
  });
};
