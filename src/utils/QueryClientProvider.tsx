import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { MutationCache, QueryCache } from '@tanstack/react-query';

export const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  // const { updateError } = useErrorStore();

  const queryClient = new QueryClient({
    // queryCache: new QueryCache({
    //   onError: (error: Error) => updateError(error),
    // }),
    // mutationCache: new MutationCache({
    //   onError: (error: Error) => updateError(error),
    // }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
