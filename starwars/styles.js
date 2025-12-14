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
    backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
    card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  subText: {
    color: "#666",
  },
  swipeAction: {
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  swipeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 16,
  },
  
});
