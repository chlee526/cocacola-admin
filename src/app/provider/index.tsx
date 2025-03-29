// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AlertProvider } from '@/shared/store';
import { CustomAlert } from '@/shared/ui';

import { PageLoaderProvider } from './PageLoaderProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';

const App = () => {
    return (
        <QueryClientProvider>
            <ThemeProvider>
                <AlertProvider>
                    <PageLoaderProvider>
                        <RouterProvider />
                        <CustomAlert />
                    </PageLoaderProvider>
                </AlertProvider>
            </ThemeProvider>
            {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} */}
        </QueryClientProvider>
    );
};

export default App;
