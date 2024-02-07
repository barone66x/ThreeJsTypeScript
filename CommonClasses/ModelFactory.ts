import { ModelTypes } from "./ModelTypes";
import { Model } from "../FinalSolution/Model";
import * as THREE from "three";
import { Point3d } from "./Point";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class ModelFactory {
  private modelDictionary: {
    [type: number]: Promise<THREE.Object3D>; //type è un enum di ModelTypes
  };

  public constructor() {
    this.modelDictionary = {};
  }

  private async loadFile(path: string): Promise<THREE.Object3D> {
    const gltfLoader = new GLTFLoader();
    let object = new THREE.Group();
    
    let a = (await gltfLoader.loadAsync(path));
    let children = a.scene.children;
    while (children.length != 0) {
      object.add(children[0]);
    }

    object.castShadow = false;
    object.receiveShadow = false;
    return object;
  }

  public addObject(type: ModelTypes, path: string): void {
    this.modelDictionary[type] = this.loadFile(path);
  }

  public async makeObject(type: ModelTypes): Promise<Model>;
  public async makeObject(type: ModelTypes, scale: Point3d): Promise<Model>;
  public async makeObject(type: ModelTypes, scale?: Point3d): Promise<Model> {
    console.log(this.modelDictionary[1]);
    let object = (await this.modelDictionary[type]).clone();

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
