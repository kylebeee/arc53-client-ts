'use client'

import algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet-react'
import { useContext, useState } from 'react'
import { Arc53DataContext } from '@/providers/arc53-data'
import { getPinataKey, uploadToPinata } from '@/functions/pinata'
import { buildNFDUpdateTxns } from '@/functions/nfd-update'
import { Arc53 } from '@/types'

type FlowStatus = 'idle' | 'uploading' | 'signing' | 'submitting' | 'success' | 'error'

const STATUS_LABELS: Record<FlowStatus, string> = {
  idle: 'Upload & Update NFD',
  uploading: 'Uploading to IPFS...',
  signing: 'Sign transaction...',
  submitting: 'Submitting...',
  success: '',
  error: 'Retry',
}

export default function NFDUpdateFlow({ buildPayload }: { buildPayload: () => Arc53 }) {
  const { activeAddress, signTransactions, algodClient } = useWallet()
  const { selectedNFD } = useContext(Arc53DataContext)

  const [status, setStatus] = useState<FlowStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [txnId, setTxnId] = useState<string | null>(null)
  const [cid, setCid] = useState<string | null>(null)

  const canUpload = !!activeAddress && !!selectedNFD && !!getPinataKey()
  const isProcessing = status !== 'idle' && status !== 'error' && status !== 'success'

  async function handleUploadAndUpdate() {
    if (!activeAddress || !selectedNFD || !algodClient) return

    const pinataKey = getPinataKey()
    if (!pinataKey) {
      setError('Pinata JWT not configured')
      setStatus('error')
      return
    }

    try {
      const payload = buildPayload()

      setStatus('uploading')
      setError(null)
      const ipfsHash = await uploadToPinata(pinataKey, payload)
      setCid(ipfsHash)

      setStatus('signing')
      const txns = await buildNFDUpdateTxns(
        selectedNFD.appID,
        activeAddress,
        ipfsHash,
        algodClient,
      )

      const signedTxns = await signTransactions(txns)

      setStatus('submitting')
      const validSignedTxns = signedTxns.filter((t): t is Uint8Array => t !== null)
      const { txid } = await algodClient.sendRawTransaction(validSignedTxns).do()
      setTxnId(txid)

      await algosdk.waitForConfirmation(algodClient, txid, 4)

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
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            {cid && <>CID: {cid.slice(0, 16)}... </>}
            {txnId && <>Txn: {txnId.slice(0, 12)}...</>}
          </p>
        </div>
        <button
          type="button"
          className="ml-auto px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          onClick={() => {
            setStatus('idle')
            setTxnId(null)
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
