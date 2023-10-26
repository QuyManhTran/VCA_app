import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
    textAlign: "justify",
    lineHeight: 30,
  },
  wrapper: {
    marginTop: 12,
  },
  wrapperIcon: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  textItem: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontFamily: baloo2Fonts.bold,
  },
  recipeWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 1,
  },
  contentText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 20,
    marginLeft: 24,
  },
});

export default styles;
