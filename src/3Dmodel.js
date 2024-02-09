import React from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const ThreeDModel = ({
  modelPath,
  baseColorMapPath,
  aoMapPath,
  normalMapPath,
  emissiveMapPath,
  roughnessMapPath,
  specularMapPath,
  metallicMapPath,
}) => {
  const fbx = useLoader(FBXLoader, modelPath);

  const baseColorMap = useLoader(TextureLoader, baseColorMapPath);
  const aoMap = useLoader(TextureLoader, aoMapPath);
  const normalMap = useLoader(TextureLoader, normalMapPath);
  const emissiveMap = useLoader(TextureLoader, emissiveMapPath);
  const roughnessMap = useLoader(TextureLoader, roughnessMapPath);
  const specularMap = useLoader(TextureLoader, specularMapPath);
  const metallicMap = useLoader(TextureLoader, metallicMapPath);

  // Assuming that the FBX model has a single mesh
  if (fbx && fbx.children && fbx.children.length > 0) {
    const mesh = fbx.children[0];

    // Apply the textures to the mesh material
    mesh.material.map = baseColorMap; // Base color (albedo) map
    mesh.material.aoMap = aoMap;
    mesh.material.normalMap = normalMap;
    mesh.material.emissiveMap = emissiveMap;
    mesh.material.roughnessMap = roughnessMap;
    mesh.material.specularMap = specularMap;
    mesh.material.metalnessMap = metallicMap;

    // Set other properties as needed
    mesh.material.needsUpdate = true;
  }

  return <primitive object={fbx} />;
};

export default ThreeDModel;