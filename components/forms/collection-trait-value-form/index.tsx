'use client'

import XMarkIcon from "@/components/icons/x-mark";
import { useState } from "react";

export default function CollectionTraitValueForm({ className }: { className?: string }) {
	const [inputValue, setInputValue] = useState("");
	const [traitValues, setTraitValues] = useState<string[]>([]);

	return (
		<div className={className}>
			<input
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] rounded-md w-60"
				type="text"
				placeholder="Add Trait Values"
				onKeyDown={(e) => {
					if (e.key !== "Enter") return;
					if (!inputValue) return;
					if (traitValues.includes(inputValue)) return;

					e.preventDefault();

					setTraitValues(p => [...p, inputValue]);
					setInputValue("");
				}}
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
			/>

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg">
				{
					traitValues.map((traitValue, index) => (
						<div key={index} className="p-1 bg-zinc-900 rounded-md inline-flex">
							<button
								type="button"
								className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
								onClick={() => setTraitValues(p => p.filter((_, i) => i !== index))}
							>
								<XMarkIcon />
							</button>
							<p className="py-1 pl-1 pr-2">{traitValue}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}