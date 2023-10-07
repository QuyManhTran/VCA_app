import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { linearColors } from "../../../constants/colors";
import { userAvatar } from "../../../assets/img/icons";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import BackButton from "../BackButton";
interface LinearBackGroundProps {
  height: number;
  avatar?: boolean;
  back?: boolean;
  onPress?: any;
  title?: string;
}
const LinearBackGround = ({
  height,
  title,
  avatar = true,
  back = false,
  onPress,
}: LinearBackGroundProps) => {
  return (
    <LinearGradient
      colors={["#FF0701", "#FFD28D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: "100%",
        height: height,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: back ? "flex-start" : "flex-end",
      }}
    >
      {back && (
        <View style={{ marginRight: 20 }}>
          <BackButton
            onPress={onPress}
            size={28}
            customeStyle={{ backgroundColor: "#fff" }}
          ></BackButton>
        </View>
      )}

      <Text
        style={{ fontFamily: baloo2Fonts.extra, fontSize: 30, color: "white" }}
      >
        {title}
      </Text>
      {avatar && (
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={userAvatar} style={{ height: 70, width: 70 }}></Image>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default LinearBackGround;

const styles = StyleSheet.create({});
