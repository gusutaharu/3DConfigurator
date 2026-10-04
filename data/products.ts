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
      { id: 'purple', hex: '#9d4edd', name: 'パープル' },
      { id: 'pink', hex: '#f72585', name: 'ピンク' },
    ],
    parts: [
      { id: 'mesh', name: 'メッシュ (全体)' },
      { id: 'laces', name: '靴ひも' },
      { id: 'sole', name: 'ソール' },
      { id: 'caps', name: 'アイレット' },
      { id: 'inner', name: '裏地' },
      { id: 'band', name: 'バンド' },
      { id: 'stripes', name: 'ストライプ' },
      { id: 'patch', name: 'パッチ' },
    ],
    cameraViews: {
      laces: [0, 0.8, -2.2, 0, 0.25, 0],
      sole: [-4, 1, -4, 0, 0, 0],
      caps: [0, 0.1, -2.4, 0, 0, 0],
      inner: [-2, 3, 3, 0, 0.25, 0],
      mesh: [-3, 0, -4, 0, 0, 0],
      band: [0, 0.1, -2.4, 0, 0, 0],
      stripes: [-5, 0, 0, 0, 0, 0],
      patch: [0, 1, 3, 0, 0.25, 0],
    },
  },
];
