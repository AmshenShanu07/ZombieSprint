import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Environment, KeyboardControls, KeyboardControlsEntry, Loader } from '@react-three/drei'
import { useMemo } from 'react'

export enum Controls {
  left = 'left',
  right = 'right',
  pausePlay = 'pausePlay'
}

const App = () => {

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.pausePlay, keys: ['Space'] }
  ], [])

  return (
    <KeyboardControls map={map} >
      <Canvas shadows camera={{ position: [0, 0.6, 3], fov: 30 }} >
        <Environment background blur={0.1} preset="night" />
        {/* <color attach="background" args={['#7a0049']} /> */}
        <fog attach='fog' args={['#454545',17,23]} />
        <ambientLight intensity={2} />
        <Experience/>
      </Canvas>
      <Loader/>
    </KeyboardControls>
  )
}

export default App