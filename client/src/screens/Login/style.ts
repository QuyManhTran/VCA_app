import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    marginLeft: 38,
    marginTop: 141,
  },

  heading: {
    fontFamily: baloo2Fonts.extra,
    fontSize: 46,
    lineHeight: 78,
  },

  requirement: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    marginBottom: 44,
  },

  input: {
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingRight: 20,
  },
  selection: {
    fontSize: 25,
    fontFamily: montserratFonts.bold,
  },
  forgotPassword: {
    fontSize: 24,
    fontFamily: baloo2Fonts.extra,
    color: colors.primary,
  },
  icon: {
    marginHorizontal: 20,
  },
  continue: {
    backgroundColor: "#fff",
    width: 200,
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  disabled: {
    backgroundColor: "#ebebe4",
  },
  textDisabled: {
    color: "#9e9999",
  },
});

export default styles;
