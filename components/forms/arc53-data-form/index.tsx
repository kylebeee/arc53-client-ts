'use client'

import { useState } from "react"

export default function Arc53DataForm() {
  const [tokenListCount, setTokenListCount] = useState(0);
  const [associateListCount, setAssociateListCount] = useState(0);
  const [collectionListCount, setCollectionListCount] = useState(0);
  const [propertyListCount, setPropertyListCount] = useState(0);
  const [propertyValueListCount, setPropertyValueListCount] = useState(0);
  const [faqListCount, setFaqListCount] = useState(0);

  return (
    <form>
      <section>
        <label className="font-bold">Token Info</label>

        {
          Array(tokenListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Asset ID" />
              <input type="text" placeholder="Image" />
              <input type="text" placeholder="Image Integrity" />
              <input type="text" placeholder="Image Mimetype" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setTokenListCount(tlc => tlc + 1)}
        >
          Add Token
        </button>
      </section>
      {/* create an infinite size input list for the token info */}

      {/* create an infinite size input list for the associate info */}
      <section>
        <label className="font-bold">Associate Info</label>

        {
          Array(associateListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Role" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setAssociateListCount(alc => alc + 1)}
        >
          Add Associate
        </button>
      </section>
      {/* create an infinite size input list for the collection info */}
      <section>
        <label className="font-bold">Collection Info</label>

        {
          Array(collectionListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Prefixes" />
              <input type="text" placeholder="Addresses" />
              <input type="text" placeholder="Assets" />
              <input type="text" placeholder="Excluded Assets" />
              <input type="text" placeholder="Description" />
              <input type="text" placeholder="Banner" />
              <input type="text" placeholder="Avatar" />
              <input type="text" placeholder="Network" />
              <input type="text" placeholder="Artists" />
              <input type="text" placeholder="Explicit" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setCollectionListCount(clc => clc + 1)}
        >
          Add Collection
        </button>
      </section>
      {/* create an infinite size input list for the property info */}
      <section>
        <label className="font-bold">Property Info</label>

        {
          Array(propertyListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Values" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setPropertyListCount(plc => plc + 1)}
        >
          Add Property
        </button>
      </section>
      {/* create an infinite size input list for the property value info */}
      <section>
        <label className="font-bold">Property Value Info</label>

        {
          Array(propertyValueListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Image" />
              <input type="text" placeholder="Image Integrity" />
              <input type="text" placeholder="Image Mimetype" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setPropertyValueListCount(pvlc => pvlc + 1)}
        >
          Add Property Value
        </button>

      </section>
      {/* create an infinite size input list for the FAQ info */}
      <section>
        <label className="font-bold">FAQ Info</label>

        {
          Array(faqListCount).fill(0).map((_, index) => (
            <div key={index} className="w-full my-1 flex gap-1">
              <input type="text" placeholder="Q" />
              <input type="text" placeholder="A" />
            </div>
          ))
        }

        <button
          className="block p-2 m-2 bg-blue-500 text-white rounded-md"
          type="button"
          onClick={() => setFaqListCount(flc => flc + 1)}
        >
          Add FAQ
        </button>

      </section>
    </form>
  )
}