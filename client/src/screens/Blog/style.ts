import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    left: 12,
  },
  headerWrapper: {
    position: "absolute",
    left: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 14,
  },
  wrapperNav: {
    position: "absolute",
    top: 148,
    left: 0,
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
    height: 36,
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
