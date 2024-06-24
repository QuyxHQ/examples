import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuyxProvider } from '@quyx/ui-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <TonConnectUIProvider manifestUrl="https://directory.quyx.xyz/manifest/tonconnect.json">
                <QuyxProvider
                    pk={import.meta.env.VITE_QUYX_PK}
                    credentialFormat={[
                        {
                            label: 'name',
                            input: 'text',
                        },
                        {
                            label: 'profile_picture',
                            input: 'image',
                        },
                        {
                            label: 'bio',
                            input: 'textarea',
                        },
                        {
                            label: 'link_to_telegram_profile',
                            input: 'url',
                        },
                    ]}
                    credentialsCanExpire={false}
                >
                    <App />
                </QuyxProvider>
            </TonConnectUIProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
