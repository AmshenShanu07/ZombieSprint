import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import useGameStore from '../Hooks/useGameStore';

interface FloorProps {
  defaultPos: number;
  debug?:boolean
}

const Floor = ({ defaultPos }: FloorProps) => {
  const { isPaused } = useGameStore()
  const floorRef = useRef<Mesh>(null);

  // const colors = ["red", "cyan", "green", "purple", "violet", "green","red","blue"];
  // const randomIndex = Math.floor(Math.random() * colors.length);

  useFrame(() => {
    if(!floorRef.current) return;
    
    if(isPaused) return;

    floorRef.current.position.z +=  0.02
    
      

    const crntPos = floorRef.current.position.z
    if(crntPos > 4) {
      floorRef.current.position.z = -7*2 + 1 + (crntPos - 1)
    }
      

  })

  return (
    <>
      <mesh
        ref={floorRef}
        position={[0, 0, -defaultPos*2]}
        rotation-x={Math.PI * -0.5}
        scale={[2, 2, 0]}
      >
        <planeGeometry />
        <meshStandardMaterial color={defaultPos%2 == 1?'white':'black'} />
      </mesh>
    </>
  );
};

export default Floor;
