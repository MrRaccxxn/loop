import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    "celo-alfajores": {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
  etherscan: {
    apiKey: {
      "celo-alfajores": process.env.ETHERSCAN_API_KEY ?? "",
    },
    customChains: [
      {
        network: "celo-alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-alfajores.blockscout.com/api",
          browserURL: "https://celo-alfajores.blockscout.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  // networks: {
  //   hardhat: {
  //   },
  //   celoAlfajor: {
  //     url: "https://alfajores-forno.celo-testnet.org",
  //     accounts: [process.env.PRIVATE_KEY ?? ""]
  //   }
  // },
};

export default config;
