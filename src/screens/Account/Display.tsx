import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 


import LinearBackGround from '../../components/LinearBackGround';
import { colors } from '../../../constants';
import { baloo2Fonts } from '../../../constants/fontFamiles';



const Display = ({ navigation, ...props }) => {

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
                }}>Giao diện</Text>

                <View style={{marginTop: 20 ,flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', borderWidth: 1, padding: 5, marginHorizontal: 10, borderRadius: 15 }}>
                    <TouchableOpacity style={{borderRadius: 25, alignItems:'center'}} onPress={() => setIsDark(false)}>
                        <Image style={{ width: 107, height: 197 , resizeMode: 'stretch', borderRadius: 25,}} source={require('../../../assets/img/accounts/Light2.png')} />
                        <Text style={{fontFamily: baloo2Fonts.bold, fontSize:20}}>Sáng</Text>
                        {!isDark && <Foundation name="checkbox" size={24} color="black" /> }
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderRadius: 25, alignItems:'center'}} onPress={() => setIsDark(true)}>
                        <Image style={{ width: 107, height: 197 , resizeMode: 'stretch', borderRadius: 25,}} source={require('../../../assets/img/accounts/Dark2.png')} />
                        <Text style={{fontFamily: baloo2Fonts.bold, fontSize:20}}>Tối</Text>
                        {isDark && <Foundation name="checkbox" size={24} color="black" /> }
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default memo(Display);