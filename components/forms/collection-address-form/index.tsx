'use client'

import XMarkIcon from "@/components/icons/x-mark";
import { useState } from "react";

export interface CollectionAddressFormProps {
	className?: string;
	placeholder?: string;
}

export default function CollectionAddressForm({ className, placeholder = 'Add Addresses' }: CollectionAddressFormProps) {
	const [inputValue, setInputValue] = useState("");
	const [addresses, setAddresses] = useState<string[]>([]);

	return (
		<div className={className}>
			<input
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] rounded-md w-[42rem]"
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

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg">
				{
					addresses.map((address, index) => (
						<div key={index} className="p-1 bg-zinc-900 rounded-md inline-flex">
							<button
								type="button"
								className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
								onClick={() => setAddresses(p => p.filter((_, i) => i !== index))}
							>
								<XMarkIcon />
							</button>
							<p className="py-1 pl-1 pr-2 uppercase">{address}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}