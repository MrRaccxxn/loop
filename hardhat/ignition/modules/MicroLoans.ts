// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_CELO_ALFAJORES = "0xc796EeE09c7c88735984b81009b2550ec31F2E2E";
const MicroLoansModule = buildModule("MicroLoansModule", (m) => {
  // const loanEligibility = m.contract("Token");
  //   return { loanEligibility };

  const microLoans = m.contract("MicroLoans", [TOKEN_CELO_ALFAJORES]);
  return { microLoans };
});

export default MicroLoansModule;
