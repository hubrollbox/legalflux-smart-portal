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
    queryFn: async ({ pageParam }: { pageParam: unknown }) => fetchContracts({ pageParam: (pageParam as number) || 0 }),
    getNextPageParam: (lastPage: Contract[], allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
};
