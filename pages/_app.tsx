import axiosClient from '@/api-client/axios-client';
import { AppPropsWithLayout } from '@/interfaces';
import { EmptyLayout } from '@/layouts/empty';
import { SWRConfig } from 'swr';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
}
