export interface ProductType {
  id: number;
  modelPath: string;
  camera: {
    position: [number, number, number];
    fov: number;
  };
}

export interface ShoeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}
