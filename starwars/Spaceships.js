import React, {useEffect, useState} from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./styles";

export default function Spaceships() {
  
  /* Create Spaceships arrays */
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Gat data from Star Wars Spaceships API */
  const fetchShips = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/starships/");
      const json = await response.json();
      setShips(json.results);
    } catch (err) {
      setError("Failed to load spaceships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShips();
  }, []);

  /* Display laoding indicator or error message when needed */
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50}} />;
  if(error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text>Spaceships Content</Text>
      <FlatList 
        data={ships}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Crew: {item.crew}</Text>
          </View>
        )}
      />
    </View>
  );
}
