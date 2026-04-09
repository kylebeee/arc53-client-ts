'use client'

import { useContext } from "react";
import { Context as FormDisplayContext } from "@/providers/form-display"
import { ARC53FormProgress, ARC53FormProgressOrder } from "@/types/form";
import Arc53CreateFileButton from "@/components/buttons/create-arc53-file-button";
import NFDUpdateFlow from "@/components/wallet/nfd-update-flow";
import { Arc53 } from "@/types";

interface Arc53DataFormNavProps {
  buildPayload: () => Arc53;
}

export default function Arc53DataFormNav({ buildPayload }: Arc53DataFormNavProps) {
  const { state: formProgress, setState: setFormProgress } = useContext(FormDisplayContext);

  const currentIndex = ARC53FormProgressOrder.findIndex(s => s === formProgress);

  const goBack = () => setFormProgress(ARC53FormProgressOrder[currentIndex - 1]);
  const goNext = () => setFormProgress(ARC53FormProgressOrder[currentIndex + 1]);

  return (
    <div className="bg-black pb-4 pt-2">
      {formProgress === ARC53FormProgress.extras ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <button className="p-2 bg-akita-purple text-white rounded-md" type="button" onClick={goBack}>
              Back
            </button>
            <Arc53CreateFileButton />
            <NFDUpdateFlow buildPayload={buildPayload} />
          </div>
        </div>
      ) : (
        <div className="flex justify-end gap-2">
          {currentIndex > 0 && (
            <button className="p-2 bg-akita-purple text-white rounded-md" type="button" onClick={goBack}>
              Back
            </button>
          )}
          <button className="p-2 bg-akita-purple text-white rounded-md" type="button" onClick={goNext}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}
