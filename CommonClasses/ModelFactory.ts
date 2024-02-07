import { ModelTypes } from "./ModelTypes";
import { Model } from "../FinalSolution/Model";
import * as THREE from "three";
import { Point3d } from "./Point";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class ModelFactory {
  private modelDictionary: {
    [type: number]: THREE.Object3D; //type è un enum di ModelTypes
  };

  public constructor() {
    this.modelDictionary = {};
  }

  private async loadFile(path: string): Promise<THREE.Object3D> {
    console.log(path);
    const gltfLoader = new GLTFLoader();
    let object = new THREE.Group();
    
    let children = (await gltfLoader.loadAsync(path)).scene.children;

    while (children.length != 0) {
      object.add(children[0]);
    }

    object.castShadow = false;
    object.receiveShadow = false;
    return object;
  }

  public async addObject(type: ModelTypes, path: string): Promise<void> {
    let object = await this.loadFile(path);
    console.log(object);
    this.modelDictionary[type] = object;
  }
  public makeObject(type: ModelTypes): Model;
  public makeObject(type: ModelTypes, scale: Point3d): Model;
  public makeObject(type: ModelTypes, scale?: Point3d): Model {
    let object = this.modelDictionary[type].clone();
    object.traverse((x) => {
      if (x instanceof THREE.Mesh) {
        x.material = x.material.clone();
      }
    });
    if (scale) {
      // modificare scala
      object.scale.set(scale.x, scale.y, scale.z);
    }

    return new Model(object, type);
  }

  //da vedere
  public makeFork() {
    //metodo che restituisce un oggetto ForkModel che deriva da Model
  }
}
