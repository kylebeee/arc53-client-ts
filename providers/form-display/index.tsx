'use client'

import { Dispatch, SetStateAction, createContext } from "react";
import { ARC53FormProgress } from "@/types/form";
import { useState } from "react"

export interface FormDisplayContextState {
  progress: ARC53FormProgress;
}

export interface FormDisplayContext {
  state: ARC53FormProgress;
  setState: Dispatch<SetStateAction<ARC53FormProgress>>;
}

export const Context = createContext<FormDisplayContext>({
  state: ARC53FormProgress.token,
  setState: () => {},
});


export default function FormDisplayProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ARC53FormProgress>(ARC53FormProgress.token);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  )
}