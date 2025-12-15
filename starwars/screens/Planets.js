import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList
} from 'react-native';

import styles from '../styles';
import SwipeableListItem from '../navigation/SwipeableListItem';
import SearchBarWithModal from '../navigation/ModalSearchBar';
import LazyImage from '../LazyImage';

export default function Planets({ navigation, isConnected }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi.py4e.com/api/planets/');
      const json = await response.json();
      setPlanets(json.results);
      setFilteredPlanets(json.results)  // initialize filtered list
    } catch (err) {
      setError('Failed to load planets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchPlanets();
    }
  }, [isConnected]);

    useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const handleSearch = (text) => {
    if (!text || text.trim() === '') {
      setFilteredPlanets(planets);
      return;
    }

    const filtered = planets.filter(planet =>
      planet.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredPlanets(filtered);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <LazyImage source={require('../assets/Star_Wars_Logo.png')} />
      <Text style={styles.header}>Planets</Text>
      
      <SearchBarWithModal onSearch={handleSearch} />

      <FlatList
        data={filteredPlanets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <SwipeableListItem
            item={item}
            onSwipe={(planet) =>
              navigation.navigate("PlanetDetails", { planet })
            }
          />
        )}
      />
    </View>
  );
}
