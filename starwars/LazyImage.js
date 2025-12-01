import React, { useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function LazyImage({ source, style }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.container, style]}>
      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      <Image
        source={source}
        resizeMode="contain"
        style={styles.image}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {/* Hide loader only when image is done */}
      {loading && <View style={styles.overlayBlocker} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "90%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: "40%",
  },
  overlayBlocker: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  }
});
