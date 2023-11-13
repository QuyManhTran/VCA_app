import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: { flex: 1 },
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
  otherHeading: {
    fontSize: 26,
    fontFamily: baloo2Fonts.extra,
    paddingBottom: 8,
    paddingLeft: 12,
  },
});
export default styles;
