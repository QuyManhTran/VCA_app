// @ts-nocheck
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Torus, useProgress, Center, OrbitControls, Text3D, Text } from "@react-three/drei/native";


const CanvasLoader = (props) => {
  const { isDarkMode } = props;

  const { progress } = useProgress();
  return (
    <>
      <Text3D
        position={[-7, 0, -30]}  
        scale={[-1, 1, 1]}
        textAlign="center"    
        rotation={[0, 3, 0]}
        font={require("../../../../assets/font3d/gt.json")}>
        Please wait  {progress.toFixed(2) * 2} %
      </Text3D>
    </>

  );
};

export default CanvasLoader;
