'use client'

import { cn } from "@/functions/tailwind"
import { useContext } from "react"
import { Context as FormDisplayContext } from "@/providers/form-display"
import { ARC53FormProgress } from "@/types/form"
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const steps = [
    {
        id: ARC53FormProgress.token,
        name: 'Tokens',
        description: 'Add tokens & images created by your project',
    },
    {
        id: ARC53FormProgress.associate,
        name: 'Team Members',
        description: 'Add team members to your project / organization',
    },
    {
        id: ARC53FormProgress.collection,
        name: 'Collections',
        description: 'Add collections and define which created assets fit into each collection',
    },
    {
        id: ARC53FormProgress.faq,
        name: 'FAQ',
        description: 'Add an FAQ to help users understand your project',
    },
    {
        id: ARC53FormProgress.extras,
        name: 'Extras',
        description: 'Add any extra information you would like to include by key & value',
    }
];

export default function HorizontalStepper({ className }: { className?: string }) {
    const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);
    const stateIndex = steps.findIndex(step => step.id === formProgress);

    return (
        <div className={cn(!!className ? className : '')}>
            <nav className="flex justify-center items-center flex-col" aria-label="Progress">
                <ol role="list" className="space-6 flex">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name}>
                            {stepIdx < stateIndex ? (
                                <div className="group">
                                    <span className="flex items-start">
                                        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                                            <CheckCircleIcon
                                                className="h-full w-full text-akita-purple group-hover:text-indigo-800"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="hidden md:inline ml-3 text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
                                            {step.name}
                                        </span>
                                    </span>
                                </div>
                            ) : formProgress === step.id ? (
                                <div className="flex items-start" aria-current="step">
                                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                                        <span className="absolute h-4 w-4 rounded-full bg-akita-purple/40" />
                                        <span className="relative block h-2 w-2 rounded-full bg-akita-purple" />
                                    </span>
                                    <span className="hidden md:inline ml-3 text-sm font-medium text-akita-purple">{step.name}</span>
                                </div>
                            ) : (
                                <div className="group">
                                    <div className="flex items-start">
                                        <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                                            <div className="h-2 w-2 rounded-full bg-zinc-600 group-hover:bg-zinc-700" />
                                        </div>
                                        <p className="hidden md:inline ml-3 text-sm font-medium text-zinc-500 group-hover:text-zinc-300">{step.name}</p>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

