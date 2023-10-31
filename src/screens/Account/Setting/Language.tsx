import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import LinearBackGround from '../../../components/LinearBackGround';
import { colors } from '../../../../constants';
import { baloo2Fonts } from '../../../../constants/fontFamiles';


const listLanguage = {
    vietnam: 'vietname',
    english: 'english',
}


const Language = ({ navigation, ...props }) => {

    const [isDark, setIsDark] = useState(false);
    const [language, Setlanguage] = useState(listLanguage.vietnam);

    

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
                    paddingBottom: 50,
                }}>
                    Ngôn ngữ
                </Text>

                <TouchableOpacity style={[styles.wapperOption, {borderTopColor: '#D9D9D9', borderTopWidth: 2}]} onPress={() => Setlanguage(listLanguage.vietnam)}>
                    <Text style={styles.optionText}>
                        Tiếng việt
                    </Text>
                    {(language === listLanguage.vietnam ) && <Foundation name="checkbox" size={24} color="black" /> }
                </TouchableOpacity>

                <TouchableOpacity style={styles.wapperOption} onPress={() => Setlanguage(listLanguage.english)} >

                    <Text style={styles.optionText}>
                        Tiếng Anh
                    </Text>
                    {(language === listLanguage.english ) && <Foundation name="checkbox" size={24} color="black" /> }
                </TouchableOpacity>




            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    optionText: {
       fontFamily: baloo2Fonts.medium, fontSize: 17
    },

    wapperOption: {
        marginHorizontal: 20,
        flexDirection: 'row',
        paddingVertical: 15,

        justifyContent: 'space-between',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 2,

    }
})

export default memo(Language);