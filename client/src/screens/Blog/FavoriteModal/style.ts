import { StyleSheet } from "react-native";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: 320,
    maxHeight: 450,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    gap: 12,
    overflow: "scroll",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.placeHolder,
  },
  headerText: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 24,
  },
  closeIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16182308",
    borderRadius: 20,
  },
  wrapperContent: {
    gap: 24,
    overflow: "scroll",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 20,
    fontFamily: baloo2Fonts.medium,
    marginLeft: 12,
    maxWidth: "70%",
  },
  checkbox: {
    flexShrink: 0,
    borderWidth: 2,
    borderRadius: 4,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "auto",
  },
  footerText: {
    fontSize: 20,
    fontFamily: baloo2Fonts.medium,
  },
  InputWrapper: {
    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
  },
  headingInput: {
    fontSize: 20,
    fontFamily: baloo2Fonts.bold,
    marginBottom: -8,
  },
  input: {
    height: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: baloo2Fonts.medium,
  },
  createText: {
    color: colors.primary,
    fontFamily: baloo2Fonts.bold,
    fontSize: 24,
  },
  doneSelection: {
    borderTopWidth: 1,
    borderTopColor: colors.placeHolder,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default styles;
