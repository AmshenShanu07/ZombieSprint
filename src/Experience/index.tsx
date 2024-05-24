import { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei'

import Hero from './Hero';
import Floor from './Floor';
import Sound from './Sound';
import Modi from './Villian';
import Boundry from './Stones';
import { Controls } from '../App';
import CoinsGenerator from './Coins';
import ObstacleGenerator from './Obstacle';
import useGameStore from '../Hooks/useGameStore';


const Experience = () => {
  const [sub] = useKeyboardControls<Controls>()
  const { isPaused, gameOver, startGame, setGameMode, setStartGame } = useGameStore();


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
      <CoinsGenerator/>
      <ObstacleGenerator/>
      <Hero/>
      <Modi/>
      <Floor/>
      <Boundry/>
      <Sound/>
    </>
  )
}

export default Experience;


