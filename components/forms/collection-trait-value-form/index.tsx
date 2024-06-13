'use client'

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ImageCIDForm from "../image-cid-form";
import { FormInputID, getInputID } from "@/types/form";

export interface CollectionTraitValueFormProps {
	id: string;
	traitKey: string;
	className?: string;
}

export default function CollectionTraitValueForm({ id, traitKey, className }: CollectionTraitValueFormProps) {
	const [inputValue, setInputValue] = useState("");
	const [traitValues, setTraitValues] = useState<string[]>([]);

	return (
		<div className={className}>
			<input
				className="bg-gradient-to-r from-zinc-900 to-akita-purple to-[500%] border-zinc-900 focus:border-zinc-900 rounded-md w-60"
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

			{/* the value lists are themselves forms keyed by the trait name so this input is just to be able to easily fetch the names we need to iterate over */}
			<input id={getInputID(FormInputID.CollectionTraitValueList, `${traitKey}-${id}`)} type="text" onChange={() => {}} value={traitValues.join('|||')} className="hidden" />

			<div className="w-full min-h-[calc(3rem+4px)] flex flex-wrap gap-2 mt-2 p-1 bg-black border-2 border-zinc-800 rounded-lg">
				{
					traitValues.map((traitValue, index) => (
						<div key={index} className="w-full md:w-auto p-1 bg-zinc-900 rounded-md inline-flex flex-col">
							<div className="flex">
								<button
									type="button"
									className="p-1 text-zinc-600 rounded-md hover:bg-black hover:text-white"
									onClick={() => setTraitValues(p => p.filter((_, i) => i !== index))}
								>
									<XMarkIcon className="size-6" />
								</button>

								<p className="py-1 pl-1 pr-2">{traitValue}</p>
							</div>

							<div className="w-full mt-1 p-0.5 bg-black rounded-lg">

								<input id={getInputID(FormInputID.CollectionTraitValue, `${traitValue}-${traitKey}-${id}`)} type="text" onChange={() => {}} value={traitValue} className="hidden" />

								<ImageCIDForm
									cidInputID={getInputID(FormInputID.CollectionTraitValueImage, `${traitValue}-${traitKey}-${id}`)}
									integrityInputID={getInputID(FormInputID.CollectionTraitValueImageIntegrity, `${traitValue}-${traitKey}-${id}`)}
									mimeInputID={getInputID(FormInputID.CollectionTraitValueImageMimeType, `${traitValue}-${traitKey}-${id}`)}
								/>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}