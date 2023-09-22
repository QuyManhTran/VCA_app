import { StyleSheet } from "react-native";
import { fontFamilies } from "../../../constants";
const styles = StyleSheet.create({
  paginator: {
    position: "absolute",
    bottom: 180,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    position: "absolute",
    bottom: 78,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    position: "absolute",
    top: 480,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 36,
    color: "#fff",
    textAlign: "center",
    maxWidth: 320,
    // fontFamily: fontFamilies.bold,
  },
});

export default styles;
