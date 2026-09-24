'use client';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { PRODUCT_DATA } from '@/data/products';

import { Shoe } from './components/shoe';

const product = PRODUCT_DATA[0];

const LEFT_SHOE_CONFIG = {
  position: [-0.45, 0.1, 0] as [number, number, number],
  rotation: [-Math.PI / 8, -Math.PI / 2, 0] as [number, number, number],
  scale: [-1, 1, 1] as [number, number, number],
};

const RIGHT_SHOE_CONFIG = {
  position: [0.45, 0.1, 0] as [number, number, number],
  rotation: [-Math.PI / 8, Math.PI / 2, 0] as [number, number, number],
  scale: [1, 1, 1] as [number, number, number],
};

export default function Home() {
  return (
    <div>
      <div className="h-[73vh] w-full bg-gray-100">
        <Canvas camera={product.camera}>
          <ambientLight intensity={1} />
          <group>
            <Shoe {...LEFT_SHOE_CONFIG} />
            <Shoe {...RIGHT_SHOE_CONFIG} />
          </group>
          <CameraControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}
