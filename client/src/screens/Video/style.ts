import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
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
    marginLeft: 12,
  },
  btnPlay: {
    flexDirection: "row",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    position: "absolute",
    left: 0,
    flexDirection: "row",
    transform: [{ translateY: -9 }],
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 0.5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "50%",
  },
  textWrapper: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: baloo2Fonts.medium,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  timeWrapper: {
    position: "absolute",
    flexDirection: "row",
    bottom: 12,
    left: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    color: "#fff",
    fontSize: 12,
  },
});
export default styles;
