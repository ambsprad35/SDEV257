import React, {useEffect, useState} from "react";
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  ScrollView,
  Modal,
  Pressable,
  StyleSheet 
} from "react-native";
import styles from "./styles";
import SearchBarWithModal from "./ModalSearchBar";
import SwipeableListItem from "./SwipeableListItem";
import LazyImage from "./LazyImage";

export default function Spaceships() {
  
  /* Create Spaceships arrays */
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  function handleSwipe(item) {
    setSelectedShip(item);
    setModalVisible(true);
  }

  /* Display laoding indicator or error message when needed */
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50}} />;
  if(error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <LazyImage 
        source={require("./assets/Star_Wars_Logo.png")} 
      />
      <Text>Spaceships Content</Text>
      <SearchBarWithModal />
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 20 }}>
        {ships.map((ships) => (
          <SwipeableListItem
            key={ships.url}
            item={ships}
            onSwipe={handleSwipe}
          >
            <Text style={styles.name}>{ships.name}</Text>
            <Text>Model: {ships.model}</Text>
            <Text>Crew: {ships.crew}</Text>
          </SwipeableListItem>
        ))}
      </ScrollView>

      {/* Open the Modal Dialogue on a swipe */}
      <AnimatedModal
        visible={modalVisible}
        text={selectedShip?.name}
        onClose={() => setModalVisible(false)}
      />

    </View>
  );
}
