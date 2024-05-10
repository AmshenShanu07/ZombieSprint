import { useLayoutEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../App';
import useGameStore from '../Hooks/useGameStore';

const Hero = () => {
  const [sub] = useKeyboardControls<Controls>();
  const heroRef = useGameStore(state => state.hero);
  // const heroRef = useRef<Mesh>(null);

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


  useLayoutEffect(() => {
    sub(
      (state) => state.left,
      (press) => {
        press && handleHeroMovement(-1)
      }
    );
    sub(
      (state) => state.right,
      (press) => {
        press && handleHeroMovement(1);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      <mesh ref={heroRef} position={[0,0.12, 0]} name='hero' >
        <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
        <meshStandardMaterial color='cyan' />
      </mesh>
    </>
  )
}

export default Hero
