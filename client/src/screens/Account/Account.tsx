import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import ThemeContext from "../../utilies/theme";
import * as ImagePicker from "expo-image-picker";
import {
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants";
import styles from "./style";
import RecommendList from "../../components/RecommendList";
import { recommendLists } from "../../../assets/img/foods";
import { RouterProps } from "../Splash/Splash";
import {
  changeAvatarService,
  changeCoverPhotoService,
  deletePhotoService,
} from "../../services/profileService";
import ToastNotify, { Status } from "../../components/ToastNotify/ToastNotify";
const uriBase64 = "data:image/jpeg;base64,";
const Account = ({ navigation, ...props }: RouterProps) => {
  const { width } = useWindowDimensions();
  const { isDarkMode, userInfor, userId, setHomeNavbar, onUserInfor } =
    useContext(ThemeContext);
  const { avatar, cover } = userInfor;
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [dataAvatar, setDataAvatar] = useState<any>();
  const [dataCoverphoto, setDataCoverphoto] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [pressAvatar, setPressAvatar] = useState(false);
  const [pressCoverPhoto, setPressCoverPhoto] = useState(false);
  const [prevOffSetY, setPrevOffSetY] = useState(0);

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
        quality: 1,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
    }

    if (!result.canceled) {
      const isConfirmed = await showConfirmationDialog();
      setModalVisible(!modalVisible);
      if (isConfirmed) {
        setDataAvatar(result.assets[0]);
      }
    }
  };

  const deleteCoverPhoto = async () => {
    const isComfirmed = await showConfirmationDeleteDialog();
    setModalVisible(!modalVisible);

    if (isComfirmed) {
      setDataCoverphoto(null);
      const response = await deletePhotoService.deletePhoto(
        deletePhotoService.deletePhotoPath,
        {
          id_user: userId,
          typeImage: "cover",
        }
      );
      if (response.message !== 200) {
        setMessage(response.message);
        setIsLoading(false);
        setStatus("error");
      } else {
        onUserInfor({ ...userInfor, cover: "" });
        setMessage("Xóa ảnh bìa thành công");
        setIsLoading(false);
        setStatus("success");
      }
    }
  };

  const deleteAvatar = async () => {
    const isComfirmed = await showConfirmationDeleteDialog();
    setModalVisible(!modalVisible);

    if (isComfirmed) {
      setDataAvatar(null);
      const response = await deletePhotoService.deletePhoto(
        deletePhotoService.deletePhotoPath,
        {
          id_user: userId,
          typeImage: "avatar",
        }
      );
      if (response.message !== 200) {
        setMessage(response.message);
        setIsLoading(false);
        setStatus("error");
      } else {
        onUserInfor({ ...userInfor, avatar: "" });
        setMessage("Xóa avatar thành công");
        setIsLoading(false);
        setStatus("success");
      }
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

  const onNavigateSearch = useCallback((params: object) => {
    navigation.navigate("Search", params);
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    navigation.navigate("Blog", { ...props });
  }, []);

  const onNavigateEditInfor = () =>
    navigation.navigate("EditInfor", {
      username: userInfor?.username || "Andrew",
      birthday: userInfor?.birthday || "04 tháng 5 năm 2003",
      phoneNumber: userInfor?.phoneNumber || "0123456789",
      isDarkMode: isDarkMode,
      userId: userId,
    });

  const onNavigatePassword = () => {
    navigation.navigate("Password", {
      isDarkMode: isDarkMode,
      email: userInfor.email,
    });
  };
  const onScroll = (scrollY: number) => {
    if (scrollY > prevOffSetY) {
      setHomeNavbar(true);
    } else {
      setHomeNavbar(false);
    }
  };

  const onToggleLoading = (result: boolean | null) => {
    setIsLoading(result);
  };

  useEffect(() => {
    if (dataAvatar) {
      const data = uriBase64 + dataAvatar?.base64;
      const requestAvatar = async () => {
        const response = await changeAvatarService.changeAvatar(
          changeAvatarService.changeAvatarPath,
          {
            image: data,
            id_user: userId,
            typeImage: "avatar",
          }
        );
        if (response.message !== 200) {
          setMessage(response.message);
          setIsLoading(false);
          setStatus("error");
        } else {
          onUserInfor({ ...userInfor, avatar: data });
          setMessage("Đổi avatar thành công");
          setIsLoading(false);
          setStatus("success");
        }
      };
      requestAvatar();
    }
  }, [dataAvatar]);

  useEffect(() => {
    if (dataCoverphoto) {
      const data = uriBase64 + dataCoverphoto?.base64;
      const requestAvatar = async () => {
        const response = await changeCoverPhotoService.changeCoverPhoto(
          changeCoverPhotoService.changCoverPhotoPath,
          {
            image: data,
            id_user: userId,
            typeImage: "cover",
          }
        );
        if (response.message !== 200) {
          setMessage(response.message);
          setIsLoading(false);
          setStatus("error");
        } else {
          onUserInfor({ ...userInfor, cover: data });
          setMessage("Đổi ảnh bìa thành công");
          setIsLoading(false);
          setStatus("success");
        }
      };
      requestAvatar();
    }
  }, [dataCoverphoto]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 40 }}
        onScroll={(e) => onScroll(e.nativeEvent.contentOffset.y)}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headerTextName}>
              {userInfor?.username || "Andrew"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting")}
              style={{
                position: "absolute",
                right: 10,
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
                    borderTopLeftRadius: cover ? 999 : 0,
                    borderTopRightRadius: cover ? 999 : 0,
                  },
                ]}
                source={
                  cover
                    ? { uri: cover }
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
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.content}>
            <View
              style={[
                styles.contentHeading,
                { paddingLeft: width < 400 ? 8 : 20 },
              ]}
            >
              <Text style={styles.contentTitle}>Tiểu sử</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onNavigateEditInfor}
                style={{ marginRight: 12 }}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContent}>
              <View
                style={[
                  styles.itemWrapper,
                  { paddingLeft: width < 400 ? 8 : 20 },
                ]}
              >
                <FontAwesome name="birthday-cake" size={24} color="black" />
                <Text style={styles.contentItem}>04/05/2003</Text>
              </View>
              <View
                style={[
                  styles.itemWrapper,
                  { paddingLeft: width < 400 ? 8 : 20 },
                ]}
              >
                <Ionicons name="call" size={24} color="black" />
                <Text style={styles.contentItem}>0123456789</Text>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View
              style={[
                styles.contentHeading,
                { paddingLeft: width < 400 ? 8 : 20 },
              ]}
            >
              <Text style={styles.contentTitle}>Tài khoản cá nhân</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onNavigatePassword}
                style={{ marginRight: 12 }}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContent}>
              <View
                style={[
                  styles.itemWrapper,
                  { paddingLeft: width < 400 ? 8 : 20 },
                ]}
              >
                <MaterialIcons name="alternate-email" size={24} color="black" />
                <Text style={styles.contentItem}>
                  {userInfor?.email || "andrew03@gmail.com"}
                </Text>
              </View>
              <View
                style={[
                  styles.itemWrapper,
                  { paddingLeft: width < 400 ? 8 : 20 },
                ]}
              >
                <FontAwesome5 name="lock" size={24} color="black" />
                <Text style={styles.contentItem}>***********</Text>
              </View>
            </View>
          </View>
          <View style={[styles.content, { gap: 12 }]}>
            <View
              style={[
                styles.contentHeading,
                { paddingLeft: width < 400 ? 8 : 20 },
              ]}
            >
              <Text style={styles.contentTitle}>Hoạt động gần đây</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("EditInfo")}
                style={{ marginRight: 12 }}
              >
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <RecommendList
              trending="Tết"
              isDarkMode={isDarkMode}
              onNavigateSearch={onNavigateSearch}
              heading="Thêm gần đây"
              data={recommendLists}
              onBlog={onBlog}
              isAccount
            ></RecommendList>
          </View>
        </View>
      </ScrollView>
      {isLoading === false && (
        <ToastNotify
          isLoading={isLoading}
          onToggleLoading={onToggleLoading}
          status={status}
          text={message}
        ></ToastNotify>
      )}
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
                  navigation.navigate("showImage", {
                    data: avatar ? { uri: avatar } : undefined,
                  })
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
                  navigation.navigate("showImage", {
                    data: cover
                      ? {
                          uri: cover,
                        }
                      : undefined,
                  })
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

              {cover && (
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
