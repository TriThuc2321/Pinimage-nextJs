import { AppPropsWithLayout } from '~/interfaces';
import { EmptyLayout } from '~/layouts/empty';
import { StoreProvider } from '~/store/storeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '~/configs/firebase';
import '~/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StoreProvider>
    );
}
