import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (err) => toast.error((err as Error).message),
  }),
  queryCache: new QueryCache({
    onError: (err) => toast.error((err as Error).message),
  }),
});
