import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    display: "flex",
  },

  headerAvatar: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: 150,
    alignItems: "center",
  },

  headerImage: {
    marginTop: 10,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  headerImageDetail: {
    alignSelf: "flex-end",
    height: 200,
    width: "100%",
  },

  headerText: {
    marginTop: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTextName: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 30,
  },

  headerTextEmail: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
  },

  headerTextEdit: {
    marginVertical: 15,
    backgroundColor: "#FF0701",
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  headerTextEditText: {
    flexWrap: "nowrap",
    color: "#FFF",
    fontFamily: baloo2Fonts.extra,
    fontSize: 25,
  },

  menuContainer: {
    marginVertical: 60,
    gap: 20,
  },

  content: {
    borderTopWidth: 1,
    borderTopColor: "#D9D9D9",
  },

  contentHeading: {
    marginTop: 5,
    backgroundColor: "#D9D9D9",
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contentTitle: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 20,
  },

  contentContent: {
    marginTop: 10,
    gap: 12,
  },

  itemWrapper: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  contentItem: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 20,
    letterSpacing: 1.5,
  },

  option: {},

  optionTitle: {
    marginTop: 5,
    backgroundColor: "#D9D9D9",
    fontFamily: baloo2Fonts.regular,
    fontSize: 20,
    paddingLeft: 20,
  },

  optionLanguage: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
  },

  optionLanguageTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  optionLanguageContent: {
    flexDirection: "row",
  },

  optionLanguageContentText: {
    fontFamily: baloo2Fonts.regular,
    fontSize: 15,
  },

  optionDisplay: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
  },

  privacy: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingBottom: 10,
  },

  modalWapper: {
    paddingTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: "#D9D9D9",
  },

  modalCompoment: {
    marginLeft: 12,
    fontSize: 17,
    fontFamily: baloo2Fonts.medium,
  },
});

export default styles;
