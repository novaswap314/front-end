import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import React from 'react';
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'f489110b339b21e1a621222a6e5b2da2'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const BSCTest = {
    id: 97,
    name: 'BSC TestNet',
    network: 'BSC TestNet',
    nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: {
            http: ['https://bsc-testnet-rpc.publicnode.com'],
        },
        public: {
            http: ['https://bsc-testnet-rpc.publicnode.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'bsc Explorer',
            url: 'https://testnet.bscscan.com',
        },
    },
}

const DISChain = {
    id: 513100,
    name: 'Disney Chain',
    network: 'Disney Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'DIS',
        symbol: 'DIS',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.dischain.xyz'],
        },
        public: {
            http: ['https://rpc.dischain.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Dis Explorer',
            url: 'https://oklink.com/dis',
        },
    },
}

const chains = [BSCTest]
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
        '--w3m-accent': '#a8ff78',
        // '--w3m-color-mix-strength': 40,
        '--w3m-font-size-master': '8px',
    }
})

export function Web3ModalProvider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}