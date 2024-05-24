import { useEffect, useRef } from 'react'
import { useKeyboardControls } from '@react-three/drei';

import { Runner } from './Runner';
import useGameStore from '../Hooks/useGameStore';
import { Controls, isMobile } from '../utils/constant';


const Hero = () => {
  const [sub] = useKeyboardControls<Controls>();

  const xPos = useRef<number>(0);
  const dir= useRef<number>(0);

  const heroRef = useGameStore(state => state.hero);
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

  const handleTouchStart = (event:TouchEvent) => {
    xPos.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event:TouchEvent) => {
    const x = event.touches[0]?.clientX || xPos.current;

    if(xPos.current < x) {
      dir.current = 1
   } else if(xPos.current > x) {
      dir.current = -1;
    }
  };

  const handleTouchEnd = () => {
    if(dir.current == 1) handleHeroMovement(1)
    else if(dir.current == -1) handleHeroMovement(-1);
    

    dir.current = 0
    xPos.current = 0
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
        press && handleHeroMovement(1);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    addEventListener('touchstart',handleTouchStart);
    addEventListener('touchmove',handleTouchMove);
    addEventListener('touchend',handleTouchEnd);
    
    () => {
      removeEventListener('touchstart',handleTouchStart);
      removeEventListener('touchmove',handleTouchMove);
      removeEventListener('touchend',handleTouchEnd);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      <mesh ref={heroRef} position={[0,0.12, 0]} name='hero' >
        <Runner scale={isMobile?0.15:0.1} position-y={-0.115} />
        <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
        <meshPhongMaterial color="#fff" opacity={0} transparent />
      </mesh>
    </>
  )
}

export default Hero
