import * as THREE from "three";
import { ModelTypes } from "../CommonClasses/ModelTypes.ts";
import { Point2d, Point3d } from "../CommonClasses/Point.ts";

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

  // public addToScene(scene : THREE.Scene) : void {
  //     scene.add(this.object);
  // }

  public getObject(): THREE.Object3D {
    return this.object;
  }

  public setPosition(point: Point3d) {
    //this.object.position.copy(position);
  }
  public setRotation(rotation: number) {
    this.object.rotation.y = THREE.MathUtils.degToRad(rotation);
  }

  public setHightlightOn(): void {}

  public setHightlightOff(): void {}

  public show(): void {
    this.object.visible = true;
  }

  public hide(): void {
    this.object.visible = false;
  }
}
