// Damaged Grave by Kay Lousberg

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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
    <group {...props} dispose={null} position-y={-0.16}>
      <mesh 
        name="grave_A_destroyed" 
        geometry={nodes.grave_A_destroyed.geometry} 
        material={materials.HalloweenBits} 
        scale={17}
      />
    </group>
  )
}

export default Grave;

useGLTF.preload('/models/grave.glb')
