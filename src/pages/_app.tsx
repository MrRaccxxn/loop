import Layout from "@/components/Layout/Layout";
import { AppKit } from "@/contexts/appkit";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppKit>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppKit>
  );
}
