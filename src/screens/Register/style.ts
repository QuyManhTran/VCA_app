import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { montserratFonts } from "../../../constants/fontFamiles";
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
    fontFamily: montserratFonts.extra,
    fontSize: 50,
    lineHeight: 60,
    marginBottom: 50,
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
    marginTop: 20,
    fontSize: 20,
    fontFamily: montserratFonts.regular,
  },
  icon: {
    marginHorizontal: 20,
  },
  create: {
    backgroundColor: colors.primary,
    width: 320,
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#ebebe4",
  },
  textDisabled: {
    color: "#9e9999",
  },
});

export default styles;
