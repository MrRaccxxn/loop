import { create } from "zustand";

/**
 * Types
 */
type ModalData = {
  error?: "NotFound" | undefined;
};

type IModalStore = {
  isOpen: boolean;
  view?:
    | "RequestLoan";
  data?: ModalData;
  open: (view: IModalStore["view"], data?: ModalData) => void;
  close: () => void;
};

/**
 * Zustand Store
 */

export const useModals = create<IModalStore>((set) => ({
  isOpen: false,
  view: undefined,
  data: undefined,
  open: (view: IModalStore["view"], data?: ModalData) => {
    set({
      isOpen: true,
      view,
      data,
    });
  },
  close: () => {
    set({
      isOpen: false,
      view: undefined,
      data: undefined,
    });
  },
}));
