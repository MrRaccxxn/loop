import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import {} from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ImFileEmpty } from "react-icons/im";
import web3 from "web3";
import { useReadContract } from "wagmi";

import { FaPlus } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/router";
import { HiDotsHorizontal } from "react-icons/hi";
import { Header } from "@/components/Layout/Header";
import { chainContractConfig } from "@/contexts/chainContext";
import { useAppKitAccount } from "@reown/appkit/react";
import LoanCard from "@/components/LoanCard";

export default function Home() {
  const router = useRouter();
  const { address } = useAppKitAccount();
  const { data: lastLoan } = useReadContract({
    ...chainContractConfig["celoAlfajor"].microloan,
    functionName: "loanCounter",
  });

  const { data: lastTransaction } = useReadContract({
    ...chainContractConfig["celoAlfajor"].microloan,
    functionName: "loans",
    args: [Number(lastLoan) - 1],
  });

  const tokenBalance = useReadContract({
    ...chainContractConfig["celoAlfajor"].token,
    functionName: "balanceOf",
    args: [address ?? ""],
  });

  function numberWithCommas(x: string) {
    const parts = x?.toString()?.split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?=$))/g, ",") +
      (parts[1] ? "." + parts[1] : "")
    );
  }

  const getNumber = (bigNumber: string | undefined | null): number => {
    const number = Number(
      parseFloat(web3.utils.fromWei(Number(bigNumber), "ether"))
    );

    return number;
  };

  const formatNumber = (bigNumber: string | undefined | null): string => {
    //@ts-expect-error expecting error
    return numberWithCommas(getNumber(bigNumber?.toString()));
  };

  return (
    <div className="relative flex flex-col items-center bg-purple-800">
      <div
        className="relative w-full h-[250px] bg-cool text-orange-200 p-4"
        style={{}}
      >
        <Image
          src="/img/cover.png"
          alt="Loan background"
          layout="fill"
          objectFit=""
          className=""
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute h-20 inset-0 bg-black opacity-20"></div>

        <div className="absolute top-0 left-0 w-full flex justify-end ">
          <Header />
        </div>
        <div
          className="absolute h-24 bottom-0 rounded-xl w-full text-center p-4 -pt-14 bg-white  -mb-6 -border-spacing-x-8 flex flex-row items-center justify-between"
          style={{
            left: "16px",
            width: "calc(96% - 16px)",
          }}
        >
          <div className="flex flex-col">
            <p className="text-start text-gray-300 opacity-50">
              Total balance:
            </p>
            <p className="font-bold text-2xl text-purple-900">
              USD {formatNumber(tokenBalance.data as string)}
            </p>
          </div>

          <div className="relative w-8 h-8">
            <Image
              src={"/icons/usa_flag.svg"}
              alt="USA"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-warm h-[500px] p-4 pt-12 gap-4 flex flex-col">
        <div className="flex flex-row gap-2 items-end overflow-x-auto">
          <Button
            className="rounded-2xl flex flex-row gap-2"
            onClick={() => {
              router.push("/request-loan");
            }}
          >
            <FaPlus />
            Add loan
          </Button>

          <Button className="rounded-2xl">
            <MdArrowOutward />
            Transfer money
          </Button>

          <Button className="rounded-2xl">
            <HiDotsHorizontal />
          </Button>
        </div>
        <div className="bg-white p-4 flex flex-row justify-between gap-2 relative items-center rounded-3xl">
          <div className="flex flex-row gap-4">
            <Image
              src="/icons/wallet.png"
              alt="Wallet"
              height={20}
              width={40}
              className=""
            />
            <div className="flex flex-col gap-0">
              <p className="text-purple-900 font-bold">Upgrade your loan</p>
              <p className="text-gray-100 text-xs">View more</p>
            </div>
          </div>
          <div className="rounded-full bg-disabled w-8 h-8 flex items-center justify-center">
            <IoIosArrowRoundForward color="#ffffff" className="w-7 h-7" />
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between items-end pt-4">
            <p className="font-bold text-md text-purple-900">Your Loans</p>
            <p className="text-xs text-blue-200 cursor-pointer hover:text-blue-300">
              See more
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            {lastTransaction &&
            //@ts-expect-error expecting error

            lastTransaction?.[0]?.toLowerCase() === address?.toLowerCase() &&
            //@ts-expect-error expecting error

            lastTransaction?.[5] === false ? (
              <LoanCard
                //@ts-expect-error expecting error

                amountBorrowed={web3.utils.fromWei(
                  //@ts-expect-error expecting error
                  lastTransaction?.[2],
                  "ether"
                )}
                amountToPay={
                  //@ts-expect-error expecting error
                  web3.utils.fromWei(lastTransaction?.[3], "ether") * 1000
                }
                //@ts-expect-error expecting error

                isPaid={lastTransaction?.[5]}
                //@ts-expect-error expecting error

                name={lastTransaction?.[1]}
              />
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center pt-14">
                <ImFileEmpty className="w-12 h-12 fill-black" />
                <p className="text-black opacity-40 text-xs font-extralight">
                  You don&apos;t have loans to show
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
