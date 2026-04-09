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

  if (saved) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-zinc-500">Pinata</span>
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <button
          type="button"
          className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
          onClick={() => {
            clearPinataKey()
            setKey('')
            setSaved(false)
          }}
        >
          clear
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        className="bg-zinc-900 border-zinc-700 focus:border-akita-purple rounded-md text-sm py-1.5 w-40 md:w-48"
        type="password"
        placeholder="Pinata JWT"
        value={key}
        onChange={e => setKey(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && key.trim()) {
            e.preventDefault()
            setPinataKey(key.trim())
            setSaved(true)
          }
        }}
      />
      <button
        type="button"
        className="px-2.5 py-1.5 text-sm bg-akita-purple hover:bg-akita-purple-dark text-white rounded-md transition-colors"
        onClick={() => {
          if (key.trim()) {
            setPinataKey(key.trim())
            setSaved(true)
          }
        }}
      >
        Save
      </button>
    </div>
  )
}
