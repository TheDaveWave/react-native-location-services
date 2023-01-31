import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TemplateComponent from "../components/TemplateComponent";
import { TemplateContext } from "../context/TemplateContext";

export default function HomeScreen() {
  const {
    userInfo,
    getPermissions,
    getLocation,
    location,
    coords,
    trackLocation,
    stopTracking,
  } = useContext(TemplateContext);

  return (
    <View style={styles.container}>
      <Text>This is the Home Screen.</Text>
      <Text>Here is some context: {userInfo.name}</Text>
      <TemplateComponent />
      <Button title="Request Permissions" onPress={() => getPermissions()} />
      <Button title="Get Location" onPress={() => getLocation()} />
      <Button title="Start Tracking" onPress={() => trackLocation()}/>
      {location && (
        <View>
          <Text>{`${location.name}, ${location.city}, ${location.region} ${location.postalCode}`}</Text>
          <Text>{`${coords.latitude}, ${coords.longitude}`}</Text>
        </View>
      )}
      <Button title="Stop Tracking" onPress={() => stopTracking()}/>
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
