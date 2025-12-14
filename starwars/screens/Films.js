import React, {useState, useEffect} from "react";
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
import styles from "../styles";
import SearchBarWithModal from "../navigation/ModalSearchBar";
import SwipeableListItem from "../navigation/SwipeableListItem";
import AnimatedModal from "../navigation/AnimatedModal";
import LazyImage from "../LazyImage";

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
      <LazyImage 
        source={require("../assets/Star_Wars_Logo.png")} 
      />
      <Text>Film Content</Text>
      <SearchBarWithModal />
    
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {films.map(film => (
          <SwipeableListItem key={film.url} item={film} onSwipe={handleSwipe} />
        ))}
      </ScrollView>

    <AnimatedModal
      visible={modalVisible}
      text={selectedFilm?.title}
      onClose={() => setModalVisible(false)}
    />
    </View>
  );
}
