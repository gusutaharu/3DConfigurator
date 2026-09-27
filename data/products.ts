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
    colorPalette: [
      { id: 'black', hex: '#1a1a1a', name: 'ブラック' },
      { id: 'white', hex: '#ffffff', name: 'ホワイト' },
      { id: 'red', hex: '#e63946', name: 'レッド' },
      { id: 'blue', hex: '#1d3557', name: 'ネイビー' },
      { id: 'green', hex: '#2a9d8f', name: 'グリーン' },
      { id: 'yellow', hex: '#e9c46a', name: 'イエロー' },
      { id: 'orange', hex: '#f4a261', name: 'オレンジ' },
    ],
  },
];
