import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { useMemo } from 'react'

export enum Controls {
  left = 'left',
  right = 'right',
}

const App = () => {

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  ], [])

  return (
    <KeyboardControls map={map} >
      <Canvas shadows camera={{ position: [0, 0.7, 3], fov: 30 }} >
        <ambientLight intensity={1.5} />
        <Experience/>
      </Canvas>
    </KeyboardControls>
  )
}

export default App