// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_CELO_ALFAJORES = "0x5f1e2b8A0790E547a7348428a8ea93353aDacb3D";
const MicroLoansModule = buildModule("MicroLoansModule", (m) => {
  // const loanEligibility = m.contract("Token");
  //   return { loanEligibility };

  const microLoans = m.contract("MicroLoans", [TOKEN_CELO_ALFAJORES]);
  return { microLoans };
});

export default MicroLoansModule;
