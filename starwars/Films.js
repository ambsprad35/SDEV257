import React, {useState, useEffect} from "react";
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
import SwipeableListItem from "./SwipeableListItem"

export default function Films() {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  function handleSwipe(item) {
    setSelectedFilm(item);
    setModalVisible(true);
  }

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text>Film Content</Text>
      <SearchBarWithModal />
      

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {films.map(film => (
          <SwipeableListItem key={film.url} item={film} onSwipe={handleSwipe} />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedFilm?.title}</Text>
            <Text>Episode: {selectedFilm?.episode_id}</Text>
            <Text>Director: {selectedFilm?.director}</Text>
            <Text>Release Date: {selectedFilm?.release_date}</Text>

            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
