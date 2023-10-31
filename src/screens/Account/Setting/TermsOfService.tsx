import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import LinearBackGround from '../../../components/LinearBackGround';
import { colors } from '../../../../constants';
import { baloo2Fonts } from '../../../../constants/fontFamiles';



const TermsOfService = ({ navigation, ...props }) => {

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
                    Điều khoản dịch vụ
                </Text>

                <Text style={{ marginTop: 20, marginHorizontal: 20, fontFamily: baloo2Fonts.medium, fontSize: 17 }}>
                    VCA là một ứng dụng giúp người dùng tìm kiếm và khám phá các món ăn từ các nhà hàng,
                    đánh giá và chia sẻ thông tin về chúng.
                    Người dùng chịu trách nhiệm về nội dung họ chia sẻ trên ứng dụng.
                    Cấm việc chia sẻ thông tin giả mạo hoặc vi phạm bản quyền.

                </Text>
                <Text style={{ marginTop: 20, marginHorizontal: 20, fontFamily: baloo2Fonts.medium , fontSize: 17}}>
                    VCA có quyền loại bỏ hoặc chỉnh sửa nội dung vi phạm quy định.
                    VCA thu thập thông tin cá nhân để cung cấp dịch vụ tốt hơn cho người dùng.
                    Thông tin cá nhân không được chia sẻ với bên thứ ba mà không có sự đồng ý của người dùng.
                </Text>


            </ScrollView>
        </SafeAreaView>

    )
}

export default memo(TermsOfService);