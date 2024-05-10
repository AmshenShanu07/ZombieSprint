import { Raycaster, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import useGameStore from '../Hooks/useGameStore';

const ALERT_DISTANCE = 0.7;
const Z_POSITION = 1.5;

const Modi = () => {
  const  capRef = useGameStore(state => state.cap);

  const leftRay = new Raycaster()
  const centerRay = new Raycaster()
  const rightRay = new Raycaster()

  useFrame(({ scene, clock }) => {
    if(!capRef.current) return;

    const rayYpos = Math.abs(Math.sin(clock.elapsedTime * 2.2) * 0.08) + 0.05

    leftRay.set(new Vector3(-0.4, rayYpos, Z_POSITION),new Vector3(0, 0, -1))
    centerRay.set(new Vector3(0, rayYpos, Z_POSITION),new Vector3(0, 0, -1))
    rightRay.set(new Vector3(0.4, rayYpos, Z_POSITION),new Vector3(0, 0, -1))


    const  lObjs = leftRay.intersectObjects(scene.children)
    const  cObjs = centerRay.intersectObjects(scene.children)
    const  rObjs = rightRay.intersectObjects(scene.children)

    const crntPos = capRef.current.position.x;

    if(lObjs.length !==0 && lObjs[0].distance < ALERT_DISTANCE && lObjs[0].object.name === 'obstacle') {
      capRef.current.position.x = crntPos < 0?0:crntPos;
      return;
    } else if(cObjs.length && cObjs[0].distance < ALERT_DISTANCE && cObjs[0].object.name === 'obstacle') {
      const possibleMove = [-1,1]
      capRef.current.position.x = crntPos === 0?0.4 * possibleMove[Math.floor(Math.random() * possibleMove.length)]:crntPos
      return;
    } else if (rObjs.length !== 0 && rObjs[0].distance < ALERT_DISTANCE && rObjs[0].object.name === 'obstacle') {
      capRef.current.position.x = crntPos > 0?0:crntPos;
      return;
    }
    
    if(lObjs.length && lObjs[0].distance < ALERT_DISTANCE && lObjs[0].object.name === 'coin') {
      capRef.current.position.x = -0.4;
    } else if(cObjs.length && cObjs[0].distance < ALERT_DISTANCE && cObjs[0].object.name === 'coin') {
      capRef.current.position.x = 0;
    } else if (rObjs.length && rObjs[0].distance < ALERT_DISTANCE && rObjs[0].object.name === 'coin') {
      capRef.current.position.x = 0.4;
    }

  });



  return (
    <>
      <mesh ref={capRef} position={[0,0.12, Z_POSITION]} name='modi' >
        <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
        <meshStandardMaterial color='brown' />
      </mesh>
    </>
  )
}

export default Modi