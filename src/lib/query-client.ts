import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status !== undefined && status >= 400 && status < 500 && status !== 408) {
          return false;
        }
        return failureCount < 2;
      },
      throwOnError: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
