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
}

export interface ShoeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}
