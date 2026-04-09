import { Arc53 } from '@/types'

const PINATA_KEY = 'arc53-pinata-jwt'

export function getPinataKey(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(PINATA_KEY)
}

export function setPinataKey(key: string) {
  localStorage.setItem(PINATA_KEY, key)
}

export function clearPinataKey() {
  localStorage.removeItem(PINATA_KEY)
}

export async function uploadToPinata(apiKey: string, json: Arc53): Promise<string> {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      pinataContent: json,
      pinataMetadata: { name: 'arc53.json' },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Pinata upload failed (${res.status}): ${body}`)
  }

  const result = await res.json()
  return result.IpfsHash
}
