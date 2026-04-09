'use client'

import { getPinataKey, setPinataKey, clearPinataKey } from '@/functions/pinata'
import { useState, useEffect } from 'react'

export default function PinataKeyInput() {
  const [key, setKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = getPinataKey()
    if (stored) {
      setKey(stored)
      setSaved(true)
    }
  }, [])

  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        className="bg-zinc-900 border-zinc-700 focus:border-akita-purple rounded-md text-sm w-full"
        type="password"
        placeholder="Pinata JWT"
        value={key}
        onChange={e => {
          setKey(e.target.value)
          setSaved(false)
        }}
      />
      {!saved ? (
        <button
          type="button"
          className="px-3 py-2 text-sm bg-akita-purple hover:bg-akita-purple-dark text-white rounded-md whitespace-nowrap transition-colors"
          onClick={() => {
            if (key.trim()) {
              setPinataKey(key.trim())
              setSaved(true)
            }
          }}
        >
          Save
        </button>
      ) : (
        <button
          type="button"
          className="px-3 py-2 text-sm bg-zinc-900 hover:bg-red-600 text-white rounded-md whitespace-nowrap transition-colors"
          onClick={() => {
            clearPinataKey()
            setKey('')
            setSaved(false)
          }}
        >
          Clear
        </button>
      )}
    </div>
  )
}
