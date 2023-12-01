import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors, { navbarDarkLinearColors } from "../../../constants/colors";
import { userAvatar } from "../../../assets/img/icons";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import BackButton from "../BackButton";
import ThemeContext from "../../utilies/theme";
interface LinearBackGroundProps {
  height: number;
  avatar?: boolean;
  back?: boolean;
  onPress?: any;
  title?: string;
  isDarkMode?: boolean;
}
const LinearBackGround = ({
  height,
  title,
  avatar = true,
  back = false,
  onPress,
  isDarkMode = false,
}: LinearBackGroundProps) => {
  const { userInfor } = useContext(ThemeContext);
  const [time, setTime] = useState("");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour > 0 && hour < 18) {
      setTime("sáng");
    } else {
      setTime("tối");
    }
  }, []);
  return (
    <LinearGradient
      colors={isDarkMode ? navbarDarkLinearColors : ["#FF0701", "#FFD28D"]}
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
        <View style={{ marginRight: 20, marginLeft: back ? 20 : 0 }}>
          <BackButton
            onPress={onPress}
            size={28}
            color={isDarkMode ? colors.whiteText : "black"}
            customeStyle={{
              backgroundColor: isDarkMode ? colors.darkBg : "#fff",
            }}
          ></BackButton>
        </View>
      )}

      <Text
        style={{
          fontFamily: baloo2Fonts.extra,
          fontSize: 30,
          color: isDarkMode ? "black" : "#fff",
        }}
      >
        {title}
        {title ? time : ""}
      </Text>
      {avatar && (
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={userInfor?.avatar ? { uri: userInfor.avatar } : userAvatar}
            style={{
              height: 60,
              width: 60,
              marginLeft: 12,
              marginRight: 4,
              borderRadius: 30,
            }}
          ></Image>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default LinearBackGround;

const styles = StyleSheet.create({});
