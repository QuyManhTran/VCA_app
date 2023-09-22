import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import { montserratFonts } from "../../../../constants/fontFamiles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authentication,
    alignItems: "center",
  },
  lockIcon: {
    position: "absolute",
    width: "100%",
    top: 160,
    flexDirection: "row",
    justifyContent: "center",
  },

  heading: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: montserratFonts.bold,
    lineHeight: 60,
  },
  input: {
    fontSize: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingRight: 20,
  },
  icon: {
    marginHorizontal: 20,
  },
});

export default styles;
