import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// component imports:
import ScreenNav from "./ScreenNav.js";

export default function AppNav() {
  return (
    <NavigationContainer>
      <ScreenNav />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
