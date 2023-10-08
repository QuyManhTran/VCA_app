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
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "../../components/Modal";
import BackButton from "../../components/BackButton";
import { colors } from "../../../constants";
import NavButton from "../../components/NavButton";
import { RouterProps } from "../Splash/Splash";
import { mostlySearch } from "../../../constants/fakeData";
import ThemeContext from "../../utilies/theme";
import { useFocusEffect } from "@react-navigation/native";

const Explore = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, personalLists, onAddList, onRemoveList } =
    useContext(ThemeContext);
  const [newList, setNewList] = useState<string | null>("");
  const [isModal, setIsModal] = useState(false);
  const [isGoBack, setIsGoBack] = useState(true);
  const onSingleList = (name: string, data, img: any, index: number) => {
    navigation.navigate("SingleList", {
      name: name,
      data: data,
      img: img,
      position: index,
    });
  };
  // When navigation goBack and set state
  useFocusEffect(
    useCallback(() => {
      setIsGoBack(true);
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <LinearBackGround height={100}></LinearBackGround>
      <View style={{ position: "absolute", top: 30, left: 12 }}>
        <Text style={[styles.heading, { fontSize: 30 }]}>Thư viện</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.listWrapper}>
            <View style={styles.header}>
              <Text style={styles.heading}>Danh sách của bạn</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setIsModal(true)}
                style={{ marginRight: 8 }}
              >
                <FontAwesome5 name="plus" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              {personalLists.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={index}
                  onPress={() => {
                    setIsGoBack(false);
                    onSingleList(item.name, mostlySearch, item.img, index);
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
                          fontFamily: baloo2Fonts.bold,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: baloo2Fonts.bold,
                          color: colors.gray,
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
        <Modal>
          <BackButton
            fill
            color="black"
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
                  color: colors.gray,
                  marginBottom: 8,
                }}
              >
                Tên danh sách
              </Text>
              <TextInput
                placeholder="Nhập tên danh sách"
                selectionColor={colors.primary}
                value={newList}
                style={{
                  backgroundColor: "#fff",
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
});
export default Explore;
