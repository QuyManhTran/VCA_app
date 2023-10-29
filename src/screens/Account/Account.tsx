import { View, Text, Switch, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, Alert, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { EventRegister } from "react-native-event-listeners";
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';



import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colors } from "../../../constants";
import styles from "./style";
import { baloo2Fonts } from "../../../constants/fontFamiles";

const Account = ({ navigation, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const [avatar, setAvatar] = useState(null);
  const [dataAvatar, setDataAvatar] = useState(null);
  const [coverphoto, setCoverPhoto] = useState(null);
  const [dataCoverphoto, setDataCoverphoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressAvatar, setPressAvatar] = useState(false);
  const [pressCoverPhoto, setPressCoverPhoto] = useState(false);


  const windowWidth = Dimensions.get('window')

  const setActionChooseAvatar = () => {
    setPressCoverPhoto(false);
    setPressAvatar(true);
    setModalVisible(!modalVisible);
  }

  const setActionChooseCoverPhoto = () => {
    setPressCoverPhoto(true);
    setPressAvatar(false);
    setModalVisible(!modalVisible);
  }

  const handleSetAvatar = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
    }



    if (!result.canceled) {
      const isConfirmed = await showConfirmationDialog();
      setModalVisible(!modalVisible);
      if (isConfirmed) {
        setDataAvatar(result.assets[0])
        setAvatar(result.assets[0].uri)
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

  }

  const deleteAvatar = async () => {
    const isComfirmed = await showConfirmationDeleteDialog();
    setModalVisible(!modalVisible);


    if (isComfirmed) {
      setAvatar(null);
      setDataAvatar(null);
    }

  }

  const handleSetCoverPhoto = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
    }



    if (!result.canceled) {

      const isConfirmed = await showConfirmationDialog(); // Hàm xác nhận

      setModalVisible(!modalVisible);
      if (isConfirmed) {
        setDataCoverphoto(result.assets[0]);
        setCoverPhoto(result.assets[0].uri)
      }

    }
  }

  const showConfirmationDialog = () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Xác nhận',
        'Bạn có muốn lấy ảnh này không?',
        [
          {
            text: 'Hủy',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
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
        'Xác nhận',
        'Bạn có muốn xóa ảnh này làm ảnh này không?',
        [
          {
            text: 'Hủy',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };



  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        <View style={styles.header}>

          <View style={{ alignItems: 'flex-end' }} >
            <TouchableOpacity onPress={() => navigation.navigate("Setting")} style={{ marginRight: 10, padding: 6, borderWidth: 1, borderColor: colors.black, borderRadius: 15, }}>
              <AntDesign
                name="setting"
                size={30}
                color="black"

              />
            </TouchableOpacity>
          </View>


          <View style={styles.headerImage}>
            <TouchableOpacity style={{ width: '100%', position: 'relative', borderWidth: 2, borderColor: colors.whiteText }} onPress={setActionChooseCoverPhoto}>
              <Image style={styles.headerImageDetail} source={coverphoto ? { uri: coverphoto } : require('../../../assets/img/accounts/anhNenAccount.png')} />
              <View style={{
                position: 'absolute', bottom: 0, right: 5, zIndex: 9999,
                borderRadius: 50, borderColor: 'white', borderWidth: 2, backgroundColor: colors.whiteText
              }}>
                <MaterialIcons name="photo-camera" size={20}></MaterialIcons>
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.headerAvatar} onPress={() => setActionChooseAvatar()}>
              <Image style={{
                width: '100%', height: '100%', borderRadius: 85,
                borderWidth: 2,
                borderColor: colors.whiteText,
              }} source={avatar ? { uri: avatar } : require('../../../assets/img/accounts/anhDaiDienAccount.png')} />
              <View style={{
                position: 'absolute', bottom: 0, right: 15, zIndex: 9999,
                borderRadius: 50, borderColor: 'white', borderWidth: 2, backgroundColor: colors.whiteText
              }}>
                <MaterialIcons name="photo-camera" size={20}></MaterialIcons>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerTextName}>Charlie Puth</Text>
            <Text style={styles.headerTextEmail}>user12345@gmail.com</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditInfo')}>
              <View style={styles.headerTextEdit}>
                <Text style={styles.headerTextEditText} >Chỉnh sửa thông tin</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Nội dung</Text>
            <TouchableOpacity style={styles.contentContent}>
              <View style={{ paddingLeft: 17, flexDirection: 'row', justifyContent: 'center' }}>
                <EvilIcons name="heart" size={30} color="black" />
                <Text style={styles.contentHeart}>Yêu thích</Text>
              </View>

              <Entypo name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
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
          </View>




          <View style={{ height: 150 }}></View>


        </View>
      </ScrollView>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        </TouchableOpacity>
        {pressAvatar && <View style={{ height: 300, backgroundColor: colors.whiteText, borderRadius: 25 }}>

          <TouchableOpacity style={styles.modalWapper}
            onPress={() => navigation.navigate('showImage', { data: dataAvatar })}>
            <MaterialIcons name="account-circle" size={25} color="black" />
            <Text style={styles.modalCompoment}>Xem ảnh đại diện</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalWapper} onPress={() => handleSetAvatar(false)}>
            <Entypo name="folder-images" size={24} color="black" />
            <Text style={styles.modalCompoment}>Chọn ảnh đại diện từ thư viện</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.modalWapper} onPress={() => handleSetAvatar(true)}>
            <AntDesign name="camera" size={24} color="black" />
            <Text style={styles.modalCompoment}>Chọn ảnh bìa từ camera </Text>

          </TouchableOpacity>

          {avatar && <TouchableOpacity style={styles.modalWapper} onPress={deleteAvatar}>
            <AntDesign name="delete" size={24} color="black" />
            <Text style={styles.modalCompoment}>Xóa ảnh đại diện </Text>

          </TouchableOpacity>}

        </View>}

        {
          pressCoverPhoto && <View style={{ height: 300, backgroundColor: colors.whiteText, borderRadius: 25 }}>

            <TouchableOpacity style={styles.modalWapper} onPress={() => navigation.navigate('showImage', { data: dataCoverphoto })} >
              <Entypo name="image" size={24} color="black" />
              <Text style={styles.modalCompoment}>Xem ảnh bìa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalWapper} onPress={() => handleSetCoverPhoto(false)}>
              <Entypo name="folder-images" size={24} color="black" />
              <Text style={styles.modalCompoment}>Chọn ảnh bìa từ thư viên </Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.modalWapper} onPress={() => handleSetCoverPhoto(true)}>
              <AntDesign name="camera" size={24} color="black" />
              <Text style={styles.modalCompoment}>Chọn ảnh bìa từ camera </Text>

            </TouchableOpacity>

            {coverphoto && <TouchableOpacity style={styles.modalWapper} onPress={deleteCoverPhoto}>
              <AntDesign name="delete" size={24} color="black" />
              <Text style={styles.modalCompoment}>Xóa ảnh bìa</Text>

            </TouchableOpacity>}
          </View>
        }

      </Modal>



    </SafeAreaView>
  )

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