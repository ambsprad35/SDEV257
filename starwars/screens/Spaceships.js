import React, {useEffect, useState} from "react";
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  ScrollView,
  Image,
  Modal,
  Pressable,
  StyleSheet 
} from "react-native";
import styles from "../styles";
import SearchBarWithModal from "../navigation/ModalSearchBar";
import SwipeableListItem from "../navigation/SwipeableListItem";
import AnimatedModal from "../navigation/AnimatedModal";
import LazyImage from "../LazyImage";

export default function Spaceships() {
  
  /* Create Spaceships arrays */
  const [ships, setShips] = useState([]);
  const [filteredShips, setFilteredShips] = useState([]);
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
      setFilteredShips(json.results); // initialize filtered list
    } catch (err) {
      setError("Failed to load spaceships.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    if (!text || text.trim() === "") {
      setFilteredShips(ships);
      return;
    }
    const filtered = ships.filter(ship =>
      ship.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredShips(filtered);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  const handleSwipe = (ship) => {
    setSelectedShip(ship);
    setModalVisible(true);
  };

  /* Display laoding indicator or error message when needed */
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50}} />;
  if(error) return <Text style={styles.error}>{error}</Text>;

  return (

    <View style={styles.container}>
      <LazyImage source={require("../assets/Star_Wars_Logo.png")} />
      <Text style={styles.header}>Spaceships</Text>

      <SearchBarWithModal onSearch={handleSearch} placeholder="Search spaceships..." />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredShips.map(ship => (
          <SwipeableListItem key={ship.url} item={ship} onSwipe={handleSwipe}>
            <Text style={styles.name}>{ship.name}</Text>
            <Text>Model: {ship.model}</Text>
            <Text>Crew: {ship.crew}</Text>
          </SwipeableListItem>
        ))}
      </ScrollView>

      <AnimatedModal
        visible={modalVisible}
        text={selectedShip?.name}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
