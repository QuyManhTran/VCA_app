import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, height: 2000 },
  wrapper: {
    // paddingLeft: 24,
    paddingTop: 50,
  },
  search: {
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
    transform: [{ translateY: 0 }],
  },
});
export default styles;
