'use client'

import { useContext, useState } from "react"
import CollectionPrefixForm from "../collection-prefix-form";
import CollectionAddressForm from "../collection-address-form";
import CollectionAssetForm from "../collection-asset-form";
import { ARC53FormProgress } from "@/types/form";
import { cn } from "@/functions/tailwind";
import { Context as FormDisplayContext } from "@/providers/form-display"
import Arc53DataFormNav from "../arc53-data-form-nav";
import XMarkIcon from "@/components/icons/x-mark";
import uuid from "@/functions/random";
import CollectionTraitsForm from "../collection-traits-form";
import ImageCIDForm from "../image-cid-form";

export default function Arc53DataForm() {
  const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);

  const [tokensList, setTokensList] = useState<string[]>([]);
  const tokensListLength = tokensList.length;
  const [teamMembersList, setTeamMembersList] = useState<string[]>([]);
  const teamMembersListLength = teamMembersList.length;
  const [collectionsList, setCollectionsList] = useState<string[]>([]);
  const collectionsListLength = collectionsList.length;
  const [traitsList, setTraitsList] = useState<string[]>([]);
  const traitsListLength = traitsList.length;
  const [faqList, setFaqList] = useState<string[]>([]);
  const faqListLength = faqList.length;
  const [extrasList, setExtrasList] = useState<string[]>([]);
  const extrasListLength = extrasList.length;

  return (
    <form onSubmit={e => e.preventDefault()}>
      {/* create an infinite size input list for the token info */}
      <section className={cn((formProgress !== ARC53FormProgress.token) ? 'hidden' : '')}>
        <label className="font-bold">Tokens</label>
 
        {
          tokensList.map((key) => (
            <div key={key} className="w-full my-4 flex gap-2">
              <input className="bg-zinc-900 rounded-md" type="text" placeholder="Asset ID" />

              <ImageCIDForm />

              <button
                className="block p-2 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                type="button"
                onClick={() => setTokensList(l => l.filter((k: string) => k !== key))}
              >
                <XMarkIcon />
              </button>
            </div>
          ))
        }

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setTokensList(l => [...l, uuid(8)])}
        >
          Add {tokensListLength > 0 ? 'another' : 'a'} token
        </button>
      </section>

      {/* create an infinite size input list for the associate info */}
      <section className={cn((formProgress !== ARC53FormProgress.associate) ? 'hidden' : '')}>
        <label className="font-bold">Associate Info</label>

        {
          teamMembersList.map((key) => (
            <div key={key} className="w-full my-4 flex gap-2">
              <input className="bg-zinc-900 rounded-md w-[42rem]" type="text" placeholder="Address" />
              <input className="bg-zinc-900 rounded-md w-96" type="text" placeholder="Role" />

              <button
                className="block p-2 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                type="button"
                onClick={() => setTeamMembersList(l => l.filter((k: string) => k !== key))}
              >
                <XMarkIcon />
              </button>
            </div>
          ))
        }

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setTeamMembersList(l => [...l, uuid(8)])}
        >
          Add {teamMembersListLength > 0 ? 'another' : 'a'} team member
        </button>
      </section>

      {/* create an infinite size input list for the collection info */}
      <section className={cn((formProgress !== ARC53FormProgress.collection) ? 'hidden' : '')}>
        <label className="font-bold">Collection Info</label>
        <div className="divide-y divide-akita-purple">
          {
            collectionsList.map((key, i) => (
              <div key={key} className={cn("w-full", i > 0 ? 'py-10' : 'pb-10')}>
                <div className="w-full h-0 flex justify-end">
                  <button
                    className="p-2 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                    type="button"
                    onClick={() => setCollectionsList(l => l.filter((k: string) => k !== key))}
                  >
                    <XMarkIcon />
                  </button>
                </div>

                <div className="w-full flex flex-wrap gap-2">

                  <input className="bg-zinc-900 rounded-md w-80" type="text" placeholder="Name" />

                  <input className="bg-zinc-900 rounded-md" type="text" placeholder="Banner Asset ID" />
                  <input className="bg-zinc-900 rounded-md" type="text" placeholder="Avatar Asset ID" />

                  <textarea className="bg-zinc-900 rounded-md min-h-40 w-[46.5rem]" placeholder="Description" />

                  <div className="w-full py-2 flex flex-col gap-2">
                    <h3 className="block">
                      Collection Scoping
                    </h3>

                    <p className="text-zinc-400">
                      Lets you communicate which Algorand Standard Assets (ASA&apos;s) a consuming dapp should include in the collection. Prefixes, Addresses & Excluded Assets all scope the collection down using your verified creator addresses while the assets list expands it incase any parts of the collection are not covered by the other scoping methods.
                    </p>

                    <p className="text-zinc-400">
                      Fields with <span className="text-akita-purple font-semibold">Purple</span> backgrounds are list inputs, hitting enter will add the value to the list.
                    </p>

                    <CollectionPrefixForm key={`prefixes-${key}`} className="w-full" />
                    <CollectionAddressForm key={`addresses-${key}`} className="w-full mt-2" />
                    <CollectionAssetForm key={`assets-${key}`} className="w-full mt-2" />
                    <CollectionAssetForm key={`excluded-assets-${key}`} className="w-full mt-2" placeholder="Add Excluded Assets" />
                  </div>

                  {/* Hide for now as the watcher is only for algorand atm */}
                  {/* <input className="bg-zinc-900 rounded-md" type="text" placeholder="Network" /> */}

                  <CollectionAddressForm key={`artist-addresses-${key}`} className="w-full mt-2" placeholder="Add Artist Addresses" />

                  {/* create an infinite size input list for the property info */}
                  <CollectionTraitsForm />
                </div>
              </div>
            ))
          }
        </div>

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setCollectionsList(l => [...l, uuid(8)])}
        >
          Add {collectionsListLength > 0 ? 'another' : 'a'} collection
        </button>
      </section>
      {/* create an infinite size input list for the FAQ info */}
      <section className={cn((formProgress !== ARC53FormProgress.faq) ? 'hidden' : '')}>
        <label className="font-bold">FAQ Info</label>

        {
          faqList.map((key) => (
            <div key={key} className="w-full my-4 flex gap-2">
              <textarea className="w-full bg-zinc-900 rounded-md" placeholder="Question" />
              <textarea className="w-full bg-zinc-900 rounded-md" placeholder="Answer" />

              <button
                className="block max-h-10 p-2 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                type="button"
                onClick={() => setFaqList(l => l.filter((k: string) => k !== key))}
              >
                <XMarkIcon />
              </button>
            </div>
          ))
        }

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setFaqList(l => [...l, uuid(8)])}
        >
          Add {faqListLength > 0 ? 'another' : 'a'} Q & A
        </button>
      </section>

      {/* create an infinite size input list for the FAQ info */}
      <section className={cn((formProgress !== ARC53FormProgress.extras) ? 'hidden' : '')}>
        <label className="font-bold">Extras</label>

        {
          extrasList.map((key) => (
            <div key={key} className="w-full">
              <div className="w-full h-0 flex justify-end">
                <button
                  className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setExtrasList(l => l.filter((k: string) => k !== key))}
                >
                  <XMarkIcon />
                </button>
              </div>

              <div key={key} className="w-full my-4 flex flex-col gap-2">
                <input className="bg-zinc-900 rounded-md w-96" type="text" placeholder="Key" />
                <textarea className="w-full bg-zinc-900 rounded-md" placeholder="Value" />
              </div>
            </div>
          ))
        }

        <button
          className="block p-2 my-2 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setExtrasList(l => [...l, uuid(8)])}
        >
          Add {extrasListLength > 0 ? 'another' : 'a'} extra
        </button>
      </section>

      <Arc53DataFormNav />
    </form>
  )
}