'use client';

import { CameraControls, ContactShadows, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { LEFT_SHOE_CONFIG, RIGHT_SHOE_CONFIG } from '@/data/products';
import { ProductCanvasProps } from '@/lib/definition';

import { Shoe } from './shoe';

export const ProductCanvas = ({
  productCamera,
  handlePartSelect,
  partColors,
  flashingPart,
  cameraControlsRef,
}: ProductCanvasProps) => {
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const currentCamera = isMobile
    ? { ...productCamera, fov: 50 }
    : productCamera;
  return (
    <Canvas camera={currentCamera}>
      <ambientLight intensity={1} />
      <Environment preset="city" />
      <group>
        <Shoe
          {...LEFT_SHOE_CONFIG}
          onPartSelect={handlePartSelect}
          partColors={partColors}
          flashingPart={flashingPart}
        />
        <Shoe
          {...RIGHT_SHOE_CONFIG}
          onPartSelect={handlePartSelect}
          partColors={partColors}
          flashingPart={flashingPart}
        />
      </group>
      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.8}
        scale={7}
        blur={0.5}
        far={0.8}
      />
      <CameraControls ref={cameraControlsRef} makeDefault />
    </Canvas>
  );
};
