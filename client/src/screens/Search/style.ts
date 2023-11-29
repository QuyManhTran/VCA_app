import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  search: {
    position: "absolute",
    top: 40,
    left: 70,
    alignItems: "center",
    zIndex: 10,
  },
  chiptag: {
    marginTop: 12,
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "transparent",
    gap: 8,
  },
  chipTagText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 16,
  },
});
export default styles;
