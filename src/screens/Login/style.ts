import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { montserratFonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  lockIcon: {
    position: "absolute",
    width: "100%",
    top: 80,
    flexDirection: "row",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.authentication,
  },
  heading: {
    marginTop: 154,
    fontFamily: montserratFonts.bold,
    fontSize: 50,
    marginBottom: 20,
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
    textDecorationLine: "underline",
    fontFamily: montserratFonts.regular,
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
