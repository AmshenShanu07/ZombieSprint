import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'

type GLTFResult = GLTF & {
  nodes: {
    mesh2068853349: THREE.Mesh
    mesh2068853349_1: THREE.Mesh
    mesh2068853349_2: THREE.Mesh
  }
  materials: {
    mat24: THREE.MeshStandardMaterial
    mat2: THREE.MeshStandardMaterial
    mat19: THREE.MeshStandardMaterial
  }
}

export function Med(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/med.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh name="mesh2068853349" geometry={nodes.mesh2068853349.geometry} material={materials.mat24} />
      <mesh name="mesh2068853349_1" geometry={nodes.mesh2068853349_1.geometry} material={materials.mat2} />
      <mesh name="mesh2068853349_2" geometry={nodes.mesh2068853349_2.geometry} material={materials.mat19} />
    </group>
  )
}

useGLTF.preload('/models/med.glb')
