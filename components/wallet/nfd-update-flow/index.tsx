'use client'

import algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet-react'
import { useContext, useState } from 'react'
import { Arc53DataContext } from '@/providers/arc53-data'
import { getPinataKey, uploadToPinata } from '@/functions/pinata'
import { buildNFDUpdateTxns } from '@/functions/nfd-update'
import { Arc53 } from '@/types'

type FlowStatus = 'idle' | 'uploading' | 'signing' | 'submitting' | 'success' | 'error'

export default function NFDUpdateFlow({ buildPayload }: { buildPayload: () => Arc53 }) {
  const { activeAddress, signTransactions, algodClient } = useWallet()
  const { selectedNFD } = useContext(Arc53DataContext)

  const [status, setStatus] = useState<FlowStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [txnId, setTxnId] = useState<string | null>(null)
  const [cid, setCid] = useState<string | null>(null)

  const canUpload = !!activeAddress && !!selectedNFD && !!getPinataKey()

  async function handleUploadAndUpdate() {
    if (!activeAddress || !selectedNFD || !algodClient) return

    const pinataKey = getPinataKey()
    if (!pinataKey) {
      setError('Pinata JWT not configured. Add it in the sidebar.')
      setStatus('error')
      return
    }

    try {
      // Step 1: Build payload
      const payload = buildPayload()

      // Step 2: Upload to Pinata
      setStatus('uploading')
      setError(null)
      const ipfsHash = await uploadToPinata(pinataKey, payload)
      setCid(ipfsHash)

      // Step 3: Build NFD update transaction
      setStatus('signing')
      const txns = await buildNFDUpdateTxns(
        selectedNFD.appID,
        activeAddress,
        ipfsHash,
        algodClient,
      )

      // Step 4: Sign transaction
      const signedTxns = await signTransactions(txns)

      // Step 5: Submit transaction
      setStatus('submitting')
      const validSignedTxns = signedTxns.filter((t): t is Uint8Array => t !== null)
      const { txid } = await algodClient.sendRawTransaction(validSignedTxns).do()
      setTxnId(txid)

      // Wait for confirmation
      await algosdk.waitForConfirmation(algodClient, txid, 4)

      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-2">
        <p className="text-sm text-green-400 font-medium">NFD updated successfully!</p>
        {cid && (
          <p className="text-xs text-zinc-400">
            CID: <span className="font-mono">{cid}</span>
          </p>
        )}
        {txnId && (
          <p className="text-xs text-zinc-400">
            Txn: <span className="font-mono">{txnId.slice(0, 12)}...</span>
          </p>
        )}
        <button
          type="button"
          className="px-3 py-1.5 text-sm bg-zinc-900 text-white rounded-md"
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
    <div>
      <button
        type="button"
        className="p-2 bg-akita-purple hover:bg-akita-purple-dark text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!canUpload || status !== 'idle'}
        onClick={handleUploadAndUpdate}
      >
        {status === 'idle' && 'Upload & Update NFD'}
        {status === 'uploading' && 'Uploading to IPFS...'}
        {status === 'signing' && 'Sign transaction...'}
        {status === 'submitting' && 'Submitting...'}
        {status === 'error' && 'Retry'}
      </button>

      {!canUpload && status === 'idle' && (
        <p className="text-xs text-zinc-500 mt-1">
          {!activeAddress && 'Connect wallet'}
          {activeAddress && !selectedNFD && 'Select an NFD'}
          {activeAddress && selectedNFD && !getPinataKey() && 'Add Pinata JWT'}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  )
}
