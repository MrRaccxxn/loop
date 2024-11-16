import { http, createConfig } from "wagmi";
import { celoAlfajores, flowTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [celoAlfajores, flowTestnet],
  transports: {
    [celoAlfajores.id]: http(),
    [flowTestnet.id]: http(),
  },
});