import { CameraControls } from '@react-three/drei';

export type MenuSizeType = 'small' | 'mid' | 'big';

export interface BottomMenuProps {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  menuSize: MenuSizeType;
  setMenuSize: (menuSize: MenuSizeType) => void;
  product: ProductType;
  selectedPart: string | null;
  partColors: Record<string, string>;
  handleColorChange: (hexColor: string) => void;
  handlePartSelect: (partName: string) => void;
}

export interface ProductCanvasProps {
  productCamera: {
    position: [number, number, number];
    fov: number;
  };
  handlePartSelect: (partName: string) => void;
  partColors: Record<string, string>;
  flashingPart?: string | null;
  cameraControlsRef: React.RefObject<CameraControls | null>;
}

export interface MenuProps {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  product: ProductType;
  setMenuSize: (menuSize: MenuSizeType) => void;
  selectedPart: string | null;
  handlePartSelect: (partName: string) => void;
  partColors: Record<string, string>;
}

export interface ProductType {
  id: number;
  modelPath: string;
  camera: {
    position: [number, number, number];
    fov: number;
  };
  name: string;
  price: string;
  colorPalette: {
    id: string;
    hex: string;
    name: string;
  }[];
  parts: {
    id: string;
    name: string;
    defaultColor: string;
  }[];
  cameraViews: {
    [partId: string]: [number, number, number, number, number, number];
  };
}

export interface ShoeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  onPartSelect: (partName: string) => void;
  partColors: Record<string, string>;
  flashingPart?: string | null;
}

export interface SHOE_CONFIG_TYPE {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}
