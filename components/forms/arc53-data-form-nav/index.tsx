'use client'

import { useContext } from "react";
import { Context as FormDisplayContext } from "@/providers/form-display"
import { ARC53FormProgress, ARC53FormProgressOrder } from "@/types/form";
import Arc53CreateFileButton from "@/components/buttons/create-arc53-file-button";

export default function Arc53DataFormNav() {
  const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);

  return (
    <div className="bg-black flex justify-end gap-2 pb-4">
      {
        (() => {
          switch (formProgress) {
            case ARC53FormProgress.token:
              return (
                <button
                  className="block p-2 bg-akita-purple text-white rounded-md"
                  type="button"
                  onClick={() => {
                    const nextStep = ARC53FormProgressOrder.findIndex((step: ARC53FormProgress) => step === formProgress) + 1;
                    setFormProgress(ARC53FormProgressOrder[nextStep])
                  }}
                >
                  Next
                </button>
              )
            case ARC53FormProgress.associate:
            case ARC53FormProgress.collection:
            case ARC53FormProgress.faq:
              return (
                <>
                  <button
                    className="block p-2 bg-akita-purple text-white rounded-md"
                    type="button"
                    onClick={() => {
                      const nextStep = ARC53FormProgressOrder.findIndex((step: ARC53FormProgress) => step === formProgress) - 1;
                      setFormProgress(ARC53FormProgressOrder[nextStep])
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="block p-2 bg-akita-purple text-white rounded-md"
                    type="button"
                    onClick={() => {
                      const nextStep = ARC53FormProgressOrder.findIndex((step: ARC53FormProgress) => step === formProgress) + 1;
                      setFormProgress(ARC53FormProgressOrder[nextStep])
                    }}
                  >
                    Next
                  </button>
                </>
              )
            case ARC53FormProgress.extras:
              return (
                <>
                  <button
                    className="p-2 bg-akita-purple text-white rounded-md"
                    type="button"
                    onClick={() => {
                      const nextStep = ARC53FormProgressOrder.findIndex((step: ARC53FormProgress) => step === formProgress) - 1;
                      setFormProgress(ARC53FormProgressOrder[nextStep])
                    }}
                  >
                    Back
                  </button>
                  <Arc53CreateFileButton />
                </>
              )
          }
        })()
      }
    </div>
  )
}