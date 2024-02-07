import { ModelTypes } from "./ModelTypes";
import { Model } from "../FinalSolution/Model";
import * as THREE from "three";
import { Point2d } from "./Point";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

export class AreaFactory {
  private textureDictionary: {
    [subLevel: number]: THREE.Material;
  };

  public constructor() {
    this.textureDictionary = {};
  }

  private loadFile(path: string): THREE.Material {
    let texture = new THREE.TextureLoader().load(path);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // trovare scala
    texture.repeat.set(0.2, 0.2);

    return new THREE.MeshBasicMaterial({ map: texture });
  }

  public addAreaModel(subLevel: number, path: string): void {
    this.textureDictionary[subLevel] = this.loadFile(path);
  }

  public makeArea(subLevel: number, p1: Point2d, p2: Point2d, p3: Point2d, p4: Point2d): Model {
    //andiamo a creare un modello 3d che ha come material la texture che abbiamo applicato
    //usiamo i 4 punti per geneare i vertici del modello 3d

    const shape = new THREE.Shape();
    shape.moveTo(p1.x, p1.y);
    shape.lineTo(p2.x, p2.y);
    shape.lineTo(p3.x, p3.y);
    shape.lineTo(p4.x, p4.y);
    shape.lineTo(p1.x, p1.y);

    const geometry = new THREE.ShapeGeometry(shape);

    const mesh = new THREE.Mesh(geometry, this.textureDictionary[subLevel]);
    mesh.name = subLevel.toString();
    mesh.position.z += 0.01 * subLevel;
    mesh.matrixAutoUpdate = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    const res = new Model(mesh, ModelTypes.AREA);
    return res;
  }
}
