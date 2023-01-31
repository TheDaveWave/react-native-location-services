import { StyleSheet, Text, View } from "react-native";

export default function TemplateComponent() {
  return (
    <View>
      <Text style={styles.text}>This is a template component.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});
