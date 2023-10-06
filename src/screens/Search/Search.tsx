import { View, Text } from "react-native";
import React from "react";
import styles from "./style";
import LinearBackGround from "../../components/LinearBackGround";
import SearchTool from "../../components/SearchTool";
import { RouterProps } from "../Splash/Splash";
const Search = ({ route, navigation }: RouterProps) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearBackGround height={140} avatar={false} back></LinearBackGround>
      <View style={styles.search}>
        <SearchTool isHome={false} width={300}></SearchTool>
      </View>
    </View>
  );
};

export default Search;
