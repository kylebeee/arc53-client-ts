'use client'

import { useContext, useState } from "react"
import CollectionPrefixForm from "../collection-prefix-form";
import CollectionAddressForm from "../collection-address-form";
import CollectionAssetForm from "../collection-asset-form";
import { ARC53FormProgress } from "@/types/form";
import { cn } from "@/functions/tailwind";
import { Context as FormDisplayContext } from "@/providers/form-display"
import Arc53DataFormNav from "../arc53-data-form-nav";

import uuid from "@/functions/random";
import CollectionTraitsForm from "../collection-traits-form";
import ImageCIDForm from "../image-cid-form";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Token } from "@/types";

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
    <form onSubmit={e => {
      console.log('submitting form');

      const getTokenData = (key: string): Token | null => {
        const asset_id = (document.getElementById(`asset-id-${key}`) as HTMLInputElement)?.value;
        const image = (document.getElementById(`image-cid-${key}`) as HTMLInputElement)?.value;
        const image_integrity = (document.getElementById(`image-cid-integrity-${key}`) as HTMLInputElement)?.value;
        const image_mimetype = (document.getElementById(`image-cid-mime-${key}`) as HTMLInputElement)?.value;

        if (!asset_id) return null;

        const payload: Token  = { asset_id: parseInt(asset_id) };

        if (image) payload.image = image;
        if (image_integrity) payload.image_integrity = image_integrity;
        if (image_mimetype) payload.image_mimetype = image_mimetype;

        return payload;
      }

      const payload = {
        tokens: tokensList.map(key => getTokenData(key)).filter(x => !!x),
        teamMembers: teamMembersList,
        collections: collectionsList,
        traits: traitsList,
        faq: faqList,
        extras: extrasList
      };

      console.log(payload);






      e.preventDefault();
    }}>
      {/* create an infinite size input list for the token info */}
      <section className={cn((formProgress !== ARC53FormProgress.token) ? 'hidden' : '')}>
        <label className="font-bold">Tokens</label>
        <div className="divide-y divide-akita-purple/60 space-y-4">
        {
          tokensList.map((key) => (
            <div key={key} className="w-full max-w-full flex flex-wrap gap-4">
              <div className="w-full h-0 flex justify-end">
                <button
                  className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setTokensList(l => l.filter((k: string) => k !== key))}
                >
                  <XMarkIcon className="size-6" />
                </button>
              </div>
              

              <input id={`asset-id-${key}`} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Asset ID" />

              <ImageCIDForm id={key} />
            </div>
          ))
        }
        </div>

        <button
          className="block p-2 my-4 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setTokensList(l => [...l, uuid(8)])}
        >
          Add {tokensListLength > 0 ? 'another' : 'a'} token
        </button>
      </section>

      {/* create an infinite size input list for the associate info */}
      <section className={cn((formProgress !== ARC53FormProgress.associate) ? 'hidden' : '')}>
        <label className="font-bold">Team Info</label>
        <div className="divide-y divide-akita-purple/60 space-y-4">
        {
          teamMembersList.map((key) => (
            <div key={key} className="w-full max-w-full flex flex-wrap gap-4">
              <div className="w-full h-0 flex justify-end">
                <button
                  className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setTeamMembersList(l => l.filter((k: string) => k !== key))}
                >
                  <XMarkIcon className="size-6" />
                </button>
              </div>

              <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md md:w-96" type="text" placeholder="Role" />
              <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md w-full md:w-[42rem] text-ellipsis overflow-hidden" type="text" placeholder="Address" />
            
              
            </div>
          ))
        }
        </div>

        <button
          className="block p-2 my-4 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setTeamMembersList(l => [...l, uuid(8)])}
        >
          Add {teamMembersListLength > 0 ? 'another' : 'a'} team member
        </button>
      </section>

      {/* create an infinite size input list for the collection info */}
      <section className={cn((formProgress !== ARC53FormProgress.collection) ? 'hidden' : '')}>
        <label className="font-bold">Collection Info</label>
        <div className="divide-y divide-akita-purple/60 space-y-4">
          {
            collectionsList.map(key => (
              <div key={key} className="w-full">
                <div className="w-full h-0 flex justify-end">
                  <button
                    className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                    type="button"
                    onClick={() => setCollectionsList(l => l.filter((k: string) => k !== key))}
                  >
                    <XMarkIcon className="size-6" />
                  </button>
                </div>

                <div className="w-full flex flex-wrap my-4 gap-4">

                  <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md md:w-80" type="text" placeholder="Name" />

                  <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Banner Asset ID" />
                  <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Avatar Asset ID" />

                  <textarea className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md min-h-40 w-[47.5rem]" placeholder="Description" />

                  <div className="w-full py-2 flex flex-col gap-4">
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
          className="block p-2 my-4 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setCollectionsList(l => [...l, uuid(8)])}
        >
          Add {collectionsListLength > 0 ? 'another' : 'a'} collection
        </button>
      </section>
      {/* create an infinite size input list for the FAQ info */}
      <section className={cn((formProgress !== ARC53FormProgress.faq) ? 'hidden' : '')}>
        <label className="font-bold">FAQ Info</label>
        <div className="divide-y divide-akita-purple/60 space-y-4">
        {
          faqList.map((key) => (
            <div key={key} className="w-full">
              <div className="w-full md:h-0 flex justify-end">
                <button
                  className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setFaqList(l => l.filter((k: string) => k !== key))}
                >
                  <XMarkIcon className="size-6" />
                </button>
              </div>

              <div className="w-full my-4 flex flex-col gap-4">
                <textarea className="w-full md:w-[30rem] bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Question" />
                <textarea className="w-full bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Answer" />
              </div>

            </div>
          ))
        }
        </div>
        <button
          className="block p-2 my-4 bg-akita-purple text-white rounded-md"
          type="button"
          onClick={() => setFaqList(l => [...l, uuid(8)])}
        >
          Add {faqListLength > 0 ? 'another' : 'a'} Q & A
        </button>
      </section>

      {/* create an infinite size input list for the FAQ info */}
      <section className={cn((formProgress !== ARC53FormProgress.extras) ? 'hidden' : '')}>
        <label className="font-bold">Extras</label>
        <div className="divide-y divide-akita-purple/60 space-y-4">
        {
          extrasList.map((key) => (
            <div key={key} className="w-full">
              <div className="w-full md:h-0 flex justify-end">
                <button
                  className="block p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                  type="button"
                  onClick={() => setExtrasList(l => l.filter((k: string) => k !== key))}
                >
                  <XMarkIcon className="size-6" />
                </button>
              </div>

              <div className="w-full my-4 flex flex-col gap-4">
                <input className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md md:w-96" type="text" placeholder="Key" />
                <textarea className="w-full bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Value" />
              </div>
            </div>
          ))
        }
        </div>

        <button
          className="block p-2 my-4 bg-akita-purple text-white rounded-md"
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