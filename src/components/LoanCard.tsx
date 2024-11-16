import { chainContractConfig } from "@/contexts/chainContext";
import { sliceString } from "@/utils/utils";
import { useRouter } from "next/router";
import React from "react";
import { useReadContract } from "wagmi";

const LoanCard = ({
  name,
  amountBorrowed,
  amountToPay,
  isPaid,
}: {
  name: string;
  amountBorrowed: number;
  amountToPay: number;
  isPaid: boolean;
}) => {
  const router = useRouter();

  const { data: lastLoan } = useReadContract({
    ...chainContractConfig["celoAlfajor"].microloan,
    functionName: "loanCounter",
  });

  return (
    <div
      className="max-w-sm bg-white shadow-lg rounded-lg p-5 border text-black cursor-pointer"
      onClick={() => {
        router.push({
          pathname: "/pay-loan",
          query: {
            name,
            amountBorrowed,
            amountToPay,
            isPaid,
          },
        });
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Loan Information</h2>
        <div
          className={`flex items-center ${
            isPaid ? "text-blue-600" : "text-orange-700"
          }`}
        >
          {isPaid ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="ml-2 text-sm">{isPaid ? "Paid" : "Unpaid"}</span>
        </div>
      </div>

      {/* Loan Details */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="">Loan ID:</span>
          <span className="font-medium">{Number(lastLoan) - 1}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Name:</span>
          <span className="font-medium">{sliceString(name)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Amount Borrowed:</span>
          <span className="font-medium">${amountBorrowed.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Amount to Pay:</span>
          <span className="font-medium">${amountToPay.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
