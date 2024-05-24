// Damaged Grave by Kay Lousberg

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const isMobile = innerWidth <= 700

type GLTFResult = GLTF & {
  nodes: {
    grave_A_destroyed: THREE.Mesh
  }
  materials: {
    HalloweenBits: THREE.MeshStandardMaterial
  }
}
function Grave(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/grave.glb') as GLTFResult
  return (
    <group {...props} scale={isMobile?1.3:1} dispose={null} position-y={-0.16}>
      <mesh 
        name="grave_A_destroyed" 
        geometry={nodes.grave_A_destroyed.geometry} 
        material={materials.HalloweenBits} 
        scale={15}
      />
    </group>
  )
}

export default Grave;

useGLTF.preload('/models/grave.glb')
