import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanetsScreen from "../screens/Planets";
import PlanetDetailScreen from "../screens/PlanetDetails";

const Stack = createNativeStackNavigator();

export default function PlanetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Planets" 
        component={PlanetsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PlanetDetails" 
        component={PlanetDetailScreen} 
        options={{ title: "Planet Details" }} 
      />
    </Stack.Navigator>
  );
}
