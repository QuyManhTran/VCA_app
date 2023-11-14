import {
  Text,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { useState, useEffect, useRef, useContext } from "react";
import { colors } from "../../../../constants";
import styles from "./style";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ThemeContext from "../../../utilies/theme";

interface FavoriteModalProps {
  isDarkMode: boolean;
  onCloseModal: any;
}

interface PersonalItem {
  img: any;
  name: string;
  data?: any;
}

const FavoriteModal = ({ isDarkMode, onCloseModal }: FavoriteModalProps) => {
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const { personalLists, onAddList } = useContext(ThemeContext);
  const modalAnimation = useRef(new Animated.Value(0.5)).current;

  const onSelect = (index: number) => {
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

  const onCreating = (e: GestureResponderEvent) => {
    e.stopPropagation();
    onAddList(inputText);
    setInputText("");
    setIsCreating(false);
  };

  useEffect(() => {
    console.log(personalLists);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            transform: [{ scale: modalAnimation }],
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Lưu bài viết vào...</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onCloseModal}
            style={styles.closeIcon}
          >
            <Ionicons name="close" size={30}></Ionicons>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.wrapperContent}>
            {personalLists.map((item: PersonalItem, index: number) => {
              return (
                <View style={styles.listItem} key={index}>
                  <Image
                    source={item.img}
                    resizeMode="cover"
                    style={styles.image}
                  ></Image>
                  <Text style={styles.itemText} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={styles.checkbox}
                    onPress={() => onSelect(index)}
                  >
                    {selectedLists.includes(index) && (
                      <Entypo name="check" size={24} color={"black"}></Entypo>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        {isCreating && (
          <View style={styles.InputWrapper}>
            <Text style={styles.headingInput}>Tên</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên danh sách..."
              spellCheck={false}
              selectionColor={colors.primary}
              onChangeText={(text) => setInputText(text)}
            ></TextInput>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.footer}
          onPress={onToggleCreate}
        >
          <Ionicons
            name={isCreating ? "close-circle-outline" : "add"}
            size={32}
          ></Ionicons>
          <Text style={styles.footerText}>
            {isCreating ? "Hủy danh sách" : "Tạo danh sách mới"}
          </Text>
          {isCreating && (
            <Text onPress={onCreating} style={styles.createText}>
              Tạo
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FavoriteModal;
