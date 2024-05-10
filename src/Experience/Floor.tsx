import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import useGameStore from '../Hooks/useGameStore';

interface FloorProps {
  defaultPos: number;
  debug?:boolean
}

const Floor = ({ defaultPos }: FloorProps) => {
  const { isPaused, speed } = useGameStore()
  const floorRef = useRef<Mesh>(null);

  // const colors = ["red", "cyan", "green", "purple", "violet", "green","red","blue"];
  // const randomIndex = Math.floor(Math.random() * colors.length);

  useFrame(() => {
    if(!floorRef.current) return;
    
    if(isPaused) return;

    floorRef.current.position.z +=  speed
    
      

    const crntPos = floorRef.current.position.z
    if(crntPos > 4) {
      floorRef.current.position.z = -9*2 + 1 + (crntPos - 1)
    }
      

  })

  const color  = (Math.abs(defaultPos)%2 == 1)?'#9800c2':'#e071fe'

  return (
    <>
      <mesh
        ref={floorRef}
        position={[0, 0, -defaultPos*2]}
        rotation-x={Math.PI * -0.5}
        scale={[2, 2, 0]}
      >
        <planeGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

export default Floor;
