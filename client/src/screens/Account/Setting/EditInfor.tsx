import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import { memo, useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../../../constants";
import { RouterProps } from "../../Splash/Splash";
import { LinearGradient } from "expo-linear-gradient";
import {
  linearColors,
  navbarDarkLinearColors,
} from "../../../../constants/colors";
import ToastNotify, {
  Status,
} from "../../../components/ToastNotify/ToastNotify";
import { editInforService } from "../../../services/profileService";

const EditInfor = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, userId, onUserInfor, userInfor } = route.params;
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [fullName, setFullName] = useState(route.params?.username || "");
  const [phoneNumber, setPhoneNumber] = useState(
    route.params?.phoneNumber || ""
  );
  const [date, setDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    route.params?.birthday || ""
  );
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  // birthday
  const toggleDatapicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        const vietnameseDate = new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(currentDate);

        setSelectedStartDate(vietnameseDate);
        toggleDatapicker();
      }
    } else {
      toggleDatapicker();
    }
  };

  // Post all data to api
  const onSaveData = async () => {
    setIsLoading(true);
    const data = {
      birthday: selectedStartDate,
      phoneNumber: phoneNumber,
      username: fullName,
    };
    const response = await editInforService.editInfor(
      editInforService.editInforPath,
      { ...data, id_user: userId }
    );
    if (response.message !== 200) {
      setMessage(response.message);
      setIsLoading(false);
      setStatus("error");
    } else {
      setIsLoading(false);
      setStatus("success");
      setMessage("Thay đổi thành công");
      onUserInfor({ ...userInfor, ...data });
    }
  };

  const onToggleLoading = (result: boolean | null) => {
    setIsLoading(result);
  };

  // goback
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
        }}
      >
        <LinearBackGround
          height={120}
          back={true}
          avatar={false}
          onPress={onBack}
          isDarkMode={isDarkMode}
        ></LinearBackGround>

        <Text
          style={[
            styles.title,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Thông tin cá nhân{" "}
        </Text>
        <Text
          style={[
            styles.textLable,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Tên
        </Text>
        <View
          style={[
            styles.wapperEdit,
            { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
          ]}
        >
          <TextInput
            defaultValue={route.params?.username || "Andrew"}
            style={[
              styles.textEdit,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
            placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
            editable={true}
            onChangeText={(value) => setFullName(value)}
            placeholder="Tên của bạn"
            selectionColor={colors.primary}
          ></TextInput>
        </View>

        <Text
          style={[
            styles.textLable,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Số điện thoại
        </Text>
        <View
          style={[
            styles.wapperEdit,
            { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
          ]}
        >
          <TextInput
            style={[
              styles.textEdit,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
            placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
            onChangeText={(value) => setPhoneNumber(value)}
            placeholder="0123456789"
            selectionColor={colors.primary}
            defaultValue={route.params?.phoneNumber || ""}
            keyboardType="number-pad"
          ></TextInput>
        </View>
        <Text
          style={[
            styles.textLable,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Ngày sinh
        </Text>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            onChange={onChange}
            value={date}
          />
        )}
        <Pressable
          onPress={toggleDatapicker}
          style={[
            styles.wapperEdit,
            { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
          ]}
        >
          <TextInput
            editable={false}
            value={selectedStartDate}
            style={[
              styles.textEdit,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
            placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
            placeholder="04/05/2003"
            selectionColor={colors.primary}
          ></TextInput>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={isDarkMode ? navbarDarkLinearColors : linearColors}
            style={[
              styles.summitWrapper,
              { gap: isLoading ? 12 : 0, opacity: isLoading ? 0.6 : 1 },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={colors.whiteText}
              ></ActivityIndicator>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onSaveData}
              disabled={isLoading}
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={styles.summitText}>
                {isLoading ? "Đang lưu" : "Lưu thay đổi"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {isLoading === false && (
          <ToastNotify
            isLoading={isLoading}
            onToggleLoading={onToggleLoading}
            status={status}
            text={message}
            isDarkMode={isDarkMode}
          ></ToastNotify>
        )}
      </View>
    </TouchableWithoutFeedback>
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

  summitWrapper: {
    borderRadius: 15,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  summitText: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 25,
    color: colors.whiteText,
  },
});

export default memo(EditInfor);
