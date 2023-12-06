import { useProgress, Text, } from "@react-three/drei/native"
import React from 'react';
import { ActivityIndicator, StyleSheet, View,  } from 'react-native';
import colors from "../../../../constants/colors";

const CanvasLoader = (props) => {
    const {isDarkMode} = props;
    
    const { progress } = useProgress();
    return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      );
};

export default CanvasLoader;