import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Keyboard, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



import LinearBackGround from '../../components/LinearBackGround';
import { colors } from '../../../constants';
import { baloo2Fonts } from '../../../constants/fontFamiles';



const Password = ({ navigation, ...props }) => {
    const [isPressEyeOld, setIsPressEyeOld] = useState(true);
    const [isPressEyeNew, setIsPressEyeNew] = useState(true);
    const [isPressEyeConfirm, setIsPressEyeConfirm] = useState(true);


    const onBack = () => {
        navigation.goBack();
    };

    const saveDate = async () => {
        const isComfirmed = await showConfirmationDialog();
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showConfirmationDialog = () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Xác nhận',
                'Bạn có muốn thay đổi mật khẩu không?',
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <SafeAreaView>
                <ScrollView>
                    <Pressable onPress={Keyboard.dismiss}>
                        <LinearBackGround
                            height={70}
                            back={true}
                            avatar={false}
                            onPress={onBack}
                        // isDarkMode={isDarkMode}
                        ></LinearBackGround>


                        <Text style={styles.title}>Thay đổi mật khẩu  </Text>
                        <Text style={styles.textLable}>Nhập mật khẩu cũ </Text>
                        <View style={styles.wapperEdit}>
                            <TextInput style={styles.textEdit}  ></TextInput>
                            <TouchableOpacity onPress={() => setIsPressEyeOld(!isPressEyeOld)}>
                                {!isPressEyeOld && <AntDesign name="eyeo" size={24} color="black" />}
                                {isPressEyeOld && <Feather name="eye-off" size={24} color="black" />}
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.textLable}>Nhập mật khẩu mới </Text>
                        <Text style={{ fontFamily: baloo2Fonts.medium, marginHorizontal: 10, paddingBottom: 10 }}>Mật khẩu phải bao gồm cả chữ cái (a-z, A-Z) và số (0-9)</Text>
                        <View style={styles.wapperEdit}>
                            <TextInput style={styles.textEdit} ></TextInput>
                            <TouchableOpacity onPress={() => setIsPressEyeNew(!isPressEyeNew)}>
                                {!isPressEyeNew && <AntDesign name="eyeo" size={24} color="black" />}
                                {isPressEyeNew && <Feather name="eye-off" size={24} color="black" />}
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textLable}>Xác nhận mật khẩu mới </Text>
                        <View style={styles.wapperEdit}>
                            <TextInput style={styles.textEdit} ></TextInput>
                            <TouchableOpacity onPress={() => setIsPressEyeConfirm(!isPressEyeConfirm)}>
                                {!isPressEyeConfirm && <AntDesign name="eyeo" size={24} color="black" />}
                                {isPressEyeConfirm && <Feather name="eye-off" size={24} color="black" />}
                            </TouchableOpacity>
                        </View>


                        <View style={styles.summitWapper} >
                            <TouchableOpacity onPress={saveDate} >
                                <Text style={styles.summitText} >Lưu thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>

        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
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

export default memo(Password);