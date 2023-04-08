import axiosClient from '~/services/axios-client';
import { AppPropsWithLayout } from '~/interfaces';
import { EmptyLayout } from '~/layouts/empty';
import { SWRConfig } from 'swr';
import { StoreProvider } from '~/store/storeProvider';
import '~/configs/firebase';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <StoreProvider>
            <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        </StoreProvider>
    );
}
