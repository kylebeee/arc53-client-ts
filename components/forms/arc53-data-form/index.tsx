'use client'

import { useContext, useEffect, useState } from "react"
import CollectionPrefixForm from "../collection-prefix-form";
import CollectionAddressForm from "../collection-address-form";
import CollectionAssetForm from "../collection-asset-form";
import { ARC53FormProgress, FormInputID, getInputID } from "@/types/form";
import { cn } from "@/functions/tailwind";
import { Context as FormDisplayContext } from "@/providers/form-display"
import Arc53DataFormNav from "../arc53-data-form-nav";

import uuid from "@/functions/random";
import ImageCIDForm from "../image-cid-form";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { buildArc53Payload } from "@/functions/form";
import CollectionTraitValueForm from "../collection-trait-value-form";
import { Arc53DataContext } from "@/providers/arc53-data";
import { buildFormStateFromArc53, FormInitialState } from "@/functions/arc53-prefill";

export default function Arc53DataForm() {
  const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);
  const { arc53Data } = useContext(Arc53DataContext);

  const [tokensList, setTokensList] = useState<string[]>([]);
  const tokensListLength = tokensList.length;
  const [teamMembersList, setTeamMembersList] = useState<string[]>([]);
  const teamMembersListLength = teamMembersList.length;
  const [collectionsList, setCollectionsList] = useState<string[]>([]);
  const collectionsListLength = collectionsList.length;

  const [traitsMap, setTraitsMap] = useState<{[key: string]: string[]}>({})

  const [faqList, setFaqList] = useState<string[]>([]);
  const faqListLength = faqList.length;
  const [extrasList, setExtrasList] = useState<string[]>([]);
  const extrasListLength = extrasList.length;

  // Pre-fill state
  const [formKey, setFormKey] = useState(0);
  const [prefillState, setPrefillState] = useState<FormInitialState | null>(null);

  // When ARC53 data loads from NFD, populate form
  useEffect(() => {
    if (!arc53Data) return;

    const state = buildFormStateFromArc53(arc53Data);
    setPrefillState(state);
    setTokensList(state.tokensList);
    setTeamMembersList(state.teamMembersList);
    setCollectionsList(state.collectionsList);
    setTraitsMap(state.traitsMap);
    setFaqList(state.faqList);
    setExtrasList(state.extrasList);
    // Force re-mount of all inputs to apply defaultValues
    setFormKey(k => k + 1);
    // Reset to first step
    setFormProgress(ARC53FormProgress.token);
  }, [arc53Data, setFormProgress]);

  // Helper to get default value for a field
  const dv = (inputId: FormInputID, key: string): string | undefined => {
    return prefillState?.defaultValues[key]?.[inputId];
  }

  // Helper to get default value using composite key (for traits)
  const dvComposite = (inputId: FormInputID, compositeKey: string): string | undefined => {
    return prefillState?.defaultValues[compositeKey]?.[inputId];
  }

  const prefilled = !!prefillState;
  const FieldLabel = ({ children }: { children: React.ReactNode }) =>
    prefilled ? <span className="text-xs text-zinc-400 mb-1 block">{children}</span> : null;

  return (
    <form key={formKey} onSubmit={e => {
      e.preventDefault();

      const payload = buildArc53Payload(tokensList, teamMembersList, collectionsList, traitsMap, faqList, extrasList);

      const jsonFile = JSON.stringify(payload)
      const blob = new Blob([jsonFile], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arc53.json';
      a.click();
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


                <div className="flex flex-col">
                  <FieldLabel>Asset ID</FieldLabel>
                  <input id={getInputID(FormInputID.TokenAssetID, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Asset ID" defaultValue={dv(FormInputID.TokenAssetID, key)} />
                </div>

                <ImageCIDForm
                  cidInputID={getInputID(FormInputID.TokenImage, key)}
                  integrityInputID={getInputID(FormInputID.TokenImageIntegrity, key)}
                  mimeInputID={getInputID(FormInputID.TokenImageMimeType, key)}
                  initialCID={dv(FormInputID.TokenImage, key)}
                  initialIntegrity={dv(FormInputID.TokenImageIntegrity, key)}
                  initialMime={dv(FormInputID.TokenImageMimeType, key)}
                  label={prefilled ? 'Image CID' : undefined}
                />

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

                <div className="flex flex-col">
                  <FieldLabel>Role</FieldLabel>
                  <input id={getInputID(FormInputID.TeamMemberRole, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md md:w-96" type="text" placeholder="Role" defaultValue={dv(FormInputID.TeamMemberRole, key)} />
                </div>

                <div className="flex flex-col w-full md:w-[42rem]">
                  <FieldLabel>Address</FieldLabel>
                  <input id={getInputID(FormInputID.TeamMemberAddress, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md w-full text-ellipsis overflow-hidden" type="text" placeholder="Address" defaultValue={dv(FormInputID.TeamMemberAddress, key)} />
                </div>

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

                  <div className="flex flex-col">
                    <FieldLabel>Name</FieldLabel>
                    <input id={getInputID(FormInputID.CollectionName, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md md:w-80" type="text" placeholder="Name" defaultValue={dv(FormInputID.CollectionName, key)} />
                  </div>

                  <div className="flex flex-col">
                    <FieldLabel>Banner Asset ID</FieldLabel>
                    <input id={getInputID(FormInputID.CollectionBanner, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Banner Asset ID" defaultValue={dv(FormInputID.CollectionBanner, key)} />
                  </div>
                  <div className="flex flex-col">
                    <FieldLabel>Avatar Asset ID</FieldLabel>
                    <input id={getInputID(FormInputID.CollectionAvatar, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" type="text" placeholder="Avatar Asset ID" defaultValue={dv(FormInputID.CollectionAvatar, key)} />
                  </div>

                  <div className="flex flex-col w-[47.5rem] 2xl:w-[60rem]">
                    <FieldLabel>Description</FieldLabel>
                    <textarea id={getInputID(FormInputID.CollectionDescription, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md min-h-40 w-full" placeholder="Description" defaultValue={dv(FormInputID.CollectionDescription, key)} />
                  </div>

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

                    <CollectionPrefixForm id={getInputID(FormInputID.CollectionPrefixes, key)} className="w-full" initialItems={prefillState?.initialLists[key]?.prefixes} />
                    <CollectionAddressForm id={getInputID(FormInputID.CollectionAddresses, key)} className="w-full mt-2" initialItems={prefillState?.initialLists[key]?.addresses} />
                    <CollectionAssetForm id={getInputID(FormInputID.CollectionAssets, key)} className="w-full mt-2" initialItems={prefillState?.initialLists[key]?.assets} />
                    <CollectionAssetForm id={getInputID(FormInputID.CollectionExcludedAssets, key)} className="w-full mt-2" placeholder="Add Excluded Assets" initialItems={prefillState?.initialLists[key]?.excludedAssets} />
                  </div>

                  {/* Hide for now as the watcher is only for algorand atm */}
                  {/* <input className="bg-zinc-900 rounded-md" type="text" placeholder="Network" /> */}

                  <CollectionAddressForm id={getInputID(FormInputID.CollectionArtists, key)} className="w-full mt-2" placeholder="Add Artist Addresses" initialItems={prefillState?.initialLists[key]?.artists} />

                  {/* create an infinite size input list for the property info */}
                  <div className="w-full mt-2">
                    <h2 className="font-bold">Trait Names</h2>

                    <div className="mt-2 border-l-[.5rem] border-zinc-800 pl-6">
                      {
                        traitsMap.hasOwnProperty(key) &&
                        traitsMap[key].map(traitKey => (
                          <div key={traitKey} className="w-full">
                            <div className="w-full h-0 flex justify-end">
                              <button
                                className="p-2 mt-4 h-10 bg-zinc-900 hover:bg-red-600 text-white rounded-md"
                                type="button"
                                onClick={() => setTraitsMap(ttl => ({ ...ttl, [key]: ttl[key].filter((k: string) => k !== traitKey) }))}
                              >
                                <XMarkIcon className="size-6" />
                              </button>
                            </div>

                            <div className="w-full my-4 flex flex-col gap-2">
                              <div className="flex flex-col">
                                <FieldLabel>Trait Name</FieldLabel>
                                <input
                                  id={getInputID(FormInputID.CollectionTraitName, `${traitKey}-${key}`)}
                                  className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md w-60"
                                  type="text"
                                  placeholder="Trait Name"
                                  defaultValue={dvComposite(FormInputID.CollectionTraitName, `${traitKey}-${key}`)}
                                />
                              </div>
                              <CollectionTraitValueForm id={key} traitKey={traitKey} className="w-full" initialItems={prefillState?.initialLists[key]?.traitValues?.[traitKey]} initialImageData={prefillState?.defaultValues} />
                            </div>
                          </div>
                        ))
                      }

                      <button
                        className="block p-2 my-2 bg-akita-purple text-white rounded-md"
                        type="button"
                        onClick={() => setTraitsMap(ttl => ({ ...ttl, [key]: !!ttl[key] ? [...ttl[key], uuid(8)] : [uuid(8)] }))}
                      >
                        Add {traitsMap.hasOwnProperty(key) && traitsMap[key].length > 0 ? 'another' : 'a'} trait
                      </button>
                    </div>
                  </div>
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
                  <div className="flex flex-col w-full md:w-[30rem]">
                    <FieldLabel>Question</FieldLabel>
                    <textarea id={getInputID(FormInputID.FAQQuestion, key)} className="w-full bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Question" defaultValue={dv(FormInputID.FAQQuestion, key)} />
                  </div>
                  <div className="flex flex-col w-full">
                    <FieldLabel>Answer</FieldLabel>
                    <textarea id={getInputID(FormInputID.FAQAnswer, key)} className="w-full bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Answer" defaultValue={dv(FormInputID.FAQAnswer, key)} />
                  </div>
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
                  <div className="flex flex-col md:w-96">
                    <FieldLabel>Key</FieldLabel>
                    <input id={getInputID(FormInputID.ExtraKey, key)} className="bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md w-full" type="text" placeholder="Key" defaultValue={dv(FormInputID.ExtraKey, key)} />
                  </div>
                  <div className="flex flex-col w-full">
                    <FieldLabel>Value</FieldLabel>
                    <textarea id={getInputID(FormInputID.ExtraValue, key)} className="w-full bg-zinc-900 border-zinc-900 focus:border-zinc-900 rounded-md" placeholder="Value" defaultValue={dv(FormInputID.ExtraValue, key)} />
                  </div>
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

      <Arc53DataFormNav buildPayload={() => buildArc53Payload(tokensList, teamMembersList, collectionsList, traitsMap, faqList, extrasList)} />
    </form>
  )
}
