import React, {useEffect, useState} from "react";
import { 
  View, 
  Text,  
  ActivityIndicator,
  ScrollView,
  Image,
  Modal,
  Pressable,
  StyleSheet 
} from "react-native";
import styles from "./styles";
import SearchBarWithModal from "./ModalSearchBar";
import SwipeableListItem from "./SwipeableListItem";
import AnimatedModal from "./AnimatedModal";
import LazyImage from "./LazyImage";



export default function Planets({ isConnected }) {
  /* Create Arrays */
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  
  // Fetch on initial load
  useEffect(() => {
    fetchPlanets();
  }, []);

  // Re-fetch when network goes offline then restores
    useEffect(() => {
    if (isConnected) {
      fetchPlanets();
    }
  }, [isConnected]);
  
  function handleSwipe(item) {
    setSelectedPlanet(item);
    setModalVisible(true);
  }

  /* Display either loading indicator or error message */
  if(loading) return <ActivityIndicator size="large" style={{ marginTop: 50}} />;
  if(error) return <Text style={styles.error}>{error}</Text>;
  
  return (
    /* Display info from Star Wars API as a list */
    <View style={styles.container}>
      <LazyImage 
        source={require("./assets/Star_Wars_Logo.png")} 
      />
      <Text>Planets</Text>
      <SearchBarWithModal />
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 20 }}>
        {planets.map((planet) => (
           <SwipeableListItem key={planet.url} item={planet} onSwipe={handleSwipe} />
        ))}
      </ScrollView>

      <AnimatedModal
      visible={modalVisible}
      text={selectedPlanet?.name}
      onClose={() => setModalVisible(false)}
    />
    </View>
  );
}
