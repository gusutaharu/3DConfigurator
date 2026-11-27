'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { PRODUCT_DATA } from '@/data/products';
import { ShoeProps } from '@/lib/definition';

const product = PRODUCT_DATA[0];

export const Shoe = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onPartSelect,
  partColors,
  flashingPart,
}: ShoeProps) => {
  type GLTFResult = {
    nodes: {
      [key: string]: THREE.Mesh;
    };
    materials: {
      [key: string]: THREE.MeshStandardMaterial;
    };
  };
  const { nodes, materials } = useGLTF(
    product.modelPath,
  ) as unknown as GLTFResult;

  const getEmissiveProps = (partName: string) => {
    const isFlashing = flashingPart === partName;
    return {
      'material-emissive': isFlashing ? '#ffffff' : '#000000',
      'material-emissiveIntensity': isFlashing ? 0.8 : 0,
    };
  };

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e: {
        stopPropagation: () => void;
        object: { material?: { name: string } };
      }) => {
        e.stopPropagation();
        const clickedMaterialName = e.object.material?.name;
        if (clickedMaterialName) {
          onPartSelect(clickedMaterialName);
        }
      }}
    >
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={partColors.laces}
        {...getEmissiveProps('laces')}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={partColors.mesh}
        {...getEmissiveProps('mesh')}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={partColors.caps}
        {...getEmissiveProps('caps')}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={partColors.inner}
        {...getEmissiveProps('inner')}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={partColors.sole}
        {...getEmissiveProps('sole')}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={partColors.stripes}
        {...getEmissiveProps('stripes')}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={partColors.band}
        {...getEmissiveProps('band')}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={partColors.patch}
        {...getEmissiveProps('patch')}
      />
    </group>
  );
};

useGLTF.preload(product.modelPath);
