import { Point } from "./Point";

export class JsonBobina {

  private id: number;
  private floorId: number;
  private position: Point;
  private base: number;
  private height: number;
  private depth: number;
  private rotation: number;
  private isStanding: boolean;
  
  public constructor(json: {
    id: number,
    floorId: number,
    position: Point,
    base: number,
    height: number,
    depth: number,
    rotation: number,
    isStanding: boolean}) 
  {
    this.id = json.id;
    this.floorId = json.floorId;
    this.position = json.position;
    this.base = json.base;
    this.height = json.height;
    this.depth = json.depth;
    this.rotation = json.rotation;
    this.isStanding = json.isStanding;
  }

  public getId(): number{
    return this.id;
  }
}

export class Bobina {
  public constructor(
    private jsonInformation: JsonBobina,
    private modelInformation: THREE.Object3D
  ) {}

  public getId(): number {
    console.log(this);
    console.log(this.jsonInformation);
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
