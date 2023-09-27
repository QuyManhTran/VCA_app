import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import { montserratFonts } from "../../../../constants/fontFamiles";

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
