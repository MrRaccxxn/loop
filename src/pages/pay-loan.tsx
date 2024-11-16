import { Button } from "@/components/ui/button";
import { useReadContract, useWriteContract } from "wagmi";
import Image from "next/image";
import { useRouter } from "next/router";
import { z } from "zod";
import { chainContractConfig } from "@/contexts/chainContext";
import web3 from "web3";
import ReviewDetails from "@/components/ReviewDetails";

const LoanPeriod = z.enum(["1", "3", "6", "12", "24"]);
export type LoanPeriod = z.infer<typeof LoanPeriod>;

const LoanMethod = z.enum(["COLLATERAL", "BANK_STATEMENT"]);
export type LoanMethod = z.infer<typeof LoanMethod>;

const RequestLoanInput = z.object({
  amount: z.number(),
  period: LoanPeriod.nullish(),
  loanMethod: LoanMethod.nullish(),
});

export type RequestLoanInput = z.infer<typeof RequestLoanInput>;

export default function PayLoan() {
  const router = useRouter();
  const { data: lastLoan } = useReadContract({
    ...chainContractConfig["celoAlfajor"].microloan,
    functionName: "loanCounter",
  });

  const { writeContract, isPending, error } = useWriteContract();

  return (
    <div className="bg-purple-800 w-full h-full bg-white">
      <div className="h-[30%] w-full bg-[#EFC950] relative">
        <Image
          src="/img/request-loan-bg.png"
          alt="Loan background"
          layout="fill"
          objectFit="fill"
        />
      </div>
      <div className="w-full flex flex-col justify-between p-4 items-center">
        <ReviewDetails
          amountBorrowed={router.query.amountBorrowed as string}
          amountToPay={router.query.amountToPay as string}
          name={router.query.name as string}
        />
        {/* <p className="text-black text-xs">{error?.message}</p> */}
        <div className="flex flex-col gap-2 w-full pt-12">
          <Button
            className="bg-[#DB8323] text-[#ffffff] rounded-xl text-md w-full items-center h-11 disabled:bg-gray-300"
            disabled={isPending}
            onClick={() => {
              writeContract({
                ...chainContractConfig["celoAlfajor"].microloan,
                functionName: "repayLoan",
                value: web3.utils.toBigInt(router.query.amountToPay as string),
                args: [Number(lastLoan) - 1],
              });
            }}
          >
            Pay
          </Button>
          <Button
            className="text-black"
            variant={"ghost"}
            onClick={() => {
              router.push("/home");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
