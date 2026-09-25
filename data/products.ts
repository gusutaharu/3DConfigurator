import { ProductType } from '../lib/definition';

export const PRODUCT_DATA: ProductType[] = [
  {
    id: 1,
    modelPath: '/models/shoe-draco.glb',
    camera: {
      position: [-3, 2, -3],
      fov: 30,
    },
    name: 'スニーカー',
    price: '¥10,000',
  },
];
