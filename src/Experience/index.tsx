// import * as THREE from 'three';
import { Html } from '@react-three/drei'
import Floor from './Floor';
import Hero from './Hero';
import CoinsGenerator from './Coins';
import ObstacleGenerator from './Obstacle';
import useGameStore from '../Hooks/useGameStore';
import { useThree } from '@react-three/fiber';
// import Coins from './Coins';
// import { useFrame } from '@react-three/fiber';
// import { useState } from 'react';

const Experience = () => {
  const { viewport } = useThree();
  const { isPaused, setGameMode } = useGameStore();
  const onClickPlayPause = () => setGameMode(!isPaused);
  

  return (
    <>
      {/* <OrbitControls/> */}
      <CoinsGenerator/>
      <ObstacleGenerator/>
      <Hero/>
      {[0,1,2,3,4,5,6,7].map((d,i) =>(
        <Floor
        key={i}
        defaultPos={d}
        debug={i == 0 || i === 6}
        />
      ))}

      <Html position={[0,viewport.height - 1,0]}>
        <button onClick={onClickPlayPause} >{isPaused?"Play":"Pause"}</button>
      </Html>

    </>
  )
}

export default Experience;