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
}
