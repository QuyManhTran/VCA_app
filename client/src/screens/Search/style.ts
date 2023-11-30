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
  modalContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    minHeight: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 11,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12,
    gap: 12,
  },
  itemContent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.placeHolder,
  },
  itemText: {
    fontSize: 20,
    fontFamily: baloo2Fonts.semi,
  },
});
export default styles;
