import AppLoading from "expo-app-loading";
import { useState } from "react";
import * as Font from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/Main";
import Second from "./screens/Second";

const fetchFonts = () => {
  return Font.loadAsync({
    "helvetica-400": require("./assets/fonts/helvetica-400.ttf"),
  });
};

export default function App() {
  const [initFonts, setInitFonts] = useState<boolean>(false);

  const Stake = createNativeStackNavigator();

  if (!initFonts) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setInitFonts(true)}
        onError={console.log}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stake.Navigator>
        <Stake.Screen name="Boi Home" component={Main} />
        <Stake.Screen name="Second Page" component={Second} />
      </Stake.Navigator>
    </NavigationContainer>
  );
}
