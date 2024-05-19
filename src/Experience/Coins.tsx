import { useFrame } from '@react-three/fiber';
import { Fragment, useRef, useState } from 'react';
import { Box3, Group } from 'three'
import useGameStore from '../Hooks/useGameStore';
import { Med } from './Med';

interface CoinProps {
  xPos: number
}

const Coin = ({ xPos }:CoinProps):JSX.Element => {
  const { speed, isPaused, heroPoint, modiPoint, setHeroPoint, setModiPoint } = useGameStore();
  const coinRef = useRef<Group>(null);
  const [isIntersected, setIsIntersected] = useState<boolean>(false);
  const heroRef = useGameStore(state => state.hero);
  const capRef = useGameStore(state => state.cap)



  useFrame(({ clock, scene }) => {
    if(!coinRef.current) return;
    if(!heroRef.current || !capRef.current) return;

    coinRef.current.position.y = 
      Math.abs(Math.sin(clock.elapsedTime * 2.5) * 0.03) + 0.07;
    coinRef.current.rotation.y += 0.03

    if(isPaused) return;
    
    coinRef.current.position.z += speed

    const modiBox = new Box3().setFromObject(capRef.current);
    const heroBox = new Box3().setFromObject(heroRef.current)
    const coinBox = new Box3().setFromObject(coinRef.current);

    if(coinBox.intersectsBox(heroBox) && !isIntersected) {
      setIsIntersected(true);
      setHeroPoint(heroPoint+1)
      scene.remove(coinRef.current)
    }
    
    if(coinBox.intersectsBox(modiBox) && !isIntersected) {
      setIsIntersected(true);
      setModiPoint(modiPoint+1)
      scene.remove(coinRef.current)
    }
    

    if(coinRef.current.position.z > 3)
      scene.remove(coinRef.current)

  })

  return (
    <group ref={coinRef} position={[xPos,0.1,-15]} >
      <Med name="coin" scale={0.5} rotation-z={Math.PI * 0.2} />
    </group>
  )
}


const CoinsGenerator = () => {
  const { isPaused, speed } = useGameStore();
  const objSpeed = useRef<number>(0);
  const [hold, setHold] = useState<boolean>(false);
  const [coins, setCoins] = useState<JSX.Element[]>([])
  const [index, setIndex] = useState<number>(0);

  const addCoin = () => {
    const pos = [-1,0,1];
    const randomPos = pos[Math.floor(Math.random() * pos.length)] * .4;

    setCoins([...coins, <Coin xPos={randomPos} />])


    setIndex(index === 10?0:index+1)
  }

  useFrame(({ clock }) =>{

    if(isPaused) return;
    const limit = 7 - Math.round(speed * 10) 

    if( !hold && Math.round((clock.elapsedTime + objSpeed.current)%limit) === 0) {
      setHold(true);
      addCoin()
    }

    if(Math.round((clock.elapsedTime + objSpeed.current)%limit) != 0) {
      setHold(false);
    }
    
    objSpeed.current += speed;

  })
  return (
    <>{coins.map((d,i) => {
        return <Fragment key={i} >{d}</Fragment>
      })}
    </>
  )
}

export default CoinsGenerator