import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const IOS_SWIPE_THRESHOLD = -80;
const ANDROID_SWIPE_THRESHOLD = -120;

export default function SwipeableListItem({ item, onSwipe }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const hasNavigated = useRef(false);

  useFocusEffect(() => {
    translateX.setValue(0);
    hasNavigated.current = false;
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy) * 1.3,

      onPanResponderGrant: () => {
        translateX.stopAnimation();
      },

      onPanResponderMove: (_, g) => {
        if (g.dx < 0) {
          translateX.setValue(g.dx);
        }
      },

      onPanResponderRelease: (_, g) => {
        const threshold =
          Platform.OS === "ios"
            ? IOS_SWIPE_THRESHOLD
            : ANDROID_SWIPE_THRESHOLD;

        if (g.dx < threshold && !hasNavigated.current) {
          hasNavigated.current = true;

          Animated.timing(translateX, {
            toValue: -300,
            duration: 160,
            useNativeDriver: true,
          }).start(() => onSwipe(item));
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            tension: 120,
            friction: 14,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.card, { transform: [{ translateX }] }]}
    >
      <Text style={styles.title}>{item.name || item.title}</Text>
      {item.climate && <Text style={styles.subtitle}>Climate: {item.climate}</Text>}
      {item.model && <Text style={styles.subtitle}>Model: {item.model}</Text>}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#1e90ff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    color: "#666",
    marginTop: 2,
  },
});
