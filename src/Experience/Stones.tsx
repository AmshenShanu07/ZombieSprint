import * as THREE from 'three'
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Fragment } from 'react/jsx-runtime'
import { useFrame } from '@react-three/fiber';
import useGameStore from '../Hooks/useGameStore';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Icosphere: THREE.Mesh
    Cube001: THREE.Mesh
    Cube002: THREE.Mesh
    Icosphere001: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}



function Boundry(props: JSX.IntrinsicElements['group']) {
  const { isPaused } = useGameStore();

  const { nodes, materials } = useGLTF('/models/stones.glb') as GLTFResult;
  const grpRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if(!grpRef.current) return;
    // console.log(clock.elapsedTime % 10);
    
    if(!isPaused)
    grpRef.current.position.z = ((clock.elapsedTime * 2.5) % 4) + 2;

  })


  return (
    <group {...props} dispose={null} position-z={2} ref={grpRef} >
      {(new Array(20).fill(1)).map((_,i)=>(
        <Fragment key={i}>
          <group position-x={-1} position-z={i * -1.02} scale={0.2} >
            <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials['Material.001']} scale={0.5} />
            <mesh name="Icosphere" geometry={nodes.Icosphere.geometry} material={materials['Material.001']} scale={[0.639, 0.862, 0.588]} />
            <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials['Material.001']} scale={0.5} />
            <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials['Material.001']} scale={[0.5, 0.703, 0.5]} />
            <mesh name="Icosphere001" geometry={nodes.Icosphere001.geometry} material={materials['Material.001']} scale={[0.639, 0.696, 0.588]} />
          </group>
          <group position-x={1} position-z={i * -1.02} scale={0.2} >
            <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials['Material.001']} scale={0.5} />
            <mesh name="Icosphere" geometry={nodes.Icosphere.geometry} material={materials['Material.001']} scale={[0.639, 0.862, 0.588]} />
            <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials['Material.001']} scale={0.5} />
            <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials['Material.001']} scale={[0.5, 0.703, 0.5]} />
            <mesh name="Icosphere001" geometry={nodes.Icosphere001.geometry} material={materials['Material.001']} scale={[0.639, 0.696, 0.588]} />
          </group>
        </Fragment>
      ))}
    </group>
  )
}

export default Boundry;

useGLTF.preload('/models/stones.glb')
