import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  item: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  error: {
    color: "red",
    padding: 20,
    textAlign: "center"
  },
  scroll: {
    height: 1,
    alignSelf: "stretch",
  },
    modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding:10,
  },
  modalBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  
});
