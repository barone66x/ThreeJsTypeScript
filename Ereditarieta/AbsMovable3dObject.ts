import { MathUtils, Object3D } from "three";
import { Point3d } from "../CommonClasses/Point";
import { IMovable3dObject } from "./IMovable3dObject";

export abstract class AbsMovable3dObject implements IMovable3dObject {
  private object3d: Object3D;

  public constructor(object3d: Object3D);
  public constructor(object3d: Object3D, position: Point3d, rotation: number);
  public constructor(object3d: Object3D, position: Point3d = { x: 0, y: 0, z: 0 }, rotation: number = 0) {
    this.object3d = object3d;

    this.object3d.position.set(position.x, position.y, position.z);
    this.object3d.rotation.y = MathUtils.degToRad(rotation);
  }

  // I3dObject
  public get3dObject(): any {
    return this.object3d;
  }
  public hide(): void {
    this.object3d.visible = false;
  }
  public show(): void {
    this.object3d.visible = true;
  }

  // IMovable3dObject
  public moveTo(pos: Point3d, rotation: number): void {
    this.object3d.position.set(pos.x, pos.y, pos.z);
    this.object3d.rotation.y = MathUtils.degToRad(rotation);  
  }
}
