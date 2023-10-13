import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => toast.error((err as Error).message),
  }),
});
