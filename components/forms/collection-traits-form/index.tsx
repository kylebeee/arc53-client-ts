'use client'

import { useState } from "react"
import CollectionTraitValueForm from "../collection-trait-value-form"
import XMarkIcon from "@/components/icons/x-mark"
import uuid from "@/functions/random"

export default function CollectionTraitsForm() {
  const [traitsList, setTraitsList] = useState<string[]>([])
  const traitsListLength = traitsList.length

  return (
    <div className="w-full mt-2">
      <h2 className="font-bold">Trait Names</h2>

      <div className="mt-2 border-l-[.5rem] border-zinc-800 pl-6">
        {
          traitsList.map((traitKey) => (
            <div key={traitKey} className="w-full">
              <div className="w-full h-0 flex justify-end">
                <button
                  className="p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setTraitsList(ttl => ttl.filter((k: string) => k !== traitKey))}
                >
                  <XMarkIcon />
                </button>
              </div>

              <div className="w-full my-4 flex flex-col gap-2">
                <input className="bg-zinc-900 rounded-md w-60" type="text" placeholder="Trait Name" />
                <CollectionTraitValueForm key={`collection-trait-value-${traitKey}`} className="w-full" />
              </div>
            </div>
          ))
        }

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setTraitsList(ttl => [...ttl, uuid(8)])}
        >
          Add {traitsListLength > 0 ? 'another' : 'a'} trait
        </button>
      </div>
    </div>
  )
}