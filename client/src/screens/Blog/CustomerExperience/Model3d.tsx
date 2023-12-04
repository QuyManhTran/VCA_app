// @ts-nocheck
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { useGLTF } from "@react-three/drei/native";

const Model3d = (props) => {
    const { isDarkMode, model3d } = props.route.params;

    if (!model3d) {
        return (

            <View style={styles.container}>
                <Text>Rất tiếc chúng tôi chưa có mô hình 3d cho món ăn này </Text>
            </View>

        )
    }

    const [OrbitControls, events] = useControls();
    const { scene } = useGLTF(process.env.EXPO_PUBLIC_API_URL + model3d);

    return (
        <SafeAreaView style={styles.container}>
            {model3d && <View style={styles.modelContainer} {...events}>
                <Canvas >
                    <OrbitControls enablePan={false} />
                    <directionalLight position={[1, 0, 0]} args={['white', 5]} />
                    <directionalLight position={[-1, 0, 0]} args={['white', 5]} />
                    <directionalLight position={[0, 0, 1]} args={['white', 5]} />
                    <directionalLight position={[0, 0, -1]} args={['white', 5]} />
                    <directionalLight position={[0, 1, 0]} args={['white', 5]} />
                    <directionalLight position={[0, -1, 0]} args={['white', 5]} />
                    <Suspense fallback={null}>
                        <primitive scale={2} object={scene} />
                    </Suspense>
                </Canvas>
            </View>}

        </SafeAreaView>
    );
}

export default Model3d;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7FB',
    },
    modelContainer: {
        flex: 2,
    },
});

