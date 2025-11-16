import React, {useState, useEffect} from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./styles";

export default function Films() {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFilms = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const json = await response.json();
      setFilms(json.results);
    } catch (err) {
      setError("Failed to load films");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text>Film Content</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.title}</Text>
            <Text>Episode: {item.episode_id}</Text>
            <Text>Release: {item.release_date}</Text>
          </View>
        )}
      />
    </View>
  );
}
