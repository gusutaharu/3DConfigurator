'use client';
import { Canvas } from '@react-three/fiber';

import { Shoe } from './components/shoe';

export default function Home() {
  return (
    <div>
      <Canvas>
        <ambientLight intensity={1} />
        <Shoe />
      </Canvas>
    </div>
  );
}
