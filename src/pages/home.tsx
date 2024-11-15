import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {} from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

import { FaPlus } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/router";
import { HiDotsHorizontal } from "react-icons/hi";
import { Card } from "@/components/Card";

export default function Home() {
  const router = useRouter();

  const transactions = [
    {
      name: "Hola",
      type: "income",
      amount: 1000,
      date: "2021-10-10",
    },
    {
      name: "Hola",
      type: "income",
      amount: 1000,
      date: "2021-10-10",
    },
    {
      name: "Hola",
      type: "income",
      amount: 1000,
      date: "2021-10-10",
    },
  ];

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

        <div className="absolute top-0 left-0">
          <div className="flex flex-row gap-2 items-center m-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-white">Hello, Shad</p>
              <p className="text-white">Welcome back!</p>
            </div>
          </div>
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
            <p className="font-bold text-2xl text-purple-900">USD $8,323.12</p>
          </div>
          <div className="">Flag</div>
        </div>
      </div>
      <div className="w-full bg-warm h-[500px] p-4 pt-12 gap-4 flex flex-col">
        <div className="flex flex-row gap-2 items-end">
          <Button className="rounded-2xl flex flex-row gap-2">
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
            <p className="font-bold text-md text-purple-900">
              Last transactions
            </p>
            <p className="text-xs text-blue-200 cursor-pointer hover:text-blue-300">
              See more
            </p>
          </div>
         <div className="flex flex-col gap-3 pt-2">
         {transactions.map((transaction) => (
            <Card key={transaction.name}>
              <div className="flex flex-col">
                <p className="text-purple-900 font-bold">{transaction.name}</p>
                <p className="text-gray-100 text-xs">{transaction.date}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-purple-900 font-bold">
                  {transaction.amount}
                </p>
                <p className="text-gray-100 text-xs">{transaction.type}</p>
              </div>
            </Card>
          ))}
         </div>
        </div>
      </div>
    </div>
  );
}
