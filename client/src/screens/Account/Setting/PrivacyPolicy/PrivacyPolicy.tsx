import { memo, useContext } from "react";
import { View, Text, ScrollView } from "react-native";

import LinearBackGround from "../../../../components/LinearBackGround";
import { colors } from "../../../../../constants";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import ThemeContext from "../../../../utilies/theme";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../../constants/colors";
import BackButton from "../../../../components/BackButton";

const PrivacyPolicy = ({ navigation, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <ScrollView>
        <LinearGradient
          colors={isDarkMode ? navbarDarkLinearColors : ["#FF0701", "#FFD28D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: "row",
            height: 120,
            alignItems: "center",
            gap: 16,
          }}
        >
          <BackButton
            onPress={onBack}
            size={28}
            color={isDarkMode ? "#fff" : "black"}
            customeStyle={{
              backgroundColor: isDarkMode ? colors.darkBg : "#fff",
              marginLeft: 10,
            }}
          ></BackButton>
          <Text
            style={{
              fontSize: 30,
              fontFamily: baloo2Fonts.extra,
              color: isDarkMode ? "black" : colors.whiteText,
            }}
          >
            Chính sách bảo mật
          </Text>
        </LinearGradient>

        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            fontFamily: baloo2Fonts.medium,
            color: isDarkMode ? colors.whiteText : "black",
            fontSize: 17,
            textAlign: "justify",
          }}
        >
          1. Thông Tin Cá Nhân: Để cung cấp dịch vụ, chúng tôi có thể thu thập
          thông tin cá nhân như tên, địa chỉ email , số điện thoại, và địa chỉ
          giao hàng.
        </Text>
        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            fontFamily: baloo2Fonts.medium,
            fontSize: 17,
            color: isDarkMode ? colors.whiteText : "black",
            textAlign: "justify",
          }}
        >
          2. Chúng tôi có thể thu thập dữ liệu về thiết bị và thông tin trình
          duyệt như địa chỉ IP, loại trình duyệt, thời gian truy cập và các
          trang đã xem.
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(PrivacyPolicy);
