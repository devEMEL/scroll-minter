import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../state/store';

import { arbitrumSepolia } from 'wagmi/chains';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { type Config, useClient, useConnectorClient } from 'wagmi';
import { FallbackProvider, JsonRpcProvider } from 'ethers';

export function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    if (transport.type === 'fallback') {
        const providers = (transport.transports as ReturnType<Transport>[]).map(
            ({ value }) => new JsonRpcProvider(value?.url, network)
        );
        if (providers.length === 1) return providers[0];
        return new FallbackProvider(providers);
    }
    return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
    const client = useClient<Config>({ chainId });
    return useMemo(
        () => (client ? clientToProvider(client) : undefined),
        [client]
    );
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
    const { account, chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address);
    return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: client } = useConnectorClient<Config>({ chainId });
    return useMemo(
        () => (client ? clientToSigner(client) : undefined),
        [client]
    );
}

const alchemyApiKey = "RvTR7oPnXGR5aYEp2NYweHA9b4YNPgls";

const scrollSepolia = {
    id: 534351,
    name: 'scrollSepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Scroll Eth',
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: [`https://scroll-sepolia.g.alchemy.com/v2/${alchemyApiKey}`] },
        default: { http: [`https://scroll-sepolia.g.alchemy.com/v2/${alchemyApiKey}`] },
    },
    blockExplorers: {
        default: {
            name: 'Scrollscan',
            url: 'https://sepolia.scrollscan.com',
        },
    },

    testnet: false,
} as const satisfies Chain;

const config = getDefaultConfig({
    appName: 'scroll minter',
    projectId: 'cdddc2c45ee7a243f73916dfe293c0ca',
    chains: [scrollSepolia],
    transports: {
        [scrollSepolia.id]: http(),
    },
});

const queryClient = new QueryClient();

// Create and export the App component wrapped with the RainbowKitProvider and WagmiConfig.
function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode={true}>
                    <ToastContainer position={'top-center'} />
                    <Layout>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                    </Layout>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
