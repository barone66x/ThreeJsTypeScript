import * as THREE from "three";
import { ModelTypes } from "../CommonClasses/ModelTypes.ts";
import { Point3d } from "../CommonClasses/Point.ts";
import { UDM } from "./UDM.ts";

export class Model {
  private object: THREE.Object3D;
  private type: ModelTypes;

  public constructor(object: THREE.Object3D, type: ModelTypes) {
    this.object = object;
    this.type = type;
  }

  public getType(): ModelTypes {
    return this.type;
  }
  public getObject(): any {
    return this.object;
  }

  private realAngleToGraphicAngle(rotation: number) : number{
    return -THREE.MathUtils.degToRad(rotation);
  }

  public setPosition(position: Point3d): void {
    this.object.position.set(position.x, position.y, position.z);
  }
  public setRotation(rotation : number): void {
    this.object.rotation.z = this.realAngleToGraphicAngle(rotation);
  }

  public setHightlightOn(): void {

  }
  public setHightlightOff(): void {

  }

  public show(): void {
    this.object.visible = true;
  }

  public hide(): void {
    this.object.visible = false;
  }

  public attach(udms : UDM[]): void{

  }

  public detach(): void{

  }

  public raiseTo(height : number): void{
    this.object.position.z = height;
  }

  public moveTo(position: Point3d, rotation: number): void {
    this.setPosition(position);
    this.setRotation(rotation);
  }
}