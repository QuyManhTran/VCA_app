import { StyleSheet } from "react-native";
import { colors, fontFamilies } from "../../../constants";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },

    header: {

        display: "flex",
    },

    headerAvatar: {
        position: 'absolute',
        top: '50%',    
        left: '50%',  
        transform: [{ translateX: -64 }], 
        height: 128,
        width: 128,

    },

    headerImage: {
        position: 'relative',
        flexDirection: 'row',
        height: 230,
        justifyContent: "center",
        alignItems: 'center',
    },

    headerImageDetail: {
        alignSelf: 'flex-end',
        height: 190,
    },

    headerText: {
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    headerTextName: {
        fontFamily: baloo2Fonts.extra,
        fontSize: 30,
    },

    headerTextEmail: {
        fontFamily: baloo2Fonts.medium,
        fontSize: 20,
    },

    headerTextEdit: {
        marginVertical: 15,
        backgroundColor: "#FF0701",
        paddingHorizontal: 20,
        borderRadius: 12,

    },

    headerTextEditText: {
        color: "#FFF",
        fontFamily: baloo2Fonts.extra,
        fontSize: 25,
    },

    menuContainer: {

    },

    content: {
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },

    contentTitle: {
        marginTop: 5,
        backgroundColor: '#D9D9D9',
        fontFamily: baloo2Fonts.regular,
        fontSize: 20,
        paddingLeft: 20,
    },

    contentContent: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    contentHeart: {
        marginLeft: 10,
        fontFamily: baloo2Fonts.bold,
        fontSize: 20,
    },

    option: {

    },

    optionTitle: {
        marginTop: 5,
        backgroundColor: '#D9D9D9',
        fontFamily: baloo2Fonts.regular,
        fontSize: 20,
        paddingLeft: 20,
    },

    optionLanguage: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },

    optionLanguageTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionLanguageContent: {
        flexDirection: 'row',
    },

    optionLanguageContentText: {

        fontFamily: baloo2Fonts.regular,
        fontSize: 15,
    },

    optionDisplay: {
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },

    privacy: {
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        paddingBottom: 10,
    },
})

export default styles;