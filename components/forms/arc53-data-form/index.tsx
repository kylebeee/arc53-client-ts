'use client'

import { useState } from "react"

export default function Arc53DataForm() {
    const [tokenListCount, setTokenListCount] = useState(0);
    const [associateListCount, setAssociateListCount] = useState(0);


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
                    className="p-2 m-2 bg-blue-500 text-white rounded-md"
                    type="button"
                    onClick={() => setTokenListCount(tlc => tlc+1)}
                >
                    Add Token
                </button>
            </section>
            {/* create an infinite size input list for the token info */}

            {/* create an infinite size input list for the associate info */}
            <label>Associate Info</label>
            <button
                type="button"
                onClick={() => setAssociateListCount(alc => alc+1)}
            >
                Add Associate
            </button>
            
            {
                Array(associateListCount).fill(0).map((_, index) => (
                    <div key={index} className="w-full my-1 flex gap-1">
                        <input type="text" placeholder="Address" />
                        <input type="text" placeholder="Role" />
                    </div>
                ))
            }

            {/* create an infinite size input list for the collection info */}
            <label>Collection Info</label>
            <button>Add Collection</button>
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
            {/* create an infinite size input list for the property info */}
            <label>Property Info</label>
            <button>Add Property</button>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Values" />
            {/* create an infinite size input list for the property value info */}
            <label>Property Value Info</label>
            <button>Add Property Value</button>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Image" />
            <input type="text" placeholder="Image Integrity" />
            <input type="text" placeholder="Image Mimetype" />
            {/* create an infinite size input list for the FAQ info */}
            <label>FAQ Info</label>
            <button>Add FAQ</button>
            <input type="text" placeholder="Q" />
            <input type="text" placeholder="A" />

        </form>
    )
}