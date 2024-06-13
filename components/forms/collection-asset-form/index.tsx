'use client'


import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export interface CollectionAssetFormProps {
	id: string;
	className?: string;
	placeholder?: string;
}

export default function CollectionAssetForm({ id, className, placeholder = "Add Assets" }: CollectionAssetFormProps) {
	const [inputValue, setInputValue] = useState("");
	const [assets, setAssets] = useState<string[]>([]);

	return (
		<div className={className}>
			<input
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] border-zinc-900 focus:border-zinc-900 rounded-md w-52"
				type="text"
				placeholder={placeholder}
				onKeyDown={(e) => {
					if (e.key !== "Enter") return;
					if (!inputValue) return;
					if (assets.includes(inputValue)) return;

					e.preventDefault();

					setAssets(p => [...p, inputValue]);
					setInputValue("");
				}}
				onChange={(e) => {
					if (!/^\d*$/.test(e.target.value)) return

                    setInputValue(e.target.value)
                }}
				value={inputValue}
			/>

			<input id={id} type="text" onChange={() => {}} value={assets.join('|||')} className="hidden" />

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg">
				{
					assets.map((asset, index) => (
						<div key={index} className="p-1 bg-zinc-900 rounded-md inline-flex">
							<button
								type="button"
								className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
								onClick={() => setAssets(p => p.filter((_, i) => i !== index))}
							>
								<XMarkIcon className="size-6" />
							</button>
							<p className="py-1 pl-1 pr-2">{asset}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}