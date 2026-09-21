'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/shoe-draco.glb');

export const Shoe = () => {
  type GLTFResult = {
    nodes: {
      [key: string]: THREE.Mesh;
    };
    materials: {
      [key: string]: THREE.MeshStandardMaterial;
    };
  };
  const { nodes, materials } = useGLTF(
    '/models/shoe-draco.glb',
  ) as unknown as GLTFResult;
  return (
    <group>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
};
