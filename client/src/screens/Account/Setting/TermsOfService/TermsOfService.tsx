import React, { memo, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import LinearBackGround from "../../../../components/LinearBackGround";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import ThemeContext from "../../../../utilies/theme";
import { colors } from "../../../../../constants";
import BackButton from "../../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../../constants/colors";

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
            Điều khoản dịch vụ
          </Text>
        </LinearGradient>
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
          1. VCA là một ứng dụng giúp người dùng tìm kiếm và khám phá các món ăn
          từ các nhà hàng, đánh giá và chia sẻ thông tin về chúng. Người dùng
          chịu trách nhiệm về nội dung họ chia sẻ trên ứng dụng. Cấm việc chia
          sẻ thông tin giả mạo hoặc vi phạm bản quyền.
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
          2. VCA có quyền loại bỏ hoặc chỉnh sửa nội dung vi phạm quy định. VCA
          thu thập thông tin cá nhân để cung cấp dịch vụ tốt hơn cho người dùng.
          Thông tin cá nhân không được chia sẻ với bên thứ ba mà không có sự
          đồng ý của người dùng.
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(TermsOfService);
