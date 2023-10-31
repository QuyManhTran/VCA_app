import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import LinearBackGround from '../../../components/LinearBackGround';
import { colors } from '../../../../constants';
import { baloo2Fonts } from '../../../../constants/fontFamiles';



const PrivacyPolicy = ({ navigation, ...props }) => {

    const [isDark, setIsDark] = useState(false);

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <LinearBackGround
                    height={70}
                    back={true}
                    avatar={false}
                    onPress={onBack}
                // isDarkMode={isDarkMode}
                ></LinearBackGround>
                <Text style={{
                    marginTop: 5,

                    fontFamily: baloo2Fonts.bold,
                    fontSize: 25,
                    paddingLeft: 20,
                }}>
                   Chính sách bảo mật
                </Text>

                <Text style={{ marginTop: 20, marginHorizontal: 20, fontFamily: baloo2Fonts.medium, fontSize: 17 }}>
                Thông Tin Cá Nhân: Để cung cấp dịch vụ, chúng tôi có thể thu thập thông tin cá nhân như tên, địa chỉ email
                , số điện thoại, và địa chỉ giao hàng.

                </Text>
                <Text style={{ marginTop: 20, marginHorizontal: 20, fontFamily: baloo2Fonts.medium , fontSize: 17}}>
                Chúng tôi có thể thu thập dữ liệu về thiết bị và thông tin trình duyệt như địa chỉ IP, loại trình duyệt,
                 thời gian truy cập và các trang đã xem.
                </Text>


            </ScrollView>
        </SafeAreaView>

    )
}

export default memo(PrivacyPolicy);