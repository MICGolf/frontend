import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
