import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { montserratFonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 280,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    display: "flex",
  },
  heading: {
    fontSize: 22,
    fontFamily: fontFamilies.bold,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: montserratFonts.extra,
    color: colors.primary,
  },
  whiteLine: {
    width: 80,
    borderWidth: 0.75,
    borderColor: colors.primary,
    marginTop: 6,
  },
});

export default styles;
