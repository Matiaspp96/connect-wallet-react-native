import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Navigation from "../types";
// import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useWalletConnect } from "../WalletConnect";
import { useMoralis } from "react-moralis";
import { enableViaWalletConnect } from "../enableMoralisViaMoralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider";
import { useEffect, useState } from "react";

export default function Main({ navigation }: any) {
  const {
    web3,
    Moralis,
    user,
    authenticate,
    authError,
    isAuthenticated,
    isInitialized,
    isAuthenticating,
  } = useMoralis();
  const connector = useWalletConnect();
  const [loading, setLoading] = useState(false);
  const user1 = Moralis.User.current();
  useEffect(() => {
    if (isInitialized) {
      setLoading(false);
    }
  }, [isInitialized]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Boi Test Wallet Connect</Text>
      <Text style={styles.textContent}>
        This is the Main {JSON.stringify(user1)}{" "}
        {isAuthenticated ? "true" : "false"}
        {isAuthenticating ? "true" : "false"}
      </Text>
      <Button
        onPress={() => {
          (navigation as Navigation).navigate("Second Page");
        }}
        title="Go to Profile Page"
      />
      <Button
        onPress={() => {
          //@ts-ignore
          authenticate({ connector })
            .then((user) => {
              console.log(user);
              if (authError) {
                console.log(authError.message);
              } else {
                if (isAuthenticated) {
                  console.log("Ready to use Moralis");
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        title="Connect Your Wallet"
      />
      {/* <Button
        onPress={async () => {
          // connector.sendTransaction({
          //   from: connector.accounts[0],
          //   to: "0x3a339C136F4482f348e3921EDBa8b8Ebd6931f08",
          //   value: "10000000000000000"
          // })
        }}
        title="SEND"
      />*/}
      <Button
        onPress={() => {
          connector.killSession();
        }}
        title="DISCONNECT"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "helvetica-400",
    fontSize: 20,
    marginBottom: 20,
  },
  textContent: {
    fontFamily: "helvetica-400",
  },
});
