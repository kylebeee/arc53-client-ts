'use client'

import { useWallet } from '@txnlab/use-wallet-react'
import { useContext, useEffect, useState } from 'react'
import { NFDRecord } from '@/types/nfd'
import { fetchNFDsByAddress, fetchArc53FromNFD } from '@/functions/nfd'
import { Arc53DataContext } from '@/providers/arc53-data'

export default function NFDSelector() {
  const { activeAddress } = useWallet()
  const { setArc53Data, selectedNFD, setSelectedNFD } = useContext(Arc53DataContext)

  const [nfds, setNfds] = useState<NFDRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingArc53, setLoadingArc53] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch NFDs when address changes
  useEffect(() => {
    if (!activeAddress) {
      setNfds([])
      setSelectedNFD(null)
      setArc53Data(null)
      return
    }

    setLoading(true)
    setError(null)

    fetchNFDsByAddress(activeAddress)
      .then(records => {
        setNfds(records)
        // Auto-select if only one
        if (records.length === 1) {
          setSelectedNFD(records[0])
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeAddress, setArc53Data, setSelectedNFD])

  // Fetch ARC53 data when NFD is selected
  useEffect(() => {
    if (!selectedNFD) {
      setArc53Data(null)
      return
    }

    setLoadingArc53(true)
    fetchArc53FromNFD(selectedNFD)
      .then(data => setArc53Data(data))
      .catch(() => setArc53Data(null))
      .finally(() => setLoadingArc53(false))
  }, [selectedNFD, setArc53Data])

  if (!activeAddress) return null

  if (loading) {
    return <p className="text-sm text-zinc-400 mt-2">Loading NFDs...</p>
  }

  if (error) {
    return <p className="text-sm text-red-400 mt-2">{error}</p>
  }

  if (nfds.length === 0) {
    return <p className="text-sm text-zinc-500 mt-2">No NFDs found for this address</p>
  }

  return (
    <div className="mt-2">
      {nfds.length > 1 ? (
        <select
          className="bg-zinc-900 border-zinc-700 text-white text-sm rounded-md w-full"
          value={selectedNFD?.name ?? ''}
          onChange={e => {
            const nfd = nfds.find(n => n.name === e.target.value)
            setSelectedNFD(nfd ?? null)
          }}
        >
          <option value="">Select an NFD...</option>
          {nfds.map(nfd => (
            <option key={nfd.name} value={nfd.name}>
              {nfd.name}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-sm text-akita-purple font-medium">{selectedNFD?.name}</p>
      )}

      {loadingArc53 && (
        <p className="text-xs text-zinc-400 mt-1">Loading ARC53 data...</p>
      )}
      {selectedNFD && !loadingArc53 && (
        <p className="text-xs text-zinc-500 mt-1">
          {/* Indicate whether existing ARC53 data was found */}
        </p>
      )}
    </div>
  )
}
