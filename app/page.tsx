'use client';
import { CameraControls, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RiShare2Line } from 'react-icons/ri';
import { SlArrowDown, SlMenu } from 'react-icons/sl';

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
        <div className="absolute top-0 right-0 left-0 z-10 flex justify-between px-6 py-11">
          <div className="ml-7.5 flex flex-col">
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
              <RiShare2Line className="h-6 w-6" />
            </button>
            <button className="flex items-center justify-center rounded-full border border-gray-200 px-6 py-2 font-bold">
              完了
            </button>
          </div>
        </div>
        <Canvas camera={product.camera}>
          <ambientLight intensity={1} />
          <group>
            <Shoe {...LEFT_SHOE_CONFIG} />
            <Shoe {...RIGHT_SHOE_CONFIG} />
          </group>
          <ContactShadows
            position={[0, -0.7, 0]}
            opacity={0.8}
            scale={7}
            blur={0.5}
            far={0.8}
          />
          <CameraControls makeDefault />
        </Canvas>
      </div>
      <div className="z-10 h-[27vh] w-full bg-white">
        <div className="grid grid-cols-3 px-12 py-6">
          <div className="justify-self-start">
            <button className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-gray-200">
              <SlArrowDown className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-10">
            <button>
              <HiArrowLeft className="h-5 w-5" />
            </button>
            <div className="max-w-98 min-w-64 text-center text-xl">
              <span className="text-[#111111]">選択パーツ</span>
              <span className="ml-2 text-[#757575]">1/10</span>
            </div>
            <button>
              <HiArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="justify-self-end">
            <button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 font-bold">
              <SlMenu className="h-5 w-5" />
              メニュー
            </button>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-4 pt-8">
          {product.colorPalette.map((color) => (
            <div key={color.id} className="text-center">
              <button
                style={{ backgroundColor: color.hex }}
                className="h-8 w-8 rounded-full border border-gray-300"
              ></button>
              <div className="mt-2 text-sm">{color.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
