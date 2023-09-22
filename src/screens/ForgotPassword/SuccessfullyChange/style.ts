import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import fontFamilies, {
  montserratFonts,
} from "../../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authentication,
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 32,
    fontFamily: montserratFonts.bold,
    lineHeight: 40,
  },
  remind: {
    fontSize: 18,
    fontFamily: fontFamilies.regular,
    textAlign: "center",
    maxWidth: 320,
  },
});
export default styles;
