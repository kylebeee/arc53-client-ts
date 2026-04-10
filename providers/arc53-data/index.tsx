'use client'

import { Arc53 } from '@/types'
import { Nfd } from '@txnlab/nfd-sdk'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

export interface Arc53DataContextValue {
  arc53Data: Arc53 | null
  setArc53Data: Dispatch<SetStateAction<Arc53 | null>>
  selectedNFD: Nfd | null
  setSelectedNFD: Dispatch<SetStateAction<Nfd | null>>
}

export const Arc53DataContext = createContext<Arc53DataContextValue>({
  arc53Data: null,
  setArc53Data: () => {},
  selectedNFD: null,
  setSelectedNFD: () => {},
})

export default function Arc53DataProvider({ children }: { children: React.ReactNode }) {
  const [arc53Data, setArc53Data] = useState<Arc53 | null>(null)
  const [selectedNFD, setSelectedNFD] = useState<Nfd | null>(null)

  return (
    <Arc53DataContext.Provider value={{ arc53Data, setArc53Data, selectedNFD, setSelectedNFD }}>
      {children}
    </Arc53DataContext.Provider>
  )
}
