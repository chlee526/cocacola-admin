import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProviderProps } from '@/shared/model';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError: false, // errorBoundary에 에러 전달 시 별도 처리 필요
            refetchOnWindowFocus: false,
        },
        mutations: {
            throwOnError: false, // errorBoundary에 에러 전달 시 별도 처리 필요
        },
    },
});

const provider = ({ children }: ProviderProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { provider as QueryClientProvider };
