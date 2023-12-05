// @ts-nocheck
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text, Animated, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { Suspense, useState, useEffect, useTransition, Children } from 'react';
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { useGLTF, AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, Preload, useProgress, Html } from "@react-three/drei/native";
import { EvilIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';

import { resultNotFound } from "../../../../assets/img/ilustraitions";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
import CanvasLoader from './CanvasLoader';

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

class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        // Handle the error, log it, or display a fallback UI
        console.error(error, errorInfo);
    }

    render() {
        return this.props.children;
    }
}

const Model = ({ url }) => {
    console.log(url);

    const { scene } = useGLTF(url)
    


    return <group scale={1.5}>
        <primitive object={scene} />
    </group>

}

const Model3d = ({ navigation, ...props }) => {
    LogBox.ignoreAllLogs();
    const [loading, setLoading] = useState(true)
    const { height, width } = useWindowDimensions();
    const { isDarkMode, model3d, name } = props.route.params;
    const [OrbitControls, events] = useControls();

    const onBack = () => {
        navigation.goBack();
    };

    let sceneComponent = null;
   


    if (model3d) {


        sceneComponent = (


            <View style={styles.modelContainer} {...events}>
                <Suspense fallback={<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? colors.darkTheme : "#fff"}}>
                    <ActivityIndicator size="large"  color={isDarkMode ? colors.primary: 'black'}/>
                </View>}>
                    <ErrorBoundary>
                    <Canvas
                        frameloop='demand'
                        dpr={[1, 2]}
                        gl={{ preserveDrawingBuffer: true }}
                    >

                        <OrbitControls enablePan={false} />
                        <directionalLight position={[1, 0, 0]} args={['white', 5]} />
                        <directionalLight position={[-1, 0, 0]} args={['white', 5]} />
                        <directionalLight position={[0, 0, 1]} args={['white', 5]} />
                        <directionalLight position={[0, 0, -1]} args={['white', 5]} />
                        <directionalLight position={[0, 1, 0]} args={['white', 5]} />
                        <directionalLight position={[0, -1, 0]} args={['white', 5]} />

                        {Model && <Model url={process.env.EXPO_PUBLIC_API_URL + model3d} />}
                        <Preload all />


                    </Canvas>
                    </ErrorBoundary>

                </Suspense>

            </View >

        )
    }



    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" }]}>

            <TouchableOpacity
                activeOpacity={0.6}
                style={{
                    top: width < 400 ? 24 : 32,
                    borderBottomWidth: model3d != null ? 1 : 5,
                    borderBottomColor: isDarkMode ? colors.darkBg : colors.whiteText,
                    paddingBottom: 6,
                    paddingHorizontal: 15,

                }}
                onPress={onBack}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color={isDarkMode ? colors.primary : "black"}
                    ></Ionicons>
                    <Text style={[styles.text, {
                        color: isDarkMode ? colors.whiteText : "black",
                    },]}> {name}</Text>

                </View>


            </TouchableOpacity>
          
            {sceneComponent}
            {
                !model3d && <EmptyResult isDarkMode={isDarkMode} />
            }
            <View style={styles.bottomContainer}>
                <Text></Text>
            </View>

        </View>
    );
}

function Env() {
    const [preset, setPreset] = useState('dawn')
    // You can use the "inTransition" boolean to react to the loading in-between state,
    // For instance by showing a message
    const [inTransition, startTransition] = useTransition()
    const { blur } = useControls({
        blur: { value: 0.65, min: 0, max: 1 },
        preset: {
            value: preset,
            options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
            // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
            // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
            // That way we can hang onto the current environment until the new one has finished loading ...
            onChange: (value) => startTransition(() => setPreset(value))
        }
    })
    return <Environment preset={preset} background blur={blur} />
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

        textAlign: "center",
    }
});

