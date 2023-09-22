import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { montserratFonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 380,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    display: "flex",
  },
  heading: {
    fontSize: 22,
    fontFamily: fontFamilies.bold,
    color: "white",
  },
  title: {
    fontSize: 30,
    fontFamily: montserratFonts.extra,
    color: colors.primary,
  },
  whiteLine: {
    width: 80,
    borderWidth: 0.75,
    borderColor: "#fff",
    marginTop: 6,
  },
});

export default styles;
