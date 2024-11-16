// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FixedInterestLoanModule = buildModule("FixedInterestLoanModule", (m) => {
  const fixedInterestLoan = m.contract("FixedInterestLoan");

  return { fixedInterestLoan };
});

export default FixedInterestLoanModule;
