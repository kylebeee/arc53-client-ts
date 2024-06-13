'use client'

import { useFloating } from "@floating-ui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export interface CollectionAddressFormProps {
	id: string;
	className?: string;
	placeholder?: string;
}

export default function CollectionAddressForm({ id, className, placeholder = 'Add Addresses' }: CollectionAddressFormProps) {
	const {refs, floatingStyles} = useFloating({ placement: 'top-start' });

	const [inputValue, setInputValue] = useState("");
	const [addresses, setAddresses] = useState<string[]>([]);

	const [error, setError] = useState<string>('');

	return (
		<div className={className}>
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
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] border-zinc-900 focus:border-zinc-900 rounded-md w-full md:w-[42rem]"
				type="text"
				placeholder={placeholder}
				onKeyDown={(e) => {
					if (e.key !== "Enter") return;
					if (!inputValue) return;
					if (inputValue.length !== 58) return;
                    if (addresses.includes(inputValue)) return;

					e.preventDefault();

					setAddresses(a => [...a, inputValue]);
					setInputValue("");
				}}
				onChange={(e) => setInputValue(e.target.value.toUpperCase())}
				value={inputValue}
			/>

			<input id={id} type="text" onChange={() => {}} value={addresses.join('|||')} className="hidden" />

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg overflow-hidden">
				{
					addresses.map((address, index) => (
						<div key={index} className="p-1 bg-zinc-900 rounded-md inline-flex max-w-full">
							<button
								type="button"
								className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
								onClick={() => setAddresses(p => p.filter((_, i) => i !== index))}
							>
								<XMarkIcon className="size-6" />
							</button>
							<p className="max-w-full py-1 pl-1 pr-2 uppercase text-ellipsis overflow-hidden">{address}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}