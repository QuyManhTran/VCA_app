import { memo, useContext } from "react";
import { View, Text, ScrollView } from "react-native";

import LinearBackGround from "../../../../components/LinearBackGround";
import { colors } from "../../../../../constants";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import ThemeContext from "../../../../utilies/theme";

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
        <LinearBackGround
          height={100}
          back={true}
          avatar={false}
          onPress={onBack}
          // isDarkMode={isDarkMode}
        ></LinearBackGround>
        <Text
          style={{
            marginTop: 4,
            fontFamily: baloo2Fonts.bold,
            fontSize: 26,
            paddingLeft: 20,
            color: isDarkMode ? colors.whiteText : "black",
          }}
        >
          Chính sách bảo mật
        </Text>

        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            fontFamily: baloo2Fonts.medium,
            color: isDarkMode ? colors.whiteText : "black",
            fontSize: 17,
          }}
        >
          Thông Tin Cá Nhân: Để cung cấp dịch vụ, chúng tôi có thể thu thập
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
          }}
        >
          Chúng tôi có thể thu thập dữ liệu về thiết bị và thông tin trình duyệt
          như địa chỉ IP, loại trình duyệt, thời gian truy cập và các trang đã
          xem.
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(PrivacyPolicy);
