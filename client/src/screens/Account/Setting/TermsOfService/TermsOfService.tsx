import React, { memo, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import LinearBackGround from "../../../../components/LinearBackGround";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import ThemeContext from "../../../../utilies/theme";
import { colors } from "../../../../../constants";

const TermsOfService = ({ navigation, ...props }) => {
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
          isDarkMode={isDarkMode}
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
          Điều khoản dịch vụ
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
          VCA là một ứng dụng giúp người dùng tìm kiếm và khám phá các món ăn từ
          các nhà hàng, đánh giá và chia sẻ thông tin về chúng. Người dùng chịu
          trách nhiệm về nội dung họ chia sẻ trên ứng dụng. Cấm việc chia sẻ
          thông tin giả mạo hoặc vi phạm bản quyền.
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
          VCA có quyền loại bỏ hoặc chỉnh sửa nội dung vi phạm quy định. VCA thu
          thập thông tin cá nhân để cung cấp dịch vụ tốt hơn cho người dùng.
          Thông tin cá nhân không được chia sẻ với bên thứ ba mà không có sự
          đồng ý của người dùng.
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(TermsOfService);
