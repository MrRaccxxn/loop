import ClientRehydration from "@/components/Clienthydratation";
import Layout from "@/components/Layout/Layout";
import { AppKit } from "@/contexts/appkit";
import { config } from "@/contexts/wagmiConfig";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ClientRehydration>
      <AppKit>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </WagmiProvider>
      </AppKit>
    </ClientRehydration>
  );
}
