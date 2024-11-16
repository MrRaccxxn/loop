import { useAppKitAccount } from "@reown/appkit/react";

import Home from "./home";
import Login from "./Login";

export default function MainPage() {
  const { isConnected } = useAppKitAccount();

  return <>{isConnected ? <Home /> : <Login />}</>;
}
