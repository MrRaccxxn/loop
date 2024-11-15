import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white p-4 flex flex-row justify-between gap-2 relative items-center rounded-3xl">
      <div className="flex flex-row gap-4">{children}</div>
    </div>
  );
};
