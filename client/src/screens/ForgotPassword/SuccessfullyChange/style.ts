import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import fontFamilies, {
  baloo2Fonts,
  montserratFonts,
} from "../../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginLeft: 38,
    marginTop: 80,
  },

  heading: {
    fontFamily: baloo2Fonts.extra,
    fontSize: 50,
  },
  remind: {
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    lineHeight: 24,
    maxWidth: 340,
  },
});
export default styles;
