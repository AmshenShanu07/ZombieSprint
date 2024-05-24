import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

import useGameStore from '../Hooks/useGameStore'

type GLTFResult = GLTF & {
  nodes: {
    characterMedium001: THREE.SkinnedMesh
    LeftFootCtrl: THREE.Bone
    RightFootCtrl: THREE.Bone
    HipsCtrl: THREE.Bone
  }
  materials: {
    ['skin.001']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'IdelAnimation' | 'RunAnimation' | 'Run'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}


export function Runner(props: JSX.IntrinsicElements['group']) {
  const { speed, isPaused } = useGameStore();
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/models/runner.glb') as GLTFResult
  const { actions } = useAnimations(animations, group);

  useEffect(() =>{
    if(!actions.RunAnimation || !actions.IdelAnimation) return;
    actions.RunAnimation.fadeOut(0.3);
    actions.RunAnimation.fadeIn(0.3);
    
    if(isPaused) {
      actions.RunAnimation.stop();
      actions.IdelAnimation.play();
    } else {
      actions.RunAnimation.play();
      actions.IdelAnimation.stop()
    }

  },[actions, isPaused])

  useEffect(() => {
    if(!actions.RunAnimation) return;
    
    actions.RunAnimation.timeScale = 1 + (speed * 1.8);
    
  },[actions, speed]);



  return (
    <group ref={group} {...props} dispose={null} rotation-y={Math.PI}  >
      <group name="Scene">
        <group name="Root003" scale={0.64}>
          <primitive object={nodes.LeftFootCtrl} />
          <primitive object={nodes.RightFootCtrl} />
          <primitive object={nodes.HipsCtrl} />
          <skinnedMesh 
            name="characterMedium001" 
            geometry={nodes.characterMedium001.geometry} 
            material={materials['skin.001']} 
            skeleton={nodes.characterMedium001.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/runner.glb')
