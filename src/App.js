import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, Loader, useVideoTexture} from '@react-three/drei';
import ThreeDModel from './3Dmodel.js';

function LoadingScreen(){
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div style={{ color: 'black', fontSize: '1.5em' }}>Loading {Math.round(progress * 100)}%</div>
    </Html>
  );
}

function Scene(){
  return (
    <>
    <ambientLight intensity={2} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls
          enableDamping
          dampingFactor={0.25}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
          enableZoom
          zoomSpeed={1.2}
          minDistance={2}
          maxDistance={350}
          panSpeed={0.8}
    />
    <ThreeDModel
      modelPath="./assets/computer_monitor.fbx"
      baseColorMapPath="./assets/textures/retro_base.png"
      aoMapPath="./assets/textures/retro_AO.png"
      normalMapPath="./assets/textures/retro_normal.png"
      emissiveMapPath="./assets/textures/retro_emissive.png"
      roughnessMapPath="./assets/textures/retro_roughness.png"
      specularMapPath="./assets/textures/retro_specular.png"
      metallicMapPath="./assets/textures/retro_metallic.png" />
      
      <mesh rotation={[Math.PI / 90 + (Math.PI * -15) / 360, Math.PI / 15 + (Math.PI * -4) / 360, (Math.PI * 1) / 180]} position={[-23, 29, -10.1]} receiveShadow>
            <boxGeometry args={[41, 36, 2]} />
            <VideoMaterial/>
      </mesh>
    </>
  )
}

function VideoMaterial(){
  const texture = useVideoTexture("./assets/loading1_1.mp4");
  
  return <meshBasicMaterial map={texture} toneMapped={false}/>
}

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //const loadingTexture = useVideoTexture("./assets/loading1_1.mp4");

  return (
    <div className="app-container">
      <Canvas
        camera={{
          position: [0, 75, 100],
          near: 0.1,
          far: 1000,
        }}
      >

        <Suspense fallback={<LoadingScreen />}>
        <Loader />
        <Scene></Scene>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
