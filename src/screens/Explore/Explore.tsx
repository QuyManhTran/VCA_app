import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import LinearBackGround from "../../components/LinearBackGround";
import fontFamilies, { baloo2Fonts } from "../../../constants/fontFamiles";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Modal from "../../components/Modal";
import BackButton from "../../components/BackButton";
import { colors } from "../../../constants";
import NavButton from "../../components/NavButton";
import { RouterProps } from "../Splash/Splash";
import ThemeContext from "../../utilies/theme";
import { useFocusEffect } from "@react-navigation/native";
import RecommendList from "../../components/RecommendList";

const Explore = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, setHomeNavbar, personalLists, onAddList } =
    useContext(ThemeContext);
  const [newList, setNewList] = useState<string | null>("");
  const [isModal, setIsModal] = useState(false);
  const [isGoBack, setIsGoBack] = useState(true);
  const [isNotify, setIsNotify] = useState(true);
  const [prevOffSetY, setPrevOffSetY] = useState(0);
  const onSingleList = (name: string, data, img: any, index: number) => {
    navigation.navigate("SingleList", {
      name: name,
      data: data,
      img: img,
      position: index,
    });
  };

  const onNavigateSearch = useCallback((params: object) => {
    navigation.navigate("Search", params);
  }, []);

  const onNavigateNotification = () => {
    setIsNotify(false);
    navigation.navigate("Notification");
  };

  const onScroll = (scrollY: number) => {
    if (scrollY > prevOffSetY) {
      setHomeNavbar(true);
    } else {
      setHomeNavbar(false);
    }
  };
  // When navigation goBack and set state
  useFocusEffect(
    useCallback(() => {
      setIsGoBack(true);
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearBackGround height={100} isDarkMode={isDarkMode}></LinearBackGround>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.notify}
        onPress={onNavigateNotification}
      >
        <Ionicons
          name={"notifications"}
          size={26}
          color={isDarkMode ? colors.whiteText : "black"}
        ></Ionicons>
        {isNotify && (
          <Entypo name="dot-single" size={30} color="red" style={styles.dot} />
        )}
      </TouchableOpacity>
      <View style={{ position: "absolute", top: 30, left: 12 }}>
        <Text
          style={[
            styles.heading,
            {
              fontSize: 32,
              fontFamily: baloo2Fonts.extra,
              color: isDarkMode ? colors.whiteText : "black",
            },
          ]}
        >
          Thư viện
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(e) => onScroll(e.nativeEvent.contentOffset.y)}
        onScrollEndDrag={(e) => setPrevOffSetY(e.nativeEvent.contentOffset.y)}
      >
        <View style={styles.container}>
          <View style={styles.listWrapper}>
            <RecommendList
              isLibrary={true}
              isDarkMode={isDarkMode}
              onNavigateSearch={onNavigateSearch}
              heading="Xem gần đây"
            ></RecommendList>
            <View style={styles.header}>
              <Text
                style={[
                  styles.heading,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                Danh sách của bạn
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setIsModal(true)}
                style={{ marginRight: 8 }}
              >
                <FontAwesome5
                  name="plus"
                  size={28}
                  color={isDarkMode ? colors.whiteText : "black"}
                />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              {personalLists.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={index}
                  onPress={() => {
                    setIsGoBack(false);
                    onSingleList(item.name, item.data, item.img, index);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: 24,
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                      }}
                      resizeMode="cover"
                    ></Image>
                    <View style={{ marginLeft: 12 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: baloo2Fonts.medium,
                          color: isDarkMode ? colors.whiteText : "black",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: baloo2Fonts.medium,
                          color: isDarkMode
                            ? "rgba(255, 255, 255, 0.6)"
                            : colors.gray,
                        }}
                      >
                        Andrew
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {isModal && (
        <Modal isDarkMode={isDarkMode}>
          <BackButton
            fill
            color={isDarkMode ? colors.whiteText : "black"}
            size={32}
            onPress={() => setIsModal(false)}
            customeStyle={{ marginLeft: 8 }}
          ></BackButton>
          <View style={styles.newListWrapper}>
            <View
              style={{ width: "100%", paddingHorizontal: 24, marginBottom: 36 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamilies.bold,
                  color: isDarkMode ? colors.whiteText : colors.gray,
                  marginBottom: 8,
                }}
              >
                Tên danh sách
              </Text>
              <TextInput
                placeholder="Nhập tên danh sách"
                selectionColor={colors.primary}
                value={newList}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
                style={{
                  backgroundColor: isDarkMode ? colors.darkBg : "#fff",
                  color: isDarkMode ? colors.whiteText : "black",
                  paddingVertical: 8,
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 4,
                  borderColor: colors.primary,
                  fontSize: 20,
                  fontFamily: baloo2Fonts.medium,
                }}
                onChangeText={(text) => setNewList(text)}
              ></TextInput>
            </View>
            <TouchableOpacity
              disabled={newList.trim() ? false : true}
              activeOpacity={0.6}
              onPress={() => {
                onAddList(newList);
                setIsModal(false);
              }}
              style={{ opacity: newList.trim() ? 1 : 0.5, marginBottom: 24 }}
            >
              <NavButton
                customeStyle={{
                  width: "100%",
                  borderRadius: 24,
                  paddingHorizontal: 20,
                }}
              >
                Tạo danh sách
              </NavButton>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginBottom: 36,
  },
  listWrapper: {
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    fontSize: 28,
    fontFamily: baloo2Fonts.bold,
  },
  newListWrapper: {
    alignItems: "center",
  },
  notify: {
    position: "absolute",
    top: 44,
    right: 72,
  },
  dot: {
    position: "absolute",
    top: -14,
    right: -6,
  },
});
export default Explore;
