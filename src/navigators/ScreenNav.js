import { createNativeStackNavigator } from "@react-navigation/native-stack";

// component imports:
import HomeScreen from "../screens/HomeScreen";

// set createNativeStackNavigator to Stack.
const Stack = createNativeStackNavigator();

export default function ScreenNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
