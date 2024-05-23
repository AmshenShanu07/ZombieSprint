import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import HtmlOverlay from './Html'

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
    <>
    <Suspense>
        <KeyboardControls map={map} >
          <Canvas shadows camera={{ position: [0, 0.6, 3], fov: 30 }} >
            {/* <Environment background blur={0.1} preset="night" /> */}
            <color attach="background" args={['#383F42']} />
            <fog attach='fog' args={['#383F42',10,15]} />
            <ambientLight intensity={2} />
            <directionalLight 
              intensity={1.5} 
              color={'#ffffff'} 
              position={[0,3,1]}
            />
            <Experience/>
          </Canvas>
        </KeyboardControls>
      </Suspense>
      <HtmlOverlay/>
    </>
  )
}

export default App