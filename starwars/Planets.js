import React, {useEffect, useState} from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./styles";


export default function Planets() {
  /* Create Arrays */
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Fetch Star Wars Api */
  const fetchPlanets = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/planets/");
      const json = await response.json();
      setPlanets(json.results);
    } catch (err) {
      setError("Failed to load planets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  /* Display either loading indicator or error message */
  if(loading) return <ActivityIndicator size="large" style={{ marginTop: 50}} />;
  if(error) return <Text style={styles.error}>{error}</Text>;
  
  return (
    /* Display info from Star Wars API as a list */
    <View style={styles.container}>
      <Text>Planets Content</Text>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Climate: {item.climate}</Text>
            <Text>Population: {item.population}</Text>
          </View>
        )}
      />
    </View>
  );
}
