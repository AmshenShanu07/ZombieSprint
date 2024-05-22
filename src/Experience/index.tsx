// import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react';

import Modi from './Modi';
import Hero from './Hero';
import Floor from './Floor';
import CoinsGenerator from './Coins';
import ObstacleGenerator from './Obstacle';
import useGameStore from '../Hooks/useGameStore';
import { Controls } from '../App';
import Boundry from './Stones';
import Sound from './Sound';


const Experience = () => {
  const [sub] = useKeyboardControls<Controls>()
  const { isPaused, gameOver, startGame, setGameMode, setStartGame } = useGameStore();

  // const onClickPlayPause = () => {
  //   setGameMode(!isPaused)
  // };

  // const onStartStop = () => {
  //   if(startGame) {
  //     setGameOver()
  //   } else {
  //     setStartGame();
  //   }
  // }


  useEffect(() => {
    sub(state => state.pausePlay,(p) => {
      if(p) return;
      
      if(gameOver || !startGame) 
        return setStartGame();

      setGameMode(!isPaused)
      
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);


  return (
    <>
      {/* <OrbitControls/> */}
      <CoinsGenerator/>
      <ObstacleGenerator/>
      <Hero/>
      <Modi/>
      <Floor/>
      <Boundry/>
      <Sound/>
      {/* <Html position={[0.5,viewport.height - 0.9,0]}>
        <p>Timer:{Math.round(time)}</p>
        <p>Hero:{heroPoint}</p>
        <button onClick={onStartStop} >{startGame?"Restart":"Start"}</button>
        <button onClick={onClickPlayPause} >{isPaused?"Resume":"Pause"}</button>
      </Html> */}
    </>
  )
}

export default Experience;


