// @ts-nocheck
import { useGLTF } from "@react-three/drei/native"

const Model = ({ url }) => {

    // const result = useLoader(GLTFLoader, url)
    // // You don't need to check for the presence of the result, when we're here
    // // the result is guaranteed to be present since useLoader suspends the component
    // return <primitive object={result.scene} />
    const { scene } = useGLTF(url)
    return <group scale={1.5}>
        <primitive object={scene} />
    </group>

}

export default Model;