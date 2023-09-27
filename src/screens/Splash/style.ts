import { StyleSheet } from "react-native";
import { fontFamilies } from "../../../constants";
const styles = StyleSheet.create({
  paginator: {
    position: "absolute",
    top: 648,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    position: "absolute",
    top: 698,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    position: "absolute",
    top: 500,
    paddingLeft: 50,
  },
  heading: {
    fontSize: 36,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 8,
    alignSelf: "flex-start",
  },
});

export default styles;
