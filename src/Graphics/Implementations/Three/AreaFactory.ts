import { ModelTypes } from "../../Utils/ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";
import { Point2d } from "../../Utils/Point";

export class AreaFactory {
  
  private static areaFactory: AreaFactory;
  
  private textureDictionary: {
    [subLevel: number]: Promise<THREE.Material>;
  };
  private loader: THREE.TextureLoader;

  private constructor() {
    this.textureDictionary = {};
    this.loader = new THREE.TextureLoader();
  }

  private static getInstance(): AreaFactory {
    if (!AreaFactory.areaFactory) {
      AreaFactory.areaFactory = new AreaFactory();
    }
    return AreaFactory.areaFactory;
  }

  private static async loadFile(path: string): Promise<THREE.Material> {
    let texture = await AreaFactory.getInstance().loader.loadAsync(path);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // trovare scala
    texture.repeat.set(0.2, 0.2);

    const res = new THREE.MeshBasicMaterial({ map: texture });
    res.depthWrite = false;

    return res;
  }

  public static addAreaModel(subLevel: number, path: string): void {
    AreaFactory.getInstance().textureDictionary[subLevel] = AreaFactory.loadFile(path);
  }

  public static async makeArea(subLevel: number, p1: Point2d, p2: Point2d, p3: Point2d, p4: Point2d): Promise<Model> {
    //andiamo a creare un modello 3d che ha come material la texture che abbiamo applicato
    //usiamo i 4 punti per geneare i vertici del modello 3d

    const shape = new THREE.Shape();
    shape.moveTo(p1.x, p1.y);
    shape.lineTo(p2.x, p2.y);
    shape.lineTo(p3.x, p3.y);
    shape.lineTo(p4.x, p4.y);
    shape.lineTo(p1.x, p1.y);

    const geometry = new THREE.ShapeGeometry(shape);

    const mesh = new THREE.Mesh(geometry, await AreaFactory.getInstance().textureDictionary[subLevel]);
    mesh.position.z += 0.01 * subLevel;

    mesh.matrixAutoUpdate = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    const res = new Model(mesh, ModelTypes.AREA);
    return res;
  }
}
