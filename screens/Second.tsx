import { StatusBar } from "expo-status-bar";
import { useMoralis } from "react-moralis";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import useNativeBalance from "../frontend/hooks/useNativeBalance";

export default function Second({ navigation }) {
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();
  const { balance, loading } = useNativeBalance("0x89");
  const logoutUser = () => {
    if (isAuthenticated) {
      logout();
      navigation.replace("Auth");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textContent}>This is the Profile Page</Text>
      <View style={styles.button}>
        <Button
          title="Logout"
          color="white"
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F",
          }}
          onPress={logoutUser}
          loadingProps={{ animating: true }}
        ></Button>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.name}>💰 {/* {nativeBalance} */} </Text>
      </View>
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
  textContent: {
    fontFamily: "helvetica-400",
  },
  button: {
    width: 200,
    backgroundColor: "red",
    elevation: 10,
    borderRadius: 15,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    marginVertical: 5,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
});
