'use client'


import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function CollectionPrefixForm({ id, className }: { id: string, className?: string }) {
	const [inputValue, setInputValue] = useState("");
	const [prefixes, setPrefixes] = useState<string[]>([]);

	return (
		<div className={className}>
			<input
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] border-zinc-900 focus:border-zinc-900 rounded-md w-60"
				type="text"
				placeholder="Prefixes"
				onKeyDown={(e) => {
					if (e.key !== "Enter") return;
					if (!inputValue) return;
					if (prefixes.includes(inputValue)) return;

					e.preventDefault();

					setPrefixes(p => [...p, inputValue]);
					setInputValue("");
				}}
				onChange={(e) => setInputValue(e.target.value.toUpperCase())}
				value={inputValue}
			/>

			<input id={id} type="text" onChange={() => {}} value={prefixes.join('|||')} className="hidden" />

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg">
				{
					prefixes.map((prefix, index) => (
						<div key={index} className="p-1 bg-zinc-900 rounded-md inline-flex">
							<button
								type="button"
								className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
								onClick={() => setPrefixes(p => p.filter((_, i) => i !== index))}
							>
								<XMarkIcon className="size-6" />
							</button>
							<p className="py-1 pl-1 pr-2 uppercase">{prefix}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}