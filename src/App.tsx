import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import HtmlOverlay from './Html'
import { Controls, isMobile } from './utils/constant'


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
          <Canvas shadows camera={{ position: [0, isMobile?1:0.6, isMobile?2:3], fov:isMobile?60:30 }} >
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