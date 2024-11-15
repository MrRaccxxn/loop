import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mobile-container w-full sm:max-w-[420px] h-full sm:h-[740px] bg-white shadow-xl rounded-2xl overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
