import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { searchDark } from "../../../assets/img/icons";
import { colors } from "../../../constants";
import useDebounce from "../../../hooks/useDebounce";

const SearchTool = () => {
  const [keyword, setKeyword] = useState("");
  const debounceKeyword = useDebounce(keyword, 500);
  useEffect(() => {
    // sent API by debounceKeyword
  }, [debounceKeyword]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{}}>
        <Image
          source={searchDark}
          style={{ width: 36, height: 36 }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          placeholder="Tìm kiếm món ăn"
          spellCheck={false}
          selectionColor={colors.primary}
        ></TextInput>
      </View>
    </View>
  );
};

export default SearchTool;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 320,
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
});
