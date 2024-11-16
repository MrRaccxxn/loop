// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_CELO_ALFAJORES="0xda59399067AbFb905E88eB46A91d81318C68365d";

const MicroLoansModule = buildModule("MicroLoansModule", (m) => {
  // const loanEligibility = m.contract("Groth16Verifier");
  //   return { loanEligibility };

  const microLoans = m.contract("MicroLoans", [TOKEN_CELO_ALFAJORES]);
  return { microLoans };
});

export default MicroLoansModule;
