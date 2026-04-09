'use client'

import ConnectButton from "@/components/wallet/connect-button"
import NFDSelector from "@/components/wallet/nfd-selector"
import PinataKeyInput from "@/components/settings/pinata-key-input"
import { useWallet } from "@txnlab/use-wallet-react"

export default function Header() {
  const { activeAddress } = useWallet()

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl md:text-2xl font-extrabold shrink-0">ARC53 BUILDER</h1>

        <div className="flex items-center gap-3">
          {activeAddress && (
            <div className="hidden md:flex items-center gap-3">
              <NFDSelector />
              <PinataKeyInput />
            </div>
          )}
          <ConnectButton />
        </div>
      </div>

      {/* Mobile: NFD + Pinata below the header bar when connected */}
      {activeAddress && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2">
          <NFDSelector />
          <PinataKeyInput />
        </div>
      )}
    </header>
  )
}
