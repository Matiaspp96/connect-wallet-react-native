import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import WalletConnectProvider, { WalletConnectProviderProps } from "@walletconnect/react-native-dapp";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
import { enableViaWalletConnect } from "./enableMoralisViaMoralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider";
import { expo } from "./app.json";
const { scheme } = expo;
import "intl";
import { Platform } from "react-native";

if (Platform.OS === "android") {
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}
import "intl/locale-data/jsonp/en";

interface ProvidersProps {
  readonly children: JSX.Element;
}

import { MoralisProvider } from "react-moralis";

import Moralis from "moralis/react-native.js";
Moralis.setAsyncStorage(AsyncStorage);
//@ts-ignore
Moralis.enable = enableViaWalletConnect;
console.log(AsyncStorage.getAllKeys(), "KEYS");
const appId = `${process.env.REACT_APPMORALIS_APPLICATION_ID}`;
Moralis.initialize(appId);

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const AppProviders = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL!}
        environment="native"
      >
        <MoralisDappProvider>{children}</MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
