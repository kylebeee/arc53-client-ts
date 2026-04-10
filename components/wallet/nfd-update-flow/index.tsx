'use client'

import { useWallet } from '@txnlab/use-wallet-react'
import { useContext, useState } from 'react'
import { Arc53DataContext } from '@/providers/arc53-data'
import { getPinataKey, uploadToPinata } from '@/functions/pinata'
import { nfdClient } from '@/functions/nfd'
import { Arc53 } from '@/types'

type FlowStatus = 'idle' | 'uploading' | 'signing' | 'success' | 'error'

const STATUS_LABELS: Record<FlowStatus, string> = {
  idle: 'Upload & Update NFD',
  uploading: 'Uploading to IPFS...',
  signing: 'Signing & submitting...',
  success: '',
  error: 'Retry',
}

export default function NFDUpdateFlow({ buildPayload }: { buildPayload: () => Arc53 }) {
  const { activeAddress, transactionSigner } = useWallet()
  const { selectedNFD } = useContext(Arc53DataContext)

  const [status, setStatus] = useState<FlowStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [cid, setCid] = useState<string | null>(null)

  const canUpload = !!activeAddress && !!selectedNFD && !!getPinataKey()
  const isProcessing = status !== 'idle' && status !== 'error' && status !== 'success'

  async function handleUploadAndUpdate() {
    if (!activeAddress || !selectedNFD || !transactionSigner) return

    const pinataKey = getPinataKey()
    if (!pinataKey) {
      setError('Pinata JWT not configured')
      setStatus('error')
      return
    }

    try {
      const payload = buildPayload()

      // Upload to Pinata
      setStatus('uploading')
      setError(null)
      const ipfsHash = await uploadToPinata(pinataKey, payload)
      setCid(ipfsHash)

      // Update NFD using SDK
      setStatus('signing')
      nfdClient.setSigner(activeAddress, transactionSigner)
      await nfdClient.manage(selectedNFD.name).setMetadata({
        project: `ipfs://${ipfsHash}`,
      })

      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg">
        <div className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
        <div className="text-sm">
          <p className="text-green-400 font-medium">NFD updated</p>
          {cid && (
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              CID: {cid.slice(0, 20)}...
            </p>
          )}
        </div>
        <button
          type="button"
          className="ml-auto px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          onClick={() => {
            setStatus('idle')
            setCid(null)
          }}
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        className="p-2 bg-akita-purple hover:bg-akita-purple-dark text-white rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        disabled={!canUpload || isProcessing}
        onClick={handleUploadAndUpdate}
      >
        {STATUS_LABELS[status]}
      </button>

      {!canUpload && status === 'idle' && (
        <p className="text-xs text-zinc-500">
          Requires: {[
            !activeAddress && 'wallet',
            activeAddress && !selectedNFD && 'NFD',
            activeAddress && selectedNFD && !getPinataKey() && 'Pinata JWT',
          ].filter(Boolean).join(', ')}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
