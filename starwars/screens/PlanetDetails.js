import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

export default function PlanetDetailScreen({ route, navigation }) {
  const { planet } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{planet.name || planet.title}</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        {planet.climate && <Detail label="Climate" value={planet.climate} />}
        {planet.terrain && <Detail label="Terrain" value={planet.terrain} />}
        {planet.gravity && <Detail label="Gravity" value={planet.gravity} />}
        {planet.population && <Detail label="Population" value={planet.population} />}
        {planet.diameter && <Detail label="Diameter" value={planet.diameter} />}
        {planet.rotation_period && <Detail label="Rotation Period" value={planet.rotation_period} />}
        {planet.orbital_period && <Detail label="Orbital Period" value={planet.orbital_period} />}
        {planet.surface_water && <Detail label="Surface Water" value={planet.surface_water} />}
      </View>
    </ScrollView>
  );
}

const Detail = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "bold" },
  close: { color: "#1e90ff", fontWeight: "600" },
  section: { marginTop: 10 },
  row: { marginBottom: 12 },
  label: { fontWeight: "600", color: "#555" },
  value: { fontSize: 16 },
});
