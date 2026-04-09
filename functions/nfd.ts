import { Arc53 } from '@/types'
import { NFDRecord } from '@/types/nfd'

const NFD_API_BASE = 'https://api.nf.domains'

export async function fetchNFDsByAddress(address: string): Promise<NFDRecord[]> {
  const res = await fetch(
    `${NFD_API_BASE}/nfd/lookup?address=${address}&view=full`
  )

  if (!res.ok) {
    if (res.status === 404) return []
    throw new Error(`NFD lookup failed: ${res.status}`)
  }

  const data = await res.json()

  // The lookup endpoint returns { [address]: NFDRecord[] }
  const records = data[address]
  if (!Array.isArray(records)) return []

  return records
}

export async function fetchArc53FromNFD(nfd: NFDRecord): Promise<Arc53 | null> {
  const arc53Value =
    nfd.properties?.verified?.['arc53'] ??
    nfd.properties?.userDefined?.['arc53']

  if (!arc53Value) return null

  // If it's an IPFS URI, fetch the JSON
  if (arc53Value.startsWith('ipfs://')) {
    const cid = arc53Value.replace('ipfs://', '')
    const res = await fetch(`https://ipfs.algonode.xyz/ipfs/${cid}`)
    if (!res.ok) return null
    return res.json()
  }

  // Try parsing as inline JSON
  try {
    return JSON.parse(arc53Value)
  } catch {
    return null
  }
}
