// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MicroLoansModule = buildModule("MicroLoansModule", (m) => {
  const microLoans = m.contract("MicroLoans");

  return { microLoans };
});

export default MicroLoansModule;
