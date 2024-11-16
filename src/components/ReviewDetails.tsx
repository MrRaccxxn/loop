import { sliceString } from "@/utils/utils";
import React from "react";

const ReviewDetails = ({
  name,
  amountBorrowed,
  amountToPay,
}: {
  name: string;
  amountBorrowed: string;
  amountToPay: string;
}) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg p-6 border border-gray-300 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 style={{ color: "#333333" }} className="text-lg font-bold">
          Loan Review
        </h2>
        <div style={{ color: "#888888" }} className="text-xs">
          Receipt
        </div>
      </div>

      {/* Borrower Details */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span style={{ color: "#555555" }}>Borrower&apos;s wallet:</span>
          <span style={{ color: "#333333" }} className="font-medium">
            {sliceString(name)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "#555555" }}>Amount Borrowed:</span>
          <span style={{ color: "#333333" }} className="font-medium">
            ${amountBorrowed}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "#555555" }}>Amount to Pay:</span>
          <span style={{ color: "#333333" }} className="font-medium">
            ${amountToPay}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t" style={{ borderColor: "#e0e0e0" }}></div>

      {/* Total Balance */}
      <div className="flex justify-between text-lg font-semibold">
        <span style={{ color: "#333333" }}>Total Balance</span>
        <span style={{ color: "#007bff" }}>${amountToPay}</span>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-center" style={{ color: "#888888" }}>
        <p>Loan terms are subject to change. Please stay updated.</p>
        <p>For any inquiries, contact your loan representative.</p>
      </div>
    </div>
  );
};

export default ReviewDetails;
