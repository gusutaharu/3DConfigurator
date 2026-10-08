'use client';
import { CameraControls, ContactShadows, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RiCheckFill, RiCloseLargeLine, RiShare2Line } from 'react-icons/ri';
import { SlArrowDown, SlArrowUp, SlMenu } from 'react-icons/sl';

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<string | null>('mesh');

  const cameraControlsRef = useRef<CameraControls | null>(null);
  const currentPart = product.parts.find((part) => part.id === selectedPart);
  const currentIndex = product.parts.findIndex(
    (part) => part.id === selectedPart,
  );
  const currentNumber = currentIndex !== -1 ? currentIndex + 1 : 1;
  const totalCount = product.parts.length;

  const handlePartSelect = (partName: string) => {
    if (selectedPart === partName) return;

    setSelectedPart(partName);
    const targetView = product.cameraViews[partName];
    if (targetView && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(...targetView, true);
    }
  };

  const handleNavigate = (direction: number) => {
    const validIndex = currentIndex === -1 ? 0 : currentIndex;

    const nextIndex =
      (validIndex + direction + product.parts.length) % product.parts.length;

    handlePartSelect(product.parts[nextIndex].id);
  };

  return (
    <div className="h-dvh w-screen overflow-hidden">
      <div
        className={`relative min-h-0 w-full flex-1 bg-gray-100 transition-all ${isExpanded ? 'h-[90vh]' : 'h-[73vh]'}`}
      >
        <div className="absolute top-0 right-0 left-0 z-10 flex px-6 py-11">
          <div className="mr-auto ml-7.5 flex flex-col max-sm:hidden">
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
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
          <Environment preset="city" />
          <group>
            <Shoe {...LEFT_SHOE_CONFIG} onPartSelect={handlePartSelect} />
            <Shoe {...RIGHT_SHOE_CONFIG} onPartSelect={handlePartSelect} />
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
      </div>
      <div
        className={`fixed inset-0 z-20 bg-black/20 backdrop-blur-xs transition-all duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => {
          setIsOpen(false);
          setIsExpanded(false);
        }}
      />
      <div
        className={`fixed bottom-0 z-30 w-full bg-white transition-all duration-300 ${
          isOpen ? 'h-[65vh]' : isExpanded ? 'h-[10vh]' : 'h-[27vh]'
        }`}
      >
        <div className={`py-10 pr-10 pl-40 ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-2xl">
              <p className="font-bold">コンポーネンツ</p>
              <span className="text-gray-400">{totalCount}</span>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLargeLine className="h-5 w-5" />
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-10 pt-10">
            {product.parts.map((part) => {
              const checked = selectedPart ? part.id === selectedPart : false;
              return (
                <li
                  className="flex cursor-pointer items-center gap-4 whitespace-nowrap"
                  key={part.id}
                  onClick={() => {
                    handlePartSelect(part.id);
                    setIsOpen(false);
                  }}
                >
                  <span
                    className="inline-block h-1 w-1 rounded-full p-1"
                    style={{ backgroundColor: '#000000' }}
                  />
                  {part.name}
                  {checked && <RiCheckFill className="ml-20 h-6 w-6" />}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`${isOpen ? 'hidden' : ''}`}>
          <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 sm:hidden" />
          <div className="grid grid-cols-3 px-12 py-6">
            <div className="justify-self-start">
              <button
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-gray-200 max-sm:hidden"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <SlArrowUp className="h-4 w-4" />
                ) : (
                  <SlArrowDown className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-10">
              <button onClick={() => handleNavigate(-1)}>
                <HiArrowLeft className="h-5 w-5" />
              </button>
              <div className="min-w-64 text-center text-xl whitespace-nowrap max-md:min-w-44">
                <span className="text-[#111111]">{currentPart?.name}</span>
                <span className="ml-2 text-[#757575]">
                  {currentNumber} / {totalCount}
                </span>
              </div>
              <button onClick={() => handleNavigate(1)}>
                <HiArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="justify-self-end">
              <button
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 font-bold max-sm:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <SlMenu className="h-5 w-5" />
                メニュー
              </button>
            </div>
          </div>
          <div
            className={`scrollbar-none items-center justify-center gap-4 overflow-x-auto p-6 ${isExpanded ? `hidden` : `flex`}`}
          >
            {product.colorPalette.map((color) => (
              <div key={color.id} className="text-center">
                <button
                  style={{ backgroundColor: color.hex }}
                  className="h-8 w-8 rounded-full border border-gray-300"
                ></button>
                <div className="mt-2 text-sm whitespace-nowrap">
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
