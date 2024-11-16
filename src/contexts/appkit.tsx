"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { celoAlfajores, flowTestnet } from "@reown/appkit/networks";
import { ReactNode } from "react";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_APP_ID ?? "";

// 2. Create a metadata object
const metadata = {
  name: "www.loop.com",
  description: "Loop",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [celoAlfajores, flowTestnet],
  projectId,
});

export function AppKit({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
