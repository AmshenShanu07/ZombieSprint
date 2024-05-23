
import { useRef } from 'react';
import { Color, Mesh, RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import useGameStore from '../Hooks/useGameStore';

const PLANE_SIZE = 100
const color = new Color(0x000000)

const Floor = () => {
  const { isPaused, speed } = useGameStore()
  const floorOneRef = useRef<Mesh>(null);
  const texture = useTexture('/textures/map2.png')

  // texture.rotation = Math.PI * 0.5
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set((PLANE_SIZE) * 0.05, (PLANE_SIZE * 25) * 0.05)


  useFrame(() => {
    if(!floorOneRef.current) return;

    
    if(!isPaused) {
    texture.offset.y += speed * 1.5
    // floorOneRef.current.position.z += speed
    // floorTwoRef.current.position.z += speed
  }


    // if(floorTwoRef.current.position.z >= 100){
    //   floorTwoRef.current.position.z = -floorTwoRef.current.position.z
    // }
    
    // if(floorOneRef.current.position.z >= 100) {
    //   floorOneRef.current.position.z = -100
    // }
    
  })



  return (
    <>
      <mesh ref={floorOneRef} rotation-x={Math.PI * -0.5} >
        <planeGeometry args={[2,100]}/>
        <meshStandardMaterial
          map={texture}
          color={color.set(0xFFFFFF)}
          emissiveMap={texture}
          emissive={color.set(0xFFFFFF)}
          emissiveIntensity={1}
        />
        {/* {!isPaused && <PositionalAudio url='/audios/run.mp3' autoplay distance={1} loop />}
        {isPaused && <PositionalAudio url='/audios/bg.mp3' autoplay distance={1} loop />} */}
      </mesh>
    </>
  );
};

export default Floor;
