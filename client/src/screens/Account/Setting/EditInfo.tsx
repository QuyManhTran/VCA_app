import {
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import { useHeaderHeight } from "@react-navigation/elements";
import { memo, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../../../constants";

const EditInfo = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataImage, setDataImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] =
    useState("25 tháng 10, 2023");
  const [showPicker, setShowPicker] = useState(false);

  // birthday
  const toggleDatapicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        const vietnameseDate = new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(currentDate);

        setSelectedStartDate(vietnameseDate);
        toggleDatapicker();
      }
    } else {
      toggleDatapicker();
    }
  };

  // Post all data to api
  const onSaveData = () => {
    const formData = new FormData();

    formData.append("name", fullName);
    formData.append("phone", phoneNumber);
    formData.append("birthdate", selectedStartDate);
    formData.append("images", JSON.stringify(dataImage));

    console.log(formData);

    fetch("http://192.147.66.100:4000/edit-list-user", {
      method: "POST",
      body: JSON.stringify({
        data: dataImage,
      }),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  // fetch
  const getListUser = async () => {
    try {
      const response = await fetch("http://192.147.66.100:4000/list-user");
      const json = await response.json();
      setData(json);
      setFullName(json[0].name);
      setPhoneNumber(json[0].phone);
      setSelectImage(
        "http://192.168.0.64:4000" +
          json[0].image.substring(2, json[0].image.length)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getListUser();
  }, []);

  // avatar

  // goback
  const onBack = () => {
    navigation.goBack();
  };

  // KeyboardAvoidingView
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexGrow: 1 }}>
          <LinearBackGround
            height={100}
            back={true}
            avatar={false}
            onPress={onBack}
            // isDarkMode={isDarkMode}
          ></LinearBackGround>

          <Text style={styles.title}>Thông tin cá nhân </Text>
          <Text style={styles.textLable}>Tên</Text>
          <View style={styles.wapperEdit}>
            <TextInput
              style={styles.textEdit}
              editable={true}
              onChangeText={(value) => setFullName(value)}
              placeholder="Tên của bạn"
              selectionColor={colors.primary}
            >
              {fullName}
            </TextInput>
          </View>

          <Text style={styles.textLable}>Số điện thoại</Text>
          <View style={styles.wapperEdit}>
            <TextInput
              style={styles.textEdit}
              onChangeText={(value) => setPhoneNumber(value)}
              placeholder="0123456789"
              selectionColor={colors.primary}
            >
              {phoneNumber}
            </TextInput>
          </View>
          <Text style={styles.textLable}>Ngày sinh</Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              onChange={onChange}
              value={date}
            />
          )}

          <Pressable onPress={toggleDatapicker} style={styles.wapperEdit}>
            <TextInput
              editable={false}
              value={selectedStartDate}
              placeholderTextColor={colors.black}
              style={styles.textEdit}
              placeholder="Tên của bạn"
              selectionColor={colors.primary}
            ></TextInput>
          </Pressable>

          <TouchableOpacity
            style={{
              height: 70,
              marginLeft: 10,
              marginTop: 10,
              borderTopWidth: 1,
              borderTopColor: "#D9D9D9",
              flexDirection: "row",
              borderBottomColor: "#D9D9D9",
              borderBottomWidth: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Password")}
          >
            <Text
              style={{
                fontFamily: baloo2Fonts.bold,

                fontSize: 20,
              }}
            >
              Thay đổi mật khẩu
            </Text>

            <Entypo
              style={{ marginRight: 5 }}
              name="chevron-right"
              size={25}
              color="black"
            />
          </TouchableOpacity>

          <View style={styles.summitWapper}>
            <TouchableOpacity onPress={onSaveData}>
              <Text style={styles.summitText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 10,
  },

  textLable: {
    // borderTopWidth: 1,
    // borderTopColor: "#D9D9D9",
    marginTop: 10,
    fontFamily: baloo2Fonts.bold,
    marginLeft: 10,
    fontSize: 20,
  },

  wapperEdit: {
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    borderRadius: 15,
    height: 60,
  },

  textEdit: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.black,
    fontFamily: baloo2Fonts.regular,
    fontSize: 22,
  },

  summitWapper: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  summitText: {
    paddingHorizontal: 10,
    backgroundColor: "#FF9900",
    borderRadius: 15,
    fontFamily: baloo2Fonts.bold,
    fontSize: 25,
    color: colors.whiteText,
  },
});

export default memo(EditInfo);
