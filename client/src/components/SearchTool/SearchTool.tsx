import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useContext, memo } from "react";
import { searchDark, searchWhite } from "../../../assets/img/icons";
import { colors } from "../../../constants";
import fontFamilies, { baloo2Fonts } from "../../../constants/fontFamiles";
import { AntDesign } from "@expo/vector-icons";

interface SearchProps {
  isHome: boolean;
  width?: number;
  onPress?: any;
  onKeyword?: any;
  keyword?: string;
  isDarkMode: boolean;
}
const fakeData = ["truyền thống", "phổ biến ", "yêu thích", "liên quan"];
const SearchTool = ({
  width = 320,
  isHome,
  onPress,
  onKeyword,
  keyword,
  isDarkMode = false,
}: SearchProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.container,
          {
            width: width,
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
          },
        ]}
      >
        <TouchableOpacity>
          <Image
            source={isDarkMode ? searchWhite : searchDark}
            style={{ width: 36, height: 36 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          {!isHome && (
            <TextInput
              value={keyword}
              style={[
                styles.input,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
              onChangeText={(text) => onKeyword(text)}
              placeholderTextColor={colors.placeHolder}
              placeholder="Tìm kiếm món ăn"
              spellCheck={false}
              selectionColor={colors.primary}
            ></TextInput>
          )}
          {isHome && (
            <Text
              onPress={() => onPress({ status: "tag" })}
              style={{
                fontSize: 20,
                fontFamily: baloo2Fonts.regular,
                opacity: 0.7,
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              Tìm kiếm món ăn
            </Text>
          )}
        </View>
        {!isHome && (
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign
              name="scan1"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(SearchTool);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 60,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "400",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    width: 320,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  result: {
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
});
