import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  wrapper: {
    width: 320,
    minHeight: 200,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
  },
  heading: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 24,
  },
  iconsWrapper: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  discardWrapper: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  discard: {
    fontSize: 20,
    fontFamily: baloo2Fonts.semi,
  },
});

export default styles;
