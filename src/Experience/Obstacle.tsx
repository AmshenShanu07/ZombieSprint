import { useFrame, useThree } from '@react-three/fiber';
import { Fragment, useRef, useState } from 'react';
import { Mesh, Box3 } from 'three'
import useGameStore from '../Hooks/useGameStore';

interface ObstacleProps {
  xPos: number
}

const Obstacle = ({ xPos }:ObstacleProps):JSX.Element => {
  const { isPaused } = useGameStore()
  const obstacleRef = useRef<Mesh>(null);
  const {scene} = useThree();
  const [heroRef] = scene.children.filter(d => (d instanceof Mesh && d.name === 'hero'))



  useFrame(({ scene }) => {
    const heroMesh = heroRef as Mesh;
    
    if(!obstacleRef.current) return;
    if(!heroMesh) return;

    if(isPaused) return;


    obstacleRef.current.position.z += 0.02

    const heroBox = new Box3().setFromObject(heroMesh)
    const coinBox = new Box3().setFromObject(obstacleRef.current);

    if(coinBox.intersectsBox(heroBox)) {
      console.log('#GameOver');
    }
    

    if(obstacleRef.current.position.z > 3)
      scene.remove(obstacleRef.current)

  })

  return (
    <>
      <mesh ref={obstacleRef} position={[xPos,0.15,-7]} name='obstacle' >
        <boxGeometry args={[0.4,0.3,0.05]} />
        <meshStandardMaterial color={'red'} wireframe />
      </mesh>
    </>
  )
}


const ObstacleGenerator = () => {
  const { isPaused } = useGameStore();
  const [hold, setHold] = useState<boolean>(false);
  const [coins, setCoins] = useState<JSX.Element[]>([])
  const [index, setIndex] = useState<number>(0);

  const addCoin = () => {
    const pos = [-1,0,1];
    const randomPos = pos[Math.floor(Math.random() * pos.length)] * .4;

    setCoins([...coins, <Obstacle xPos={randomPos} />])


    setIndex(index === 10?0:index+1)
  }

  useFrame(({ clock }) => {

    if(isPaused) return;

    if( !hold && Math.round(clock.elapsedTime%2) === 0) {
      setHold(true);
      addCoin()
    }

    if(Math.round(clock.elapsedTime%2) != 0) {
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

export default ObstacleGenerator