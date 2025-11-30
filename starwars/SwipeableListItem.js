import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function SwipeableListItem({ item, onSwipe }) {
  function handleScroll(e) {
    const offsetX = e.nativeEvent.contentOffset.x;
    if (offsetX >= 100) {
      onSwipe(item);
    }
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={10}
      onScroll={handleScroll}
      style={styles.container}
    >
      <View style={styles.card}>
        {item.name && <Text style={styles.cardText}>Name: {item.name}</Text>}
        {item.model && <Text>Model: {item.model}</Text>}
        {item.crew && <Text>Crew: {item.crew}</Text>}
        {item.climate && <Text>Climate: {item.climate}</Text>}
        {item.population && <Text>Population: {item.population}</Text>}
        {item.title && <Text style={styles.cardText}>Title: {item.title}</Text>}
        {item.episode_id && <Text>Episode: {item.episode_id}</Text>}
        {item.director && <Text>Director: {item.director}</Text>}
        {item.release_date && <Text>Release Date: {item.release_date}</Text>}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#eee",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",

  },
});
