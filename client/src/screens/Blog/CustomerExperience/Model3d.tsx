// @ts-nocheck
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text, Animated, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { Suspense, useState, useEffect, useTransition, Children } from 'react';
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { useGLTF, AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, Preload, useProgress, Html } from "@react-three/drei/native";
import { EvilIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { resultNotFound } from "../../../../assets/img/ilustraitions";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
import CanvasLoader from './CanvasLoader';
import Model from './LoadModel';

const EmptyResult = (props) => {

    const { isDarkMode } = props;

    return (

        <View style={{ backgroundColor: isDarkMode ? colors.darkTheme : "#FFFFFF", marginTop: 20 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 200, minHeight: 600 }}>
                <Text
                    style={[
                        {
                            color: isDarkMode ? colors.whiteText : "black",
                        },
                        styles.text]
                    }
                >
                    Rất tiếc chúng tôi chưa có mô hình 3D cho món ăn này

                </Text>
                <Image
                    source={resultNotFound}
                    resizeMode="cover"
                    style={{ flex: 1, width: 300, height: 300 }}
                ></Image>
            </View>
        </View>

    )

}



const Model3d = ({ navigation, ...props }) => {
    LogBox.ignoreAllLogs();
    const [loading, setLoading] = useState(true)
    const { height, width } = useWindowDimensions();
    const { isDarkMode, model3d, name } = props.route.params;
    const [OrbitControls, events] = useControls();
    const [url, setUrl] = useState('');
    const [model, setModel] = useState(null);

    const onBack = () => {
        navigation.goBack();
    };

    let sceneComponent = null;



    if (model3d) {


        sceneComponent = (
            <View style={styles.modelContainer} {...events}>



                <Canvas>
                    <OrbitControls enablePan={false} />
                    <directionalLight position={[1, 0, 0]} args={['white', 5]} />
                    <directionalLight position={[-1, 0, 0]} args={['white', 5]} />
                    <directionalLight position={[0, 0, 1]} args={['white', 5]} />
                    <directionalLight position={[0, 0, -1]} args={['white', 5]} />
                    <directionalLight position={[0, 1, 0]} args={['white', 5]} />
                    <directionalLight position={[0, -1, 0]} args={['white', 5]} />
                    <Suspense fallback={<CanvasLoader isDarkMode={isDarkMode} />}>
                        <Model url={process.env.EXPO_PUBLIC_API_URL + model3d}></Model>
                    </Suspense>
                </Canvas>


            </View >

        )
    }



    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" }]}>
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40,
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? colors.darkBg : colors.whiteText,
                paddingBottom: 6,
                paddingHorizontal: 15,
            }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                        alignSelf: 'flex-start'
                    }}
                    onPress={onBack}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                            color={isDarkMode ? colors.primary : "black"}
                        ></Ionicons>


                    </View>


                </TouchableOpacity>

                <Text style={[styles.text, {
                    alignSelf: 'center',
                    paddingRight: 30,
                    color: isDarkMode ? colors.whiteText : "black",
                },]}> {name}</Text>

            </View>

            {model3d && sceneComponent}
            {
                !model3d && <EmptyResult isDarkMode={isDarkMode} />
            }

        </View>
    );
}

export default Model3d;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modelContainer: {
        flex: 2,
    },
    text: {
        marginHorizontal: 20,
        fontSize: 20,
        fontFamily: baloo2Fonts.extra,
        textAlign: 'center',
        flex: 1,
    }
});

