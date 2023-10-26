import { View, Platform, Text, KeyboardAvoidingView, StyleSheet, Switch, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, Pressable } from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import * as ImagePicker from 'expo-image-picker';
import { useHeaderHeight } from '@react-navigation/elements'
import { memo, useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from "../../../../constants";

const EditInfo = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectImage, setSelectImage] = useState('');
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState(new Date())
    const [selectedStartDate, setSelectedStartDate] = useState("25 tháng 10, 2023");
    const [showPicker, setShowPicker] = useState(false);



    // birthday
    const toggleDatapicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                const vietnameseDate = new Intl.DateTimeFormat('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(currentDate);


                setSelectedStartDate(vietnameseDate);
                toggleDatapicker();
            }

        } else {
            toggleDatapicker();
        }
    }

    // Post all data to api
    const saveData = () => {
        // Check if all necessary data is available
        if (fullName && phoneNumber && selectedStartDate && selectImage) {
          const data = new FormData();
      
          // Append the image data to the FormDat
      
          // Append other data to the FormData
          data.append('fullName', fullName);
          data.append('phoneNumber', phoneNumber);
          data.append('selectedStartDate', selectedStartDate);
      
          // Now, make the HTTP POST request to your API
          
        } else {
          console.warn('Missing data. Cannot save.');
        }
      };

    // fetch
    const getListUser = async () => {
        try {
            const response = await fetch('http://192.168.0.64:4000/list-user');
            const json = await response.json();
            setData(json);
            setFullName(json[0].name);
            setPhoneNumber(json[0].phone);
            setSelectImage('http://192.168.0.64:4000' + json[0].image.substring(2, json[0].image.length));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getListUser();

    }, []);

    // avatar
    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setSelectImage(result.assets[0].uri);
        }
    };



    console.log(selectImage);

    // goback
    const onBack = () => {
        navigation.goBack();
    };

    // KeyboardAvoidingView
    const height = useHeaderHeight()


    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height + 100}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView style={styles.contaier}>
                        <LinearBackGround
                            height={100}
                            back={true}
                            avatar={false}
                            onPress={onBack}
                        // isDarkMode={isDarkMode}
                        ></LinearBackGround>


                        <View style={{ alignItems: "center", marginVertical: 22 }}>
                            <TouchableOpacity onPress={handleImageSelection}>
                                <Image source={{ uri: selectImage }}
                                    style={{
                                        height: 170,
                                        width: 170,
                                        borderRadius: 85,
                                        borderWidth: 2,
                                        borderColor: colors.gray,
                                    }}
                                ></Image>
                                <View style={{
                                    position: 'absolute', bottom: 0, right: 15, zIndex: 9999,
                                    borderRadius: 50, borderColor: 'white', borderWidth: 2, backgroundColor: colors.whiteText
                                }}>
                                    <MaterialIcons name="photo-camera" size={25}></MaterialIcons>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Thông tin cá nhân </Text>
                        <Text style={styles.textLable}>Tên</Text>
                        <View style={styles.wapperEdit}>
                            <TextInput
                                style={styles.textEdit}
                                editable={true}
                                onChangeText={value => setFullName(value)}>
                                {fullName}
                            </TextInput>
                        </View>

                        <Text style={styles.textLable}>Số điện thoại</Text>
                        <View style={styles.wapperEdit}>
                            <TextInput style={styles.textEdit} onChangeText={value => setPhoneNumber(value)}>{phoneNumber}</TextInput>
                        </View>
                        <Text style={styles.textLable}>Ngày sinh</Text>
                        {showPicker && <DateTimePicker mode="date" display="spinner"
                            onChange={onChange} value={date} />}
                        {
                            !showPicker && <Pressable
                                onPress={toggleDatapicker}
                                style={styles.wapperEdit}
                            >
                                <TextInput
                                    editable={false}
                                    value={selectedStartDate}
                                    placeholderTextColor={colors.black}
                                    style={styles.textEdit}>

                                </TextInput>


                            </Pressable>
                        }


                        <TouchableOpacity style={styles.summitWapper} onPress={saveData}>
                            <Text style={styles.summitText}>Lưu thay đổi </Text>
                        </TouchableOpacity>


                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    contaier: {

    },

    title: {
        fontFamily: baloo2Fonts.bold,
        fontSize: 30,
        marginLeft: 10,
        marginTop: 10,
    },

    textLable: {
        marginTop: 10,
        fontFamily: baloo2Fonts.bold,
        marginLeft: 10,
        fontSize: 20,
    },

    wapperEdit: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },

    textEdit: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
        color: colors.black,
        fontFamily: baloo2Fonts.regular,
        fontSize: 25,
    },

    summitWapper: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    summitText: {
        paddingHorizontal: 10,
        backgroundColor: '#FF9900',
        borderRadius: 15,
        fontFamily: baloo2Fonts.bold,
        fontSize: 25,
        color: colors.whiteText,
    },
})

export default memo(EditInfo);

