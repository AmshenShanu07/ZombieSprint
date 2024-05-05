import { useFrame, useThree } from '@react-three/fiber';
import { Fragment, useRef, useState } from 'react';
import { Mesh, Box3 } from 'three'
import useGameStore from '../Hooks/useGameStore';

interface CoinProps {
  xPos: number
}

const Coin = ({ xPos }:CoinProps):JSX.Element => {
  const { isPaused } = useGameStore();
  const coinRef = useRef<Mesh>(null);
  const {scene} = useThree();
  const [heroRef] = scene.children.filter(d => (d instanceof Mesh && d.name === 'hero'))



  useFrame(({ clock, scene }) => {
    const heroMesh = heroRef as Mesh;

    if(!coinRef.current) return;
    if(!heroMesh) return;

    coinRef.current.position.y = 
      Math.abs(Math.sin(clock.elapsedTime * 2.2) * 0.08) + 0.05

    if(isPaused) return;
    
    coinRef.current.position.z += 0.02

    const heroBox = new Box3().setFromObject(heroMesh)
    const coinBox = new Box3().setFromObject(coinRef.current);

    if(coinBox.intersectsBox(heroBox)) {
      scene.remove(coinRef.current)
    }
    

    if(coinRef.current.position.z > 3)
      scene.remove(coinRef.current)

  })

  return (
    <>
      <mesh ref={coinRef} position={[xPos,0.1,-7]} name="coin" >
        <sphereGeometry args={[0.05,12,12]} />
        <meshStandardMaterial color={'yellow'} />
      </mesh>
    </>
  )
}


const CoinsGenerator = () => {
  const { isPaused } = useGameStore();
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

    if( !hold && Math.round(clock.elapsedTime%5) === 0) {
      setHold(true);
      addCoin()
    }

    if(Math.round(clock.elapsedTime%5) != 0) {
      setHold(false);
    }
    

  })
  return (
    <>{coins.map((d,i) => {
        return <Fragment key={i} >{d}</Fragment>
      })}
    </>
  )
}

export default CoinsGenerator