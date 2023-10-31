import { View, Text, StyleSheet, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import LinearBackGround from "../../../components/LinearBackGround";
import { Entypo } from '@expo/vector-icons';
import { memo } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = ({ navigation }) => {

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                <LinearBackGround
                    height={70}
                    back={true}
                    avatar={false}
                    onPress={onBack}
                // isDarkMode={isDarkMode}
                ></LinearBackGround>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Cài đặt</Text>
                </View>

                <View style={styles.wapper}>
                    <TouchableOpacity style={styles.options}>
                        <View style={styles.optionsLeft}>
                            <Entypo name="info-with-circle" size={24} color="black" />
                            <Text style={styles.optionsText}>Phiên bản</Text>
                        </View>
                        <Text>1.0.1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.options} onPress={() => navigation.navigate('Language')}>
                        <View style={styles.optionsLeft}>
                            <Entypo name="info-with-circle" size={24} color="black" />
                            <Text style={styles.optionsText}>Ngôn ngữ</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.options}  onPress={() => navigation.navigate('Display')}>
                        <View style={styles.optionsLeft}>
                            <Entypo name="info-with-circle" size={24} color="black" />
                            <Text style={styles.optionsText}>Giao diện</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <View style={styles.optionsLeft}>
                            <Entypo name="help-with-circle" size={24} color="black" />
                            <Text style={styles.optionsText}>Trợ giúp</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <View style={styles.optionsLeft}>
                            <FontAwesome name="flag" size={24} color="black" />
                            <Text style={styles.optionsText}>Góp ý, báo lỗi</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <View style={styles.optionsLeft}>
                            <AntDesign name="staro" size={24} color="black" />
                            <Text style={styles.optionsText}>Bình chọn cho VGA</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options} onPress={() => navigation.navigate('TermsOfService')} >
                        <View style={styles.optionsLeft}>
                            <FontAwesome name="list-alt" size={24} color="black" />
                            <Text style={styles.optionsText}>Điều khoản, dịch vụ</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options} onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <View style={styles.optionsLeft}>
                            <MaterialIcons name="privacy-tip" size={24} color="black" />
                            <Text style={styles.optionsText}>Chính sách, bảo mật</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <View style={styles.optionsLeft}>
                            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={24} color="black" />
                            <Text style={styles.optionsText}>Khác</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>


                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Đăng suất</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {

    },

    header: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 2,
    },

    headerText: {
        fontFamily: baloo2Fonts.bold,
        fontSize: 35,
        marginLeft: 10,
        paddingTop: 20,
        paddingBottom: 30,
    },
    wapper: {

    },
    options: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#D9D9D9',
    },

    optionsLeft: {
        flexDirection: "row",
        alignItems: 'center',
    },

    optionsText: {
        fontFamily: baloo2Fonts.regular,
        fontSize: 20,
        marginLeft: 10,
    },
    footer: {
        paddingHorizontal: 10,
        backgroundColor: '#FF0701',
        minWidth: 150,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 90,
        justifyContent: 'center',
        alignItems: "center",
    },

    footerText: {
        fontFamily: baloo2Fonts.extra,
        color: '#FFFFFF',
        fontSize: 30,
    },

})


export default memo(Setting);