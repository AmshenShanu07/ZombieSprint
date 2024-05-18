// import * as THREE from 'three';
import { Html, OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

import Modi from './Modi';
import Hero from './Hero';
import Floor from './Floor';
import CoinsGenerator from './Coins';
import ObstacleGenerator from './Obstacle';
import useGameStore from '../Hooks/useGameStore';
import { Zombie } from './Zombie';
import { Runner } from './Runner';


const Experience = () => {
  const { viewport } = useThree();
  const { speed, isPaused, modiPoint, heroPoint, setGameMode,incGameSpeed } = useGameStore();
  const onClickPlayPause = () => setGameMode(!isPaused);

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(!isPaused) {
        setTime(prevTime => (prevTime + 1 + speed));
        speed < 0.15 && incGameSpeed()
      } else {
        setTime(prevTime => prevTime);
      }
    }, 500);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused,speed]);

  return (
    <>
    <OrbitControls/>
      <CoinsGenerator/>
      <ObstacleGenerator/>
      <Hero/>
      <Modi/>
      <Floor/>
      
      <Zombie/>
      <Zombie position-x={-0.4} />
      <Zombie position-x={0.4} />

      <Html position={[0.5,viewport.height - 0.9,0]}>
        <p>Timer:{Math.round(time)}</p>
        <p>Hero:{heroPoint}</p>
        <p>Cap:{modiPoint}</p>
        <button onClick={onClickPlayPause} >{isPaused?"Play":"Pause"}</button>
      </Html>

    </>
  )
}

export default Experience;


