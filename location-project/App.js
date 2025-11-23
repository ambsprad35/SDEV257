import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location"

export default function App() {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        console.log("Permission denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
       <StatusBar style="dark" />

       {location && (
          <MapView style={styles.mapview}
            showsUserLocation={true}
            followUserLocation={true}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
          <Marker
            title="Burger King"
            description="BK Haveit Your Way!"
            coordinate={{
              latitude: 39.8080086,
              longitude: -86.0751343,
            }}
            pinColor="red"
            />
          </MapView>
       )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapview: {
    alignSelf: "stretch",
    height: 450,
    margin: 30,
  }
});
