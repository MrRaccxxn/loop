import { create } from "zustand";

interface LoanState {
  step: number;
  setStep: (step: number) => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  step: 1,
  setStep: (step: number) => set(() => ({ step })),
}));
