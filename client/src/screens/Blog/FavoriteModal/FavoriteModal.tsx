import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  TextInput,
  GestureResponderEvent,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useRef, useContext } from "react";
import { colors } from "../../../../constants";
import styles from "./style";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ThemeContext from "../../../utilies/theme";
import { list } from "../../../../assets/img/foods";
import { addItemListService } from "../../../services/listService";

interface FavoriteModalProps {
  blogId: string;
  isDarkMode: boolean;
  onCloseModal: any;
  onFavoriting: any;
}

interface PersonalItem {
  name: string;
  id: string;
}

const FavoriteModal = ({
  blogId,
  isDarkMode,
  onCloseModal,
  onFavoriting,
}: FavoriteModalProps) => {
  const { width } = useWindowDimensions();
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const { personalLists, onAddList, onAddItemList } = useContext(ThemeContext);
  const modalAnimation = useRef(new Animated.Value(0.5)).current;

  const onSelect = (index: string) => {
    if (selectedLists.includes(index)) {
      const newLists = selectedLists.filter((list) => list !== index);
      setSelectedLists(newLists);
    } else {
      setSelectedLists((prev) => [...prev, index]);
    }
  };

  const onToggleCreate = () => {
    setIsCreating((prev) => {
      if (prev) {
        setInputText("");
      }
      return !prev;
    });
  };

  const onCreating = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    onAddList(inputText);
    setInputText("");
    setIsCreating(false);
  };

  const onSave = async () => {
    // call API
    if (selectedLists.length) {
      onAddItemList(blogId, selectedLists);
      onFavoriting();
    }
    onCloseModal();
  };

  useEffect(() => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.wrapper,
            {
              backgroundColor: isDarkMode ? colors.darkBg : "#fff",
              maxHeight: width < 400 ? 450 : 500,
              transform: [{ scale: modalAnimation }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.headerText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Lưu bài viết vào...
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onCloseModal}
              style={styles.closeIcon}
            >
              <Ionicons
                name="close"
                size={30}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={true}>
            <View
              style={[
                styles.wrapperContent,
                { backgroundColor: isDarkMode ? "transparent" : "#fff" },
              ]}
              onStartShouldSetResponder={() => true}
            >
              {personalLists.map((item: PersonalItem, index: number) => {
                return (
                  <View style={[styles.listItem]} key={index}>
                    <Image
                      source={list}
                      resizeMode="cover"
                      style={styles.image}
                    ></Image>
                    <Text
                      style={[
                        styles.itemText,
                        { color: isDarkMode ? colors.whiteText : "black" },
                      ]}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      style={[
                        styles.checkbox,
                        {
                          borderColor: isDarkMode ? colors.whiteText : "black",
                          backgroundColor: isDarkMode ? "transparent" : "#fff",
                        },
                      ]}
                      onPress={() => onSelect(item.id)}
                    >
                      {selectedLists.includes(item.id) && (
                        <Entypo
                          name="check"
                          size={24}
                          color={isDarkMode ? colors.whiteText : "black"}
                        ></Entypo>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {isCreating && (
            <View style={styles.InputWrapper}>
              <Text
                style={[
                  styles.headingInput,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                Tên
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: isDarkMode ? colors.whiteText : "black",
                  },
                ]}
                placeholder="Nhập tên danh sách..."
                spellCheck={false}
                selectionColor={colors.primary}
                onChangeText={(text) => setInputText(text)}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
              ></TextInput>
            </View>
          )}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footer, { marginTop: 0 }]}
              activeOpacity={0.6}
              onPress={onToggleCreate}
            >
              <Ionicons
                name={isCreating ? "close-circle-outline" : "add"}
                size={32}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
              <Text
                style={[
                  styles.footerText,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                {isCreating ? "Hủy danh sách" : "Tạo danh sách mới"}
              </Text>
            </TouchableOpacity>
            {isCreating && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
                onPress={onCreating}
                disabled={!inputText.trim()}
              >
                <Text
                  style={[
                    styles.createText,
                    { opacity: inputText.trim() ? 1 : 0.5 },
                  ]}
                >
                  Tạo
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {!isCreating && (
            <TouchableOpacity
              onPress={onSave}
              activeOpacity={0.6}
              style={styles.doneSelection}
            >
              <Ionicons
                name={"checkmark"}
                size={32}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
              <Text
                style={[
                  styles.footerText,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                Xong
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FavoriteModal;
