'use client';

import { CameraControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { RiShare2Line } from 'react-icons/ri';

import { PRODUCT_DATA } from '@/data/products';

import { BottomMenu } from './components/bottomMenu';
import { DrawerContent } from './components/drawerContent';
import { ProductCanvas } from './components/productCanvas';
const product = PRODUCT_DATA[0];

const initialPartColors = product.parts.reduce<Record<string, string>>(
  (acc, part) => {
    acc[part.id] = part.defaultColor;
    return acc;
  },
  {},
);

export default function Home() {
  const [flashingPart, setFlashingPart] = useState<string | null>(null);
  const [partColors, setPartColors] =
    useState<Record<string, string>>(initialPartColors);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedPart, setSelectedPart] = useState<string | null>('mesh');
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cameraControlsRef = useRef<CameraControls | null>(null);

  const triggerFlash = (partName: string) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => {
      setFlashingPart(partName);
      flashTimerRef.current = setTimeout(() => {
        setFlashingPart(null);
      }, 800);
    }, 600);
  };

  const handleColorChange = (hexColor: string) => {
    if (!selectedPart) return;

    setPartColors((prev) => ({
      ...prev,
      [selectedPart]: hexColor,
    }));
  };

  const handlePartSelect = (partName: string) => {
    if (selectedPart === partName) return;

    setSelectedPart(partName);
    triggerFlash(partName);
    const targetView = product.cameraViews[partName];
    if (targetView && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(...targetView, true);
    }
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
        <ProductCanvas
          productCamera={product.camera}
          handlePartSelect={handlePartSelect}
          partColors={partColors}
          flashingPart={flashingPart}
          cameraControlsRef={cameraControlsRef}
        />
      </div>
      <div
        className={`fixed inset-0 z-20 bg-black/20 backdrop-blur-xs transition-all duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => {
          setIsOpen(false);
          setIsExpanded(false);
        }}
      />
      <div
        className={`fixed bottom-0 z-30 w-full bg-white transition-all duration-300 max-sm:rounded-2xl ${
          isOpen
            ? 'h-[65vh] max-sm:h-[90vh]'
            : isExpanded
              ? 'h-[10vh]'
              : 'h-[27vh]'
        }`}
      >
        <div
          className={`z-30 py-10 pr-10 pl-40 max-md:px-8 ${isOpen ? '' : 'hidden'}`}
        >
          <div className="max-sm:hidden">
            <DrawerContent
              product={product}
              setIsOpen={setIsOpen}
              selectedPart={selectedPart}
              handlePartSelect={handlePartSelect}
              partColors={partColors}
            />
          </div>
        </div>
        <BottomMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          product={product}
          selectedPart={selectedPart}
          partColors={partColors}
          handleColorChange={handleColorChange}
          handlePartSelect={handlePartSelect}
        />
      </div>
    </div>
  );
}
