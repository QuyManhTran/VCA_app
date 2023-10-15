import { View, Text } from "react-native";
import React from "react";
import { RouterProps } from "../Splash/Splash";

const Blog = ({ route, navigation }: RouterProps) => {
  console.log(route.params);
  return (
    <View>
      <Text style={{ fontSize: 40 }}>Blog</Text>
    </View>
  );
};

export default Blog;
