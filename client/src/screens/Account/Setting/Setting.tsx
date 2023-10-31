import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import { Ionicons } from "@expo/vector-icons";
import { memo, useContext } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemeContext from "../../../utilies/theme";
import { colors } from "../../../../constants";

const Setting = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearBackGround
        height={100}
        back={true}
        avatar={false}
        onPress={onBack}
        isDarkMode={isDarkMode}
      ></LinearBackGround>
      <View
        style={[
          styles.header,
          { borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9" },
        ]}
      >
        <Text
          style={[
            styles.headerText,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Cài đặt
        </Text>
      </View>

      <View style={{ backgroundColor: isDarkMode ? colors.darkTheme : "#fff" }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
        >
          <View style={styles.optionsLeft}>
            <Ionicons
              name="information-circle-outline"
              size={28}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Phiên bản
            </Text>
          </View>
          <Text style={{ color: isDarkMode ? colors.whiteText : "black" }}>
            1.0.1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
          onPress={() => navigation.navigate("Language")}
        >
          <View style={styles.optionsLeft}>
            <Ionicons
              name="language"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Ngôn ngữ
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
          onPress={() => navigation.navigate("Display")}
        >
          <View style={styles.optionsLeft}>
            <Ionicons
              name="moon-outline"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Giao diện
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
        >
          <View style={styles.optionsLeft}>
            <Ionicons
              name="help-circle-outline"
              size={30}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Trợ giúp
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
        >
          <View style={styles.optionsLeft}>
            <FontAwesome
              name="flag-o"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Góp ý, báo lỗi
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
        >
          <View style={styles.optionsLeft}>
            <AntDesign
              name="staro"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Bình chọn cho VGA
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
          onPress={() => navigation.navigate("TermsOfService")}
        >
          <View style={styles.optionsLeft}>
            <FontAwesome
              name="list-alt"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Điều khoản, dịch vụ
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <View style={styles.optionsLeft}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color={isDarkMode ? colors.whiteText : "black"}
            ></Ionicons>
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Chính sách, bảo mật
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.options,
            {
              borderBottomColor: isDarkMode ? colors.placeHolder : "#D9D9D9",
            },
          ]}
        >
          <View style={styles.optionsLeft}>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={28}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Khác
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.options, { borderBottomColor: "transparent" }]}
        >
          <View style={styles.optionsLeft}>
            <AntDesign
              name="logout"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
            <Text
              style={[
                styles.optionsText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Đăng xuất
            </Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 2,
    paddingBottom: 12,
  },

  headerText: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 36,
    marginLeft: 10,
  },
  options: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },

  optionsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionsText: {
    fontFamily: baloo2Fonts.regular,
    fontSize: 20,
    marginLeft: 10,
  },
});

export default memo(Setting);
