import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import ThemeContext from "../../utilies/theme";
import LinearBackGround from "../../components/LinearBackGround";
import { RouterProps } from "../Splash/Splash";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
import NotifyItem from "../../components/NotifyItem";

const Notification = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
      <LinearBackGround
        height={width < 400 ? 100 : 120}
        back={true}
        avatar={false}
        onPress={onBack}
        isDarkMode={isDarkMode}
      ></LinearBackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Thông báo của tôi
          </Text>
          <View style={styles.contentWrapper}>
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Hôm nay
            </Text>
            <NotifyItem isDarkMode={isDarkMode} isComment={false}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={true}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={true}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={false}></NotifyItem>
          </View>
          <View style={styles.contentWrapper}>
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Trước đó
            </Text>
            <NotifyItem isDarkMode={isDarkMode} isComment={false}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={false}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={false}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={true}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={true}></NotifyItem>
            <NotifyItem isDarkMode={isDarkMode} isComment={true}></NotifyItem>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 30,
    fontFamily: baloo2Fonts.bold,
  },
  contentWrapper: {
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: baloo2Fonts.bold,
    marginBottom: 4,
  },
});
