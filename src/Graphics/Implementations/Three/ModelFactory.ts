import * as THREE from "three";
import { ModelTypes } from "../../Utils/ModelTypes";
import { Model } from "./Model";
import { Point3d } from "../../Utils/Point";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Fork } from "../../Objects/Fork";
import { ForkLift } from "../../Objects/ForkLift";

export class ModelFactory {
  public static modelFactory: ModelFactory;
  private modelDictionary: {
    [type: number]: Promise<THREE.Object3D>; //type è un enum di ModelTypes
  };
  private loader: GLTFLoader;

  private constructor() {
    this.modelDictionary = {};
    this.loader = new GLTFLoader();
  }

  public static async getMaterialsByType(type : ModelTypes) : Promise<THREE.Material[]>{
    const object = await ModelFactory.getInstance().modelDictionary[type];
    const materials : THREE.Material[] = [];
    object.traverse(child => {
      if (child instanceof THREE.Mesh){
        materials.push(child.material.clone());
      }
    });
    return materials;
  }

  private static getInstance(): ModelFactory {
    if (!ModelFactory.modelFactory) {
      ModelFactory.modelFactory = new ModelFactory();
    }

    return ModelFactory.modelFactory;
  }

  private static async loadFile(path: string): Promise<THREE.Object3D> {
    let object = new THREE.Group();

    let exportedAsset = await ModelFactory.getInstance().loader.loadAsync(path);
    let children = exportedAsset.scene.children;

    while (children.length != 0) {
      object.add(children[0]);
    }

    object.castShadow = false;
    object.receiveShadow = false;
    return object;
  }

  public static addObject(type: ModelTypes, path: string): void {
    ModelFactory.getInstance().modelDictionary[type] = ModelFactory.loadFile(path);
  }

  public static async makeObject(type: ModelTypes): Promise<Model>;
  public static async makeObject(type: ModelTypes, scale: Point3d): Promise<Model>;
  public static async makeObject(type: ModelTypes, scale?: Point3d): Promise<Model> {
    let object = (await ModelFactory.getInstance().modelDictionary[type]).clone();

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
  
  public static async makeForkLift(): Promise<ForkLift> {
    const forkLiftObject = await ModelFactory.makeObject(ModelTypes.FORKLIFT);

    const forkliftModel = forkLiftObject.getObject() as THREE.Object3D;
    
    let forklift!: ForkLift;

    forkliftModel.traverse(child => {
      if ((child as THREE.Mesh).name.toUpperCase() == "FORK"){
        const fork = new Fork(new Model(child, ModelTypes.FORK),0);
        forklift = new ForkLift(forkLiftObject, new Point3d(0, 0, 0), 0, fork);
      };
    });

    return forklift;
  }
}
