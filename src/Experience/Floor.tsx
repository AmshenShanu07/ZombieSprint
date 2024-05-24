import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Color, Mesh, RepeatWrapping } from 'three';

import useGameStore from '../Hooks/useGameStore';

const PLANE_SIZE = 100
const color = new Color(0x000000)

const Floor = () => {
  const { isPaused, speed } = useGameStore()
  const floorOneRef = useRef<Mesh>(null);
  const texture = useTexture('/textures/map2.png')

  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set((PLANE_SIZE) * 0.05, (PLANE_SIZE * 25) * 0.05)


  useFrame(() => {
    if(!floorOneRef.current) return;
    
    if(!isPaused) {
      texture.offset.y += speed * 1.5
    }
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
      </mesh>
    </>
  );
};

export default Floor;
