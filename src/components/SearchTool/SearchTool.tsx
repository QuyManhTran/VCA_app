import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { searchDark } from "../../../assets/img/icons";
import { colors } from "../../../constants";
import useDebounce from "../../../hooks/useDebounce";
import fontFamilies, {
  baloo2Fonts,
  montserratFonts,
} from "../../../constants/fontFamiles";

interface SearchProps {
  isHome: boolean;
  onPress?: any;
  width?: number;
}
const fakeData = ["truyền thống", "phổ biến ", "yêu thích", "liên quan"];
const SearchTool = ({ width = 320, isHome, onPress }: SearchProps) => {
  const resultRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(fakeData);
  const debounceKeyword = useDebounce(keyword, 500);
  useEffect(() => {
    // sent API by debounceKeyword
  }, [debounceKeyword]);
  console.log("hello");
  return (
    <>
      <View style={[styles.container, { width: width }]}>
        <TouchableOpacity>
          <Image
            source={searchDark}
            style={{ width: 36, height: 36 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          {!isHome && (
            <TextInput
              ref={resultRef}
              style={styles.input}
              value={keyword}
              onChangeText={(text) => setKeyword(text)}
              placeholder="Tìm kiếm món ăn"
              spellCheck={false}
              selectionColor={colors.primary}
            ></TextInput>
          )}
          {isHome && (
            <Text
              onPress={onPress}
              style={{
                fontSize: 20,
                fontFamily: baloo2Fonts.regular,
                opacity: 0.7,
              }}
            >
              Tìm kiếm món ăn
            </Text>
          )}
        </View>
      </View>
      {/* {isFocused && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            alignItems: "center",
            top: "105%",
          }}
        >
          <View style={styles.resultContainer}>
            {data.map((result, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={index}
                  style={[
                    styles.result,
                    index === data.length - 1 && { paddingBottom: 0 },
                  ]}
                >
                  <Ionicons
                    name="trending-up"
                    size={24}
                    style={{ marginRight: 12 }}
                  ></Ionicons>
                  <Text style={styles.text}>{result}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )} */}
    </>
  );
};

export default React.memo(SearchTool);

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
