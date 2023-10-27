import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    top: 24,
    left: 12,
  },
  wrapperNav: {
    marginTop: 12,
    marginHorizontal: 12,
    padding: 4,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  navItem: {
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  navItemText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 20,
  },
  cmtWrapper: {
    position: "absolute",
    top: 1000,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default styles;
