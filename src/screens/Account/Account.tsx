import {
  View,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { EventRegister } from "react-native-event-listeners";
import styles from "./style";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../../constants";

const Account = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(isDarkMode);
  return (
    <View style={styles.container}>
      <>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headerImage}>
              <View style={{ position: "absolute", right: 20, top: 20 }}>
                <TouchableOpacity>
                  <AntDesign
                    name="setting"
                    size={30}
                    color="black"
                    onPress={() => navigation.navigate("Setting")}
                  />
                </TouchableOpacity>
              </View>

              <Image
                style={styles.headerImageDetail}
                resizeMode="contain"
                source={require("../../../assets/img/accounts/anhNenAccount.png")}
              />
              <View style={styles.headerAvatar}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../../../assets/img/accounts/anhDaiDienAccount.png")}
                />
              </View>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTextName}>Charlie Puth</Text>
              <Text style={styles.headerTextEmail}>user12345@gmail.com</Text>
              <TouchableOpacity onPress={() => navigation.navigate("EditInfo")}>
                <View style={styles.headerTextEdit}>
                  <Text style={styles.headerTextEditText}>
                    Chỉnh sửa thông tin cá nhân
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={(value) => {
              setDarkMode(value);
              EventRegister.emit("ChangeTheme", value);
            }}
            style={[{ transform: [{ scale: 1.5 }] }, { width: 30 }]}
          ></Switch>
          <View style={styles.menuContainer}>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Nội dung</Text>
              <View style={styles.contentContent}>
                <View
                  style={{
                    paddingLeft: 17,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <EvilIcons name="heart" size={30} color="black" />
                  <Text style={styles.contentHeart}>Yêu thích</Text>
                </View>

                <Entypo name="chevron-right" size={25} color="black" />
              </View>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionTitle}>Tùy chọn</Text>

              <View style={styles.optionLanguage}>
                <View style={styles.optionLanguageTitle}>
                  <MaterialIcons name="language" size={25} color="black" />
                  <Text style={styles.contentHeart}>Ngôn ngữ</Text>
                </View>
                <View style={styles.optionLanguageContent}>
                  <Text style={styles.optionLanguageContentText}>
                    Tiếng việt
                  </Text>
                  <Entypo name="chevron-right" size={25} color="black" />
                </View>
              </View>

              <View style={styles.optionDisplay}>
                <View style={styles.optionLanguageTitle}>
                  <MaterialIcons
                    name="settings-display"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.contentHeart}>Giao diện</Text>
                </View>
                <Entypo name="chevron-right" size={25} color="black" />
              </View>
            </View>

            <View style={styles.privacy}>
              <Text style={styles.optionTitle}>Bảo mật</Text>
              <View style={styles.optionLanguage}>
                <View style={styles.optionLanguageTitle}>
                  <Entypo name="lock" size={25} color="black" />
                  <Text style={styles.contentHeart}>Thay đổi mật khẩu</Text>
                </View>
                <Entypo name="chevron-right" size={25} color="black" />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

export default Account;

// return (
//   <View
//     style={{
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: darkMode ? darkTheme.backGroundColor : undefined,
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 30,
//         fontWeight: "600",
//         color: darkMode ? darkTheme.color : undefined,
//       }}
//     >
//       ACCOUNT
//     </Text>
//     <Switch
//       value={darkMode}
//       onValueChange={(value) => {
//         setDarkMode(value);
//         EventRegister.emit("ChangeTheme", value);
//       }}
//       style={[{ transform: [{ scale: 1.5 }] }, { width: 30 }]}
//     ></Switch>
//   </View>
// );
