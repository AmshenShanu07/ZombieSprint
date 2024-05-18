
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
  const floorTwoRef = useRef<Mesh>(null);
  const texture = useTexture('/textures/grid-red.png')

  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(PLANE_SIZE * 0.05, (PLANE_SIZE * 10) * 0.05)


  useFrame(() => {
    if(!floorOneRef.current || !floorTwoRef.current) return;

  if(!isPaused) {
    floorOneRef.current.position.z += speed
    floorTwoRef.current.position.z += speed
  }


    if(floorTwoRef.current.position.z >= 100){
      console.log('2',floorTwoRef.current.position.z);
      floorTwoRef.current.position.z = -floorTwoRef.current.position.z
    }
    
    if(floorOneRef.current.position.z >= 100) {
      floorOneRef.current.position.z = -100
    }
    
  })



  return (
    <>
      <mesh ref={floorTwoRef} rotation-x={Math.PI * -0.5} position-z={-100} >
        <planeGeometry args={[2,100]}/>
        <meshStandardMaterial
          map={texture}
          color={color.set(0xFFFFFF)}
          emissiveMap={texture}
          emissive={color.set(0xFFFFFF)}
          emissiveIntensity={1}
        />
      </mesh>

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
