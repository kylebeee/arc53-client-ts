'use client'

import CheckIcon from "@/components/icons/check"
import { cn } from "@/functions/tailwind"
import { useContext } from "react"
import { Context as FormDisplayContext } from "@/providers/form-display"
import { ARC53FormProgress } from "@/types/form"

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

export default function VerticalStepper() {
  const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);
  const stateIndex = steps.findIndex(step => step.id === formProgress);

  return (
    <nav className="h-full fixed max-w-80" aria-label="Progress">
      <h1 className="text-4xl font-extrabold">ARC53 BUILDER</h1>
      <ol role="list" className="pt-2 overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
            {stepIdx < stateIndex ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-akita-purple" aria-hidden="true" />
                ) : null}
                <div
                  className="group relative flex items-start cursor-pointer"
                  onClick={() => setFormProgress(step.id)}
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-akita-purple group-hover:bg-akita-purple-dark">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </div>
              </>
            ) : formProgress === step.id ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                ) : null}
                <div
                  className="group relative flex items-start cursor-pointer"
                  aria-current="step"
                  onClick={() => setFormProgress(step.id)}
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-akita-purple bg-akita-purple">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-akita-purple">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                ) : null}
                <div
                  className="group relative flex items-start cursor-pointer"
                  onClick={() => setFormProgress(step.id)}
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
