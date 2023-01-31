import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import TemplateComponent from "../components/TemplateComponent";
import { TemplateContext } from "../context/TemplateContext";

export default function HomeScreen() {
  const { userInfo } = useContext(TemplateContext);

  return (
    <View style={styles.container}>
      <Text>This is the Home Screen.</Text>
      <Text>Here is some context: {userInfo.name}</Text>
      <TemplateComponent />
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
});
