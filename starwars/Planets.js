import React, {useEffect, useState} from "react";
import { 
  View, 
  Text,  
  ActivityIndicator,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet 
} from "react-native";
import styles from "./styles";
import SearchBarWithModal from "./ModalSearchBar";
import SwipeableListItem from "./SwipeableListItem";



export default function Planets() {
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

  useEffect(() => {
    fetchPlanets();
  }, []);


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
      <Text>Planets</Text>
      <SearchBarWithModal />
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 20 }}>
        {planets.map((planet) => (
           <SwipeableListItem key={planet.url} item={planet} onSwipe={handleSwipe} />
        ))}
      </ScrollView>

    <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedPlanet?.name}</Text>
            <Text>Climate: {selectedPlanet?.climate}</Text>
            <Text>Population: {selectedPlanet?.population}</Text>

            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
