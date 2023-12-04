import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback, useContext, useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemeContext from "../../../utilies/theme";
import { colors } from "../../../../constants";
import AskModal from "../../../components/AskModal";
import { RouterProps } from "../../Splash/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../constants/colors";
import { signOutFireBase } from "../../../utilies/firebaseConfig";

const Setting = ({ navigation, route }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const removeStorageHandler = async () => {
    try {
      await AsyncStorage.removeItem(process.env.EXPO_PUBLIC_STORAGE_KEY);
      signOutFireBase();
      navigation.navigate("AskAccount");
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelLogout = useCallback(() => {
    setIsLogout(false);
  }, []);

  const logoutHandler = useCallback(() => {
    removeStorageHandler();
  }, []);

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
      <LinearGradient
        colors={isDarkMode ? navbarDarkLinearColors : ["#FF0701", "#FFD28D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: "row",
          height: 120,
          alignItems: "center",
          gap: 24,
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
          style={[
            styles.heading,
            { color: isDarkMode ? "black" : colors.whiteText },
          ]}
        >
          Cài đặt
        </Text>
      </LinearGradient>
      <View
        style={{
          paddingTop: 12,
          paddingHorizontal: 14,
          backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
          gap: 14,
        }}
      >
        <View
          style={[
            styles.featureWrapper,
            {
              borderBottomColor: isDarkMode
                ? colors.darkBg
                : colors.placeHolder,
            },
          ]}
        >
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
        </View>

        <View
          style={[
            styles.featureWrapper,
            {
              borderBottomColor: isDarkMode
                ? colors.darkBg
                : colors.placeHolder,
            },
          ]}
        >
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
        </View>
        <View>
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
            onPress={() => setIsLogout(true)}
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
      </View>
      {isLogout && (
        <AskModal
          content="Đăng xuất tài khoản này?"
          removeContent="Đăng xuất"
          isDarkMode={isDarkMode}
          onAccess={logoutHandler}
          onDiscard={onCancelLogout}
        ></AskModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontFamily: baloo2Fonts.extra,
    color: "#fff",
  },

  featureWrapper: {
    borderBottomWidth: 1,
    paddingBottom: 16,
  },

  headerText: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 36,
    marginLeft: 10,
  },
  options: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
