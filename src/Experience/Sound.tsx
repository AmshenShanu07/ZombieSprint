/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLoader, useThree } from '@react-three/fiber';
import { Audio, AudioListener, AudioLoader } from 'three';
import { Suspense, useEffect, useRef, useState } from 'react'

import useGameStore from '../Hooks/useGameStore';


const Sound = () => {
  const { camera } = useThree();
  const bgSound = useRef<Audio>(null);
  const runSound = useRef<Audio>(null);
  const coinSound = useRef<Audio>(null);
  const deadSound = useRef<Audio>(null);
  const [listner] = useState(() => new AudioListener());

  const { isPaused, heroPoint, mute, gameOver } = useGameStore();

  const bgAudio = useLoader(AudioLoader,'/audios/bg.mp3')
  const runAudio = useLoader(AudioLoader,'/audios/run.mp3')
  const coinAudio = useLoader(AudioLoader,'/audios/coin.wav')
  const deadAudio = useLoader(AudioLoader,'/audios/dead.wav')

  useEffect(() => {
    if(bgSound.current && runSound.current && coinSound.current && deadSound.current) {
      bgSound.current.setBuffer(bgAudio);
      bgSound.current.loop = true;
      bgSound.current.setVolume(0.8);
      
      runSound.current.setBuffer(runAudio);
      runSound.current.loop = true;
      runSound.current.setVolume(0.5);
      
      coinSound.current.setBuffer(coinAudio);
      coinSound.current.setVolume(1);
      
      deadSound.current.setBuffer(deadAudio);
      deadSound.current.setVolume(0.5);

      camera.add(listner);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bgSound.current, runSound.current, coinSound.current, deadSound.current, listner]);

  useEffect(() => {
    if(isPaused) {
      bgSound.current?.play();
      runSound.current?.stop();
    } else {
      runSound.current?.play();
      bgSound.current?.stop();
    }
  },[isPaused])

  useEffect(() => {
    if(gameOver)
      deadSound.current?.play() 
  },[gameOver]);
  
  useEffect(() => {
    if(heroPoint)
      coinSound.current?.play() 
  },[heroPoint]);


  //Mute And UnMute
  useEffect(() => {
    if(mute) {
      deadSound.current?.setVolume(0)
      coinSound.current?.setVolume(0)
      runSound.current?.setVolume(0);
      bgSound.current?.setVolume(0);
    } else {
      deadSound.current?.setVolume(0.5)
      coinSound.current?.setVolume(1)
      runSound.current?.setVolume(0.5);
      bgSound.current?.setVolume(0.8);
    }
  },[mute])

  return (
    <Suspense>
      <group>
        {/* @ts-ignore */}
        <audio ref={bgSound} args={[listner]}  />
        {/* @ts-ignore */}
        <audio ref={runSound} args={[listner]}  />
        {/* @ts-ignore */}
        <audio ref={coinSound} args={[listner]}  />
        {/* @ts-ignore */}
        <audio ref={deadSound} args={[listner]}  />
      </group>
    </Suspense>
  )
}

export default Sound