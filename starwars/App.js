import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View, Text, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";

import styles from "./styles";
import Planets from "./Planets";
import Films from "./Films";
import Spaceships from "./Spaceships";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const [isConnected, setIsconnected] = React.useState(null);

  // Subscribe to network status changes
  React.useEffect(() => {
    const handleNetInfo = (state) => {

      // Web override
      if (Platform.OS === "web") {
        setIsconnected(navigator.onLine);
        return;
      }
      const reachable = 
        state.isInternetReachable === null
          ? state.isConnected
          : state.isConnected && state.isInternetReachable;

      setIsconnected(reachable);
    };

    const unsubscribe = NetInfo.addEventListener(handleNetInfo);

    // Initial nnetwork check
    NetInfo.fetch().then(handleNetInfo);

    // Add listeners for network reconnection for web
    if (Platform.OS === "web") {
      const goOnline = () => setIsconnected(true);
      const goOffline = () => setIsconnected(false);

      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);

      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
        unsubscribe();
    };
  }

    return () => unsubscribe();
  }, []);

  // Show loading indicator for a slow loading network
  if(isConnected === null){
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // There is no available network
  if (isConnected === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>You are offline.</Text>
        <Text style={styles.message}>
          Please check your network connection.
        </Text>
      </View>
    )
  }

  // The network is online and the app will load
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <NavigationContainer>
        {Platform.OS === "ios" ? (
          <Tab.Navigator screenOptions={{ swipeEnabled: true}}>
            <Tab.Screen name="Planets">{() => <Planets />}</Tab.Screen>
            <Tab.Screen name="Films">{() => <Films />}</Tab.Screen>
            <Tab.Screen name="Spaceships">{() => <Spaceships />}</Tab.Screen>
          </Tab.Navigator>
        ) : Platform.OS === "android" ? (
          <Drawer.Navigator
            screenOptions={{
              swipeEnabled: true,
              gestureEnabled: true,
            }}>
            <Drawer.Screen name="Planets">{() => <Planets />}</Drawer.Screen>
            <Drawer.Screen name="Films">{() => <Films />}</Drawer.Screen>
            <Drawer.Screen name="Spaceships">
              {() => <Spaceships />}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
        <Tab.Navigator>
          <Tab.Screen 
            name="Planets"
            children={() => <Planets isConnected={isConnected} />}
          />
          <Tab.Screen 
            name="Films"
            children={() => <Films />}
          />
          <Tab.Screen 
            name="Spaceships"
            children={() => <Spaceships />}
          />
        </Tab.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
