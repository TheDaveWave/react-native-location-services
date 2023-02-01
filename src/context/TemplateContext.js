import { useEffect } from "react";
import { createContext, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

// create export for context.
export const TemplateContext = createContext();

// export the template provider.
export function TemplateProvider({ children }) {
  // create test data for context.
  const [userInfo, setUserInfo] = useState({ id: 1, name: "Your Name" });
  const [loading, setLoading] = useState(false);

  // permissions:
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  async function getPermissions() {
    // if (permission === null) {
    await requestPermission()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    await Location.requestForegroundPermissionsAsync()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    await Location.requestBackgroundPermissionsAsync()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }

  // location services:
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [previousLocation, setPreviousLocation] = useState({});
  const [userLocations, setUserLocations] = useState([]);

  async function getLocation() {
    await Location.getCurrentPositionAsync()
      .then((res) => {
        console.log(res);
        const location = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        };
        setCoords(location);
        setPreviousLocation(res);
        setUserLocations([
          ...userLocations,
          res
        ]);
        Location.reverseGeocodeAsync(location)
          .then((res) => {
            console.log(res[0]);
            setLocation(res[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  TaskManager.defineTask(
    "LOCATION_TRACKING",
    ({ data: { locations }, err }) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Received new locations", locations);
      let recentLocation = {
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude,
      };
      if (
        previousLocation.coords.latitude === recentLocation.latitude &&
        previousLocation.coords.longitude === recentLocation.longitude
      ) {
        setPreviousLocation(locations[0]);
        console.log("set new previous location");
      } else {
        setPreviousLocation(recentLocation);
        console.log(previousLocation);
        setUserLocations([...userLocations, locations[0]]);
        console.log("updated user locations");
      }
      console.log("user locations:", userLocations);
    }
  );

  async function trackLocation() {
    await Location.startLocationUpdatesAsync("LOCATION_TRACKING", {
      deferredUpdatesInterval: 2000,
    });
    console.log("Started tracking");
  }

  async function stopTracking() {
    await Location.stopLocationUpdatesAsync("LOCATION_TRACKING");
    console.log("Stopped tracking.");
  }

  // useEffect(() => {
  //   setUserInfo({
  //     id: 1,
  //     name: "Your Name",
  //   });
  // }, []);

  return (
    <TemplateContext.Provider
      value={{
        userInfo,
        getPermissions,
        getLocation,
        location,
        coords,
        trackLocation,
        stopTracking,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
