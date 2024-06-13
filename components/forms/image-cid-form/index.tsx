'use client'

import { getIPFSMetaData } from "@/functions/ipfs";
import { cn } from "@/functions/tailwind";
import { useFloating } from "@floating-ui/react";
import { useState } from "react";

const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/svg+xml',
]

export interface ImageCIDFormProps {
    cidInputID: string;
    integrityInputID: string;
    mimeInputID: string;
}

export default function ImageCIDForm({ cidInputID, integrityInputID, mimeInputID }: ImageCIDFormProps) {
    const {refs, floatingStyles} = useFloating({ placement: 'top-start' });
    
    const [error , setError] = useState<string>('');
    const [integrity, setIntegrity] = useState<string>('');
    const [mime, setMime] = useState<string>('');
    
    return (
        <>
            {
                !!error &&
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}                    
                >
                    <div className="bg-red-600 my-2 p-2 text-white rounded-lg shadow-md">
                        {error}
                    </div>
                </div>
            }
            
            <input
                id={cidInputID}
                ref={refs.setReference}
                className={cn(!!error ? 'border-red-600' : 'border-zinc-900 ', "border focus:border-zinc-900 bg-zinc-900 rounded-md w-full md:w-[40rem]")}
                type="text"
                placeholder="Image CID"
                onChange={async (e) => {
                    const cid = e.target.value;
                    setError('');

                    if (cid.length < 46) return;

                    const metadata = await getIPFSMetaData(cid);

                    if (!metadata) {
                        setError('Something went wrong validating this IPFS CID');
                        return;
                    }

                    if (!allowedMimeTypes.includes(metadata.mime)) {
                        setError('Image must be of type png, jpeg, gif, webp, or svg');
                        return;
                    }    

                    setIntegrity(metadata.integrity);
                    console.log('intg -> ', metadata.integrity);
                    setMime(metadata.mime);
                    console.log('mime -> ', metadata.mime);
                }}
            />
            <input
                id={integrityInputID}
                className="hidden bg-zinc-900 rounded-md"
                type="text"
                onChange={() => {}}
                value={integrity}
            />
            <input
                id={mimeInputID}
                className="hidden bg-zinc-900 rounded-md"
                type="text"
                onChange={() => {}}
                value={mime}
            />
        </>
        
    );
}