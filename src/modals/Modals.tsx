import { useModals } from "./useModals";

export const Modals = () => {
  const view = useModals((state) => state.view);

  return (
    <>
      {view === "RequestLoan" && <RequestLoanModal />}
    </>
  );
};
