import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vidWarpper: {
    width: "100%",
    height: 220,
    backgroundColor: "#000",
  },
  vidControl: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  fullScreenIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  btnPlay: {
    flexDirection: "row",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  progressBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default styles;
