import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View, Text, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

import styles from './styles';
import PlanetStack from './navigation/PlanetNav';
import Planets from './screens/Planets';
import Films from './screens/Films';
import Spaceships from './screens/Spaceships';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isConnected, setIsconnected] = React.useState(null);

  // Subscribe to network status changes
  React.useEffect(() => {
    const handleNetInfo = (state) => {
      // Web override
      if (Platform.OS === 'web') {
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
    if (Platform.OS === 'web') {
      const goOnline = () => setIsconnected(true);
      const goOffline = () => setIsconnected(false);

      window.addEventListener('online', goOnline);
      window.addEventListener('offline', goOffline);

      return () => {
        window.removeEventListener('online', goOnline);
        window.removeEventListener('offline', goOffline);
        unsubscribe();
      };
    }

    return () => unsubscribe();
  }, []);

  // Show loading indicator for a slow loading network
  if (isConnected === null) {
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
    );
  }

  // The network is online and the app will load
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === 'android' ? (
          <Drawer.Navigator>
            <Drawer.Screen
              name="Planets"
              children={(props) => (
                <PlanetStack {...props} isConnected={isConnected} />
              )}
            />
            <Drawer.Screen
              name="Films"
              children={(props) => <Films {...props} />}
            />
            <Drawer.Screen
              name="Spaceships"
              children={(props) => <Spaceships {...props} />}
            />
          </Drawer.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name="Planets"
              children={(props) => (
                <PlanetStack {...props} isConnected={isConnected} />
              )}
              options={{
                gestureEnabled: false, 
              }}
            />
            <Tab.Screen
              name="Films"
              children={(props) => <Films {...props} />}
              options={{
                gestureEnabled: false, 
              }}
            />
            <Tab.Screen
              name="Spaceships"
              children={(props) => <Spaceships {...props} />}
              options={{
                gestureEnabled: false, 
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
