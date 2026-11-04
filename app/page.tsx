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

  const touchStartY = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (diff > 50 && !isOpen) {
      setIsOpen(true);
    }
    if (diff < -50 && isOpen) {
      setIsOpen(false);
    }
  };

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
    <div className="h-dvh w-screen overflow-hidden overflow-x-hidden bg-gray-100">
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
        className={`fixed bottom-0 z-30 w-full bg-white transition-all duration-300 max-sm:rounded-t-2xl ${
          isOpen
            ? 'h-[65vh] max-sm:h-[80vh]'
            : isExpanded
              ? 'h-[10vh]'
              : 'h-[27vh]'
        }`}
      >
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full cursor-grab touch-none justify-center pt-2 active:cursor-grabbing sm:hidden ${isOpen ? 'pb-10' : 'pb-5'}`}
        >
          <div className="h-1 w-8 rounded-full bg-gray-300" />
        </div>
        <div
          className={`z-30 overscroll-contain py-10 pr-10 pl-40 max-md:px-8 max-sm:pt-0 ${isOpen ? '' : 'hidden'}`}
        >
          <DrawerContent
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            product={product}
            setIsOpen={setIsOpen}
            selectedPart={selectedPart}
            handlePartSelect={handlePartSelect}
            partColors={partColors}
          />
        </div>
        <BottomMenu
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
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
