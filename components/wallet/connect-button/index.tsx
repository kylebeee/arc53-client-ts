'use client'

import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'

export default function ConnectButton() {
  const { activeAddress, wallets } = useWallet()
  const [showWallets, setShowWallets] = useState(false)

  if (activeAddress) {
    const activeWallet = wallets?.find(w => w.isActive)

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400 font-mono">
          {activeAddress.slice(0, 4)}...{activeAddress.slice(-4)}
        </span>
        <button
          type="button"
          className="px-3 py-1.5 text-sm bg-zinc-900 hover:bg-red-600 text-white rounded-md transition-colors"
          onClick={() => activeWallet?.disconnect()}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="px-4 py-2 bg-akita-purple hover:bg-akita-purple-dark text-white rounded-md text-sm font-medium transition-colors"
        onClick={() => setShowWallets(s => !s)}
      >
        Connect Wallet
      </button>

      {showWallets && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
          {wallets?.map(wallet => (
            <button
              key={wallet.id}
              type="button"
              className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg transition-colors"
              onClick={() => {
                wallet.connect()
                setShowWallets(false)
              }}
            >
              {wallet.metadata.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
