'use client'

import { getIPFSMetaData } from "@/functions/ipfs";
import { useState } from "react";

export default function ImageCIDForm() {
    const [integrity, setIntegrity] = useState<string>('');
    const [mime, setMime] = useState<string>('');

    return (
        <>
            <input
                className="bg-zinc-900 rounded-md w-[40rem]"
                type="text"
                placeholder="Image CID"
                onChange={async (e) => {
                    const cid = e.target.value;
                    if (cid.length < 46) return;

                    const metadata = await getIPFSMetaData(cid);

                    if (!metadata) return;

                    setIntegrity(metadata.integrity);
                    setMime(metadata.mime);
                }}
            />
            <input
                className="hidden bg-zinc-900 rounded-md"
                type="text"
                value={integrity}
            />
            <input
                className="hidden bg-zinc-900 rounded-md"
                type="text"
                value={mime}
            />
        </>
        
    );
}