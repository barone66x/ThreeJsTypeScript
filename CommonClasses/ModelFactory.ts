import { ModelTypes } from "./ModelTypes";
import { Model } from "../Incapsulamento/Model";
import * as THREE from "three";
import { Point3d } from "./Point";

export class ModelFactory {
  private modelDictionary: {
    [type: number]: THREE.Object3D; //type è un enum di ModelTypes
  };

  public constructor() {
    this.modelDictionary = {};
  }

  private loadFile(path: string): THREE.Object3D {
    //carico il modello 3d a partire dalla stringa del percorso
    //mockup
    return new THREE.Object3D();
  }

  public addObject(type: ModelTypes, path: string): void {
    let object = this.loadFile(path);
    this.modelDictionary[type] = object;
  }

  public makeObject(type: ModelTypes, scale: Point3d): Model {
    let object = this.modelDictionary[type].clone();
    object.traverse(x => {
      if (x instanceof THREE.Mesh){
        x.material = x.material.clone();
      }
    });
    object.scale.set(scale.x, scale.y, scale.z)
    // modificare scala
    return new Model(object, type);
  }

  //da vedere
  public makeFork() {
    //metodo che restituisce un oggetto ForkModel che deriva da Model
  }
}
