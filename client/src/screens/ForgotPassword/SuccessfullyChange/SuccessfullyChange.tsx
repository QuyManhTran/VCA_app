import { View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import styles from "./style";
import { congratulation } from "../../../../assets/img/splash";
import { colors } from "../../../../constants";
import { RouterProps } from "../../Splash/Splash";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";
import ThemeContext from "../../../utilies/theme";

const SuccessfullyChange = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const width = screenWidth();
  const onMoveLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#fff" },
      ]}
    >
      <AuthenBackGround
        onPress={() => navigation.goBack()}
        isBack={false}
      ></AuthenBackGround>
      <View style={styles.wrapper}>
        <View>
          <Image source={congratulation}></Image>
        </View>
        <View style={{ marginTop: 40, width: 400 }}>
          <Text
            style={[
              styles.heading,
              {
                fontSize: width < 400 ? 32 : 36,
                lineHeight: width < 400 ? 60 : 60,
                color: isDarkMode ? "#Fff" : "black",
              },
            ]}
          >
            {route.params ? `Đăng ký thành công!` : `Cập nhật thành công!`}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={[
              styles.remind,
              { lineHeight: 28, color: isDarkMode ? "#Fff" : "black" },
            ]}
          >
            {route.params
              ? `Bây giờ, bạn có thể sử dụng tài khoản để đăng nhập`
              : `Bây giờ, bạn có thể đăng nhập bằng mật khẩu mới này`}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMoveLogin}
          style={{
            alignSelf: "flex-end",
            marginRight: 34,
            marginTop: 20,
          }}
        >
          <NavButton>Đăng nhập</NavButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessfullyChange;
