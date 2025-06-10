import { useInfiniteQuery } from 'react-query';
import { fetchContracts } from '../services/ContractService';

export const useContracts = () => {
  return useInfiniteQuery(
    'contracts',
    ({ pageParam = 0 }) => fetchContracts({ pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length : undefined;
      },
    }
  );
};
