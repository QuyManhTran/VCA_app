import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../utilies/theme";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants";
import styles from "./style";
const uriBase64 = "data:image/jpeg;base64,";
const Account = ({ navigation, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [avatar, setAvatar] = useState(null);
  const [dataAvatar, setDataAvatar] = useState(null);
  const [coverphoto, setCoverPhoto] = useState(null);
  const [dataCoverphoto, setDataCoverphoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressAvatar, setPressAvatar] = useState(false);
  const [pressCoverPhoto, setPressCoverPhoto] = useState(false);

  const setActionChooseAvatar = () => {
    setPressCoverPhoto(false);
    setPressAvatar(true);
    setModalVisible(!modalVisible);
  };

  const setActionChooseCoverPhoto = () => {
    setPressCoverPhoto(true);
    setPressAvatar(false);
    setModalVisible(!modalVisible);
  };

  const handleSetAvatar = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    }

    if (!result.canceled) {
      const isConfirmed = await showConfirmationDialog();
      setModalVisible(!modalVisible);
      if (isConfirmed) {
        setDataAvatar(result.assets[0]);
        setAvatar(result.assets[0].uri);
      }
    }
  };

  const deleteCoverPhoto = async () => {
    const isComfirmed = await showConfirmationDeleteDialog();
    setModalVisible(!modalVisible);

    if (isComfirmed) {
      setCoverPhoto(null);
      setDataCoverphoto(null);
    }
  };

  const deleteAvatar = async () => {
    const isComfirmed = await showConfirmationDeleteDialog();
    setModalVisible(!modalVisible);

    if (isComfirmed) {
      setAvatar(null);
      setDataAvatar(null);
    }
  };

  const handleSetCoverPhoto = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    }

    if (!result.canceled) {
      const isConfirmed = await showConfirmationDialog(); // Hàm xác nhận

      setModalVisible(!modalVisible);
      if (isConfirmed) {
        setDataCoverphoto(result.assets[0]);
        setCoverPhoto(result.assets[0].uri);
      }
    }
  };

  const showConfirmationDialog = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        "Bạn có muốn lấy ảnh này không?",
        [
          {
            text: "Hủy",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const showConfirmationDeleteDialog = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        "Bạn có muốn xóa ảnh này không?",
        [
          {
            text: "Hủy",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  useEffect(() => {
    if (dataAvatar) {
      // api avatar image
      // const data = uriBase64 + dataAvatar?.base64;
    }
  }, [dataAvatar]);

  useEffect(() => {
    if (dataCoverphoto) {
      // api cover photo image
      // const data = uriBase64 + dataAvatar?.base64;
    }
  }, [dataCoverphoto]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 40 }}>
        <View style={styles.header}>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting")}
              style={{
                marginRight: 10,
                padding: 6,
                borderWidth: 1,
                borderColor: colors.black,
                borderRadius: 15,
              }}
            >
              <AntDesign name="setting" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerImage}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                width: "100%",
                position: "relative",
                borderWidth: 2,
                borderColor: colors.whiteText,
              }}
              onPress={setActionChooseCoverPhoto}
            >
              <Image
                style={[
                  styles.headerImageDetail,
                  {
                    borderTopLeftRadius: coverphoto ? 999 : 0,
                    borderTopRightRadius: coverphoto ? 999 : 0,
                  },
                ]}
                source={
                  coverphoto
                    ? { uri: coverphoto }
                    : require("../../../assets/img/accounts/anhNenAccount.png")
                }
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 5,
                  zIndex: 9999,
                  borderRadius: 50,
                  borderColor: "white",
                  borderWidth: 2,
                  backgroundColor: colors.whiteText,
                }}
              >
                <MaterialIcons name="photo-camera" size={20}></MaterialIcons>
              </View>
            </TouchableOpacity>

            <View style={styles.headerAvatar}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setActionChooseAvatar()}
              >
                <Image
                  style={{
                    width: 150,
                    height: "100%",
                    borderRadius: 85,
                    borderWidth: 2,
                    borderColor: colors.whiteText,
                  }}
                  source={
                    avatar
                      ? { uri: avatar }
                      : require("../../../assets/img/accounts/anhDaiDienAccount.png")
                  }
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 15,
                    zIndex: 9999,
                    borderRadius: 50,
                    borderColor: "white",
                    borderWidth: 2,
                    backgroundColor: colors.whiteText,
                  }}
                >
                  <MaterialIcons name="photo-camera" size={20}></MaterialIcons>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerTextName}>Charlie Puth</Text>
            <Text style={styles.headerTextEmail}>user12345@gmail.com</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("EditInfo")}
            >
              <View style={styles.headerTextEdit}>
                <Text style={styles.headerTextEditText}>
                  Chỉnh sửa thông tin
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Nội dung</Text>
            <TouchableOpacity style={styles.contentContent}>
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
            </TouchableOpacity>
          </View>

          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
      {modalVisible && (
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "flex-end",
          }}
        >
          {pressAvatar && (
            <View
              style={{
                backgroundColor: colors.whiteText,
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24,
                paddingBottom: 82,
              }}
            >
              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() =>
                  navigation.navigate("showImage", { data: dataAvatar })
                }
              >
                <MaterialIcons name="account-circle" size={25} color="black" />
                <Text style={styles.modalCompoment}>Xem ảnh đại diện</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() => handleSetAvatar(true)}
              >
                <AntDesign name="camera" size={24} color="black" />
                <Text style={styles.modalCompoment}>
                  Chọn ảnh đại diện từ camera{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() => handleSetAvatar(false)}
              >
                <Entypo name="folder-images" size={24} color="black" />
                <Text style={styles.modalCompoment}>
                  Chọn ảnh đại diện từ thư viện
                </Text>
              </TouchableOpacity>

              {avatar && (
                <TouchableOpacity
                  style={styles.modalWapper}
                  onPress={deleteAvatar}
                >
                  <AntDesign name="delete" size={24} color="black" />
                  <Text style={styles.modalCompoment}>Xóa ảnh đại diện </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {pressCoverPhoto && (
            <View
              style={{
                height: 300,
                backgroundColor: colors.whiteText,
                borderRadius: 25,
              }}
            >
              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() =>
                  navigation.navigate("showImage", { data: dataCoverphoto })
                }
              >
                <Entypo name="image" size={24} color="black" />
                <Text style={styles.modalCompoment}>Xem ảnh bìa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() => handleSetCoverPhoto(true)}
              >
                <AntDesign name="camera" size={24} color="black" />
                <Text style={styles.modalCompoment}>
                  Chọn ảnh bìa từ camera{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalWapper}
                onPress={() => handleSetCoverPhoto(false)}
              >
                <Entypo name="folder-images" size={24} color="black" />
                <Text style={styles.modalCompoment}>
                  Chọn ảnh bìa từ thư viện{" "}
                </Text>
              </TouchableOpacity>

              {coverphoto && (
                <TouchableOpacity
                  style={styles.modalWapper}
                  onPress={deleteCoverPhoto}
                >
                  <AntDesign name="delete" size={24} color="black" />
                  <Text style={styles.modalCompoment}>Xóa ảnh bìa</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default Account;

{
  /* <View style={styles.option}>
            <Text style={styles.optionTitle}>Tùy chọn</Text>

            <TouchableOpacity style={styles.optionLanguage}>
              <View style={styles.optionLanguageTitle}>
                <MaterialIcons name="language" size={25} color="black" />
                <Text style={styles.contentHeart}>Ngôn ngữ</Text>
              </View>
              <View style={styles.optionLanguageContent}>
                <Text style={styles.optionLanguageContentText}>Tiếng việt</Text>
                <Entypo name="chevron-right" size={25} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionDisplay} onPress={() => navigation.navigate('Display')}>
              <View style={styles.optionLanguageTitle}>
                <MaterialIcons name="settings-display" size={24} color="black" />
                <Text style={styles.contentHeart}>Giao diện</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.privacy}>
            <Text style={styles.optionTitle}>Bảo mật</Text>
            <TouchableOpacity style={styles.optionLanguage} onPress={() => navigation.navigate('Password')}>
              <View style={styles.optionLanguageTitle}>
                <Entypo name="lock" size={25} color="black" />
                <Text style={styles.contentHeart} >Thay đổi mật khẩu</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View> */
}
