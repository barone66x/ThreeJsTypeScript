import { Point } from "./Point";

export class  JsonBobina {
  public constructor(
    public id: Number,

    private floorId: Number,

    private position: Point,

    private base: Number,

    private height: Number,

    private depth: Number,

    private rotation: Number,

    private isStanding: Boolean
  ) {}
  public getId(): Number{
    return this.id;
  }

  
}

export class Bobina {
  public constructor(
    private jsonInformation: JsonBobina,
    private modelInformation: THREE.Object3D
  ) {}

  public getId(): Number {
    console.log(this.jsonInformation.getId());
    return this.jsonInformation.getId();
  }

  public getModelInformation(): THREE.Object3D {
    return this.modelInformation;
  }
  public addToScene(scene: THREE.Scene): void {
    scene.add(this.modelInformation);
  }
  public setModelInformation(model: THREE.Object3D): void {
    this.modelInformation = model;
  }
}
