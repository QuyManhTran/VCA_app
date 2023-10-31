import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';


import LinearBackGround from '../../components/LinearBackGround';
import { colors } from '../../../constants';



const showFullImage = ({ navigation, ...props }) => {

    const [dataImage, setDataImage] = useState(null);
    const [isTouchScreen, setIsTouchScreen] = useState(false);

   
  

    const onBack = () => {
        navigation.goBack();
    };

    const images = props.route.params.data ? [{url:  props.route.params.data.uri}] :  [{url : '' , props: { source: require('../../../assets/img/accounts/anhDaiDienAccount.png') } }]


    const windowWidth = Dimensions.get('window')

    return (
        // <TouchableOpacity onPress={() => setIsTouchScreen(!isTouchScreen)} style={{margin: 0, padding: 0, backgroundColor: colors.primary}}>
            <Modal

                visible={true}
                presentationStyle="overFullScreen"
                statusBarTranslucent={true}
                transparent={true}
                animationType="slide"
                onRequestClose={() => onBack()} >
                {/* {isTouchScreen && <View>
                    <AntDesign name="back" size={24} color="black" />
                </View>}
                 */}
                {/* <Pressable onPress={() => setIsTouchScreen(!isTouchScreen)}>
                
            </Pressable> */}

                <ImageViewer
                    style={{
                        width: windowWidth.width,
                        
                    }}
                    imageUrls={images}
                    index={0}
                    onSwipeDown={() => {
                        onBack();
                    }}

                    enableSwipeDown={true} // Cho phép vuốt xuống để đóng ImageViewer
                    // backgroundColor="transparent" // Đặt màu nền của ImageViewer thành trong suốt
                    renderIndicator={() => null}></ImageViewer>


            </Modal>
        // </TouchableOpacity>

    )
}

export default memo(showFullImage);