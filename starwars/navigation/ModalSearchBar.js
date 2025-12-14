
import React, { useState } from "react";
import { View, TextInput, Button, Modal, Text, StyleSheet } from "react-native";

export default function SearchBarWithModal() {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    setModalVisible(true);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search…"
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You searched for:</Text>
            <Text style={styles.searchTerm}>{text}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  searchTerm: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
});
