import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export class Utilities {
  public static async loadGLTF(path: string): Promise<THREE.Object3D> {
    const gltfLoader = new GLTFLoader();

    let model = new THREE.Group();
    let children = (await gltfLoader.loadAsync(path)).scene.children;

    while (children.length != 0) {
      model.add(children[0]);
    }

    model.castShadow = false;
    model.receiveShadow = false;

    return model;
  }

  public static async loadFBX(path: string): Promise<THREE.Object3D> {
    const fbxLoader = new FBXLoader();
    let model = new THREE.Group();
    model = await fbxLoader.loadAsync(path);
    model.castShadow = false;
    model.receiveShadow = false;
    return model;
  }
}
