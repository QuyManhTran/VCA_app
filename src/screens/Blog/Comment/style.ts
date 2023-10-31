import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
const styles = StyleSheet.create({
  lineCross: {
    // marginTop: 8,
    borderBottomColor: "#ff5c001a",
    borderBottomWidth: 4,
  },
  headerWrapper: {
    marginTop: 4,
    backgroundColor: "#ff5c001a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 24,
    marginLeft: 12,
  },
  contentWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 126,
  },
  commentArea: {
    position: "absolute",
    left: 0,
    width: "100%",
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.5,
  },
  innterArea: {
    borderRadius: 24,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    flex: 1,
    height: "100%",
    fontFamily: baloo2Fonts.regular,
    fontSize: 18,
  },
  sendIcon: {
    paddingHorizontal: 12,
  },
  someone: {
    alignItems: "center",
  },
  someoneText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 14,
  },
});

export default styles;
