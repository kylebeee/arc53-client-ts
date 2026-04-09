'use client'

import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.KIBISIS,
    {
      id: WalletId.LUTE,
      options: { siteName: 'ARC53 Builder' }
    }
  ],
  defaultNetwork: NetworkId.MAINNET,
  networks: {
    [NetworkId.MAINNET]: {
      algod: {
        baseServer: 'https://mainnet-api.algonode.cloud',
        port: '',
        token: '',
      }
    }
  }
})

export default function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider manager={walletManager}>
      {children}
    </WalletProvider>
  )
}
