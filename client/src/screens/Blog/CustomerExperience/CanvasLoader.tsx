import { useProgress } from "@react-three/drei/native"
import { Canvas } from "@react-three/fiber/native";
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const CanvasLoader = () => {
    const { progress } = useProgress();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>

            <ActivityIndicator size="large" />
            {progress.toFixed(2)}

        </View>
    );
};

export default CanvasLoader;