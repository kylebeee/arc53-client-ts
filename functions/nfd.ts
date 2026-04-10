import { Arc53 } from '@/types'
import { Nfd, NfdClient } from '@txnlab/nfd-sdk'

const nfdClient = NfdClient.mainNet()

export { nfdClient }
export type { Nfd }

export async function fetchNFDsForAddress(address: string): Promise<Nfd[]> {
  const results: Nfd[] = []
  const seen = new Set<string>()

  // Search by owner (NFDs the address directly owns)
  try {
    const owned = await nfdClient.searchByOwner(address, { view: 'full', limit: 50 })
    for (const nfd of owned.nfds) {
      if (!seen.has(nfd.name)) {
        seen.add(nfd.name)
        results.push(nfd)
      }
    }
  } catch {
    // No owned NFDs
  }

  // Reverse lookup (NFDs where the address is verified/linked as primary)
  try {
    const primary = await nfdClient.resolveAddress(address, { view: 'full' })
    if (primary && !seen.has(primary.name)) {
      seen.add(primary.name)
      results.push(primary)
    }
  } catch {
    // No primary NFD for this address
  }

  return results
}

// ARC53 data can be stored under different keys depending on the era
const ARC53_KEYS = ['project', 'akitacommunity'] as const

export async function fetchArc53FromNFD(nfd: Nfd): Promise<Arc53 | null> {
  let arc53Value: string | undefined

  for (const key of ARC53_KEYS) {
    arc53Value =
      nfd.properties?.verified?.[key] ??
      nfd.properties?.userDefined?.[key]
    if (arc53Value) break
  }

  if (!arc53Value) return null

  if (arc53Value.startsWith('ipfs://')) {
    const cid = arc53Value.replace('ipfs://', '')
    const res = await fetch(`https://ipfs.akita.community/ipfs/${cid}`)
    if (!res.ok) return null
    return res.json()
  }

  try {
    return JSON.parse(arc53Value)
  } catch {
    return null
  }
}
