import { Button } from "@/components/ui/button";
import { VscChevronRight } from "react-icons/vsc";

import Image from "next/image";
import { useRouter } from "next/router";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="bg-purple-800 w-full h-full bg-warm">
      <div className="h-[54%] w-full bg-[#EFC950] relative">
        <Image
          src="/img/main-bg.png"
          alt="Loan background"
          layout="fill"
          objectFit=""
        />
      </div>
      <div className="h-[46%] flex flex-col p-6 justify-between">
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-purple-900">
            Financial lifeline in your pocket.
          </h1>
          <p className="text-gray-300">
            Apply for loans instantly on your mobile.
          </p>
        </div>
        <Button
          className="bg-[#DB8323] text-[#E1D7D5] rounded-xl text-xl w-full items-center h-11"
          onClick={() => {
            router.push("/home");
          }}
        >
          Continue <VscChevronRight />
        </Button>
      </div>
    </div>
  );
}
