import { useEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../App';
import useGameStore from '../Hooks/useGameStore';
import { Runner } from './Runner';

const Hero = () => {
  const [sub] = useKeyboardControls<Controls>();
  const heroRef = useGameStore(state => state.hero);
  const isGameOver = useGameStore(state => state.gameOver);

   const handleHeroMovement = (dir: -1 | 1) => {
    if(!heroRef.current) return;
    
    const crntPos = heroRef.current.position.x;

    if( (crntPos < 0 && dir == -1) || (crntPos > 0 && dir == 1)  ) return;

    if( (crntPos < 0 && dir == 1 ) || (crntPos > 0 && dir == -1 ) ) {
      heroRef.current.position.x = 0
      return;
    }


    heroRef.current.position.x += 0.4*dir 
  }


  useEffect(() => {
    sub(
      (state) => state.left,
      (press) => {

        press && handleHeroMovement(-1)
      }
    );
    sub(
      (state) => state.right,
      (press) => {
        // if(isPaused) return;

        press && handleHeroMovement(1);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);





  return (
    <>
      <mesh ref={heroRef} position={[0,0.12, 0]} name='hero' >
        <Runner position-y={-0.115} />
        <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
        <meshPhongMaterial color="#fff" opacity={0} transparent />
      </mesh>
    </>
  )
}

export default Hero
