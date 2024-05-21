import { Mesh, Raycaster, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Zombie } from './Zombie';
import { useRef } from 'react';

const ALERT_DISTANCE = 1;
const Z_POSITION = 1.5;

const Modi = () => {
  const  capRef = useRef<Mesh>(null);

  const leftRay = new Raycaster()
  const centerRay = new Raycaster()
  const rightRay = new Raycaster()

  leftRay.set(new Vector3(-0.4, 0.2, 1.5),new Vector3(0, 0, -1))
  centerRay.set(new Vector3(0, 0.2, 1.5),new Vector3(0, 0, -1))
  rightRay.set(new Vector3(0.4, 0.2, 1.5),new Vector3(0, 0, -1))

  useFrame(({ scene }) => {
    if(!capRef.current) return;

    const  lObjs = leftRay.intersectObjects(scene.children)
    const  cObjs = centerRay.intersectObjects(scene.children)
    const  rObjs = rightRay.intersectObjects(scene.children);

    const crntPos = capRef.current.position.x;

    const lTrue = lObjs.filter(d => d.distance < ALERT_DISTANCE && d.object.name === 'obstacle' )
    const cTrue = cObjs.filter(d => d.distance < ALERT_DISTANCE && d.object.name === 'obstacle' )
    const rTrue = rObjs.filter(d => d.distance < ALERT_DISTANCE && d.object.name === 'obstacle' )

    

    if(lObjs.length !==0 && lTrue.length!== 0) {
      capRef.current.position.x = crntPos < 0?0:crntPos;
      return;
    } else if(cObjs.length && cTrue.length!== 0) {
      const possibleMove = [-1,1]
      capRef.current.position.x = crntPos === 0?0.4 * possibleMove[Math.floor(Math.random() * possibleMove.length)]:crntPos
      return;
    } else if (rObjs.length !== 0 && rTrue.length !== 0) {
      capRef.current.position.x = crntPos > 0?0:crntPos;
      return;
    }
    
    // if(lObjs.length && lObjs[0].distance < ALERT_DISTANCE && lObjs[0].object.name === 'coin') {
    //   capRef.current.position.x = -0.4;
    // } else if(cObjs.length && cObjs[0].distance < ALERT_DISTANCE && cObjs[0].object.name === 'coin') {
    //   capRef.current.position.x = 0;
    // } else if (rObjs.length && rObjs[0].distance < ALERT_DISTANCE && rObjs[0].object.name === 'coin') {
    //   capRef.current.position.x = 0.4;
    // }

  });



  return (
    <>
      <mesh ref={capRef} position={[0,0.12, Z_POSITION]} name='modi' >
        <Zombie/>
        <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
        <meshPhongMaterial transparent opacity={0} />
      </mesh>
    </>
  )
}

export default Modi