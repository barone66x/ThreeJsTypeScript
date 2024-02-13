import * as THREE from "three";
import { ModelTypes } from "../../Utils/ModelTypes";
import { Point3d } from "../../Utils/Point";
import { ModelFactory } from "./ModelFactory";
import { AbsObject } from "../../Objects/AbsObject";

export class Model {
  private object: THREE.Object3D;
  private type: ModelTypes;
  private attachedObjects: AbsObject[];

  public constructor(object: THREE.Object3D, type: ModelTypes) {
    this.object = object;
    this.type = type;
    this.attachedObjects = [];
  }

  public getType(): ModelTypes {
    return this.type;
  }
  public getObject(): any {
    return this.object;
  }

  private realAngleToGraphicAngle(rotation: number): number {
    return -THREE.MathUtils.degToRad(rotation);
  }

  public setPosition(position: Point3d): void {
    this.object.position.set(position.x, position.y, position.z);
  }

  public setRotation(rotation: number): void {
    this.object.rotation.z = this.realAngleToGraphicAngle(rotation);
  }

  public setHightlightOn(): void {
    this.object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(0x00ff00);
      }
    });
  }

  public setHightlightOff(): void {
    this.object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(0xffffff); //rimette il colore di default al material
      }
    });
  }

  public show(): void {
    this.object.visible = true;
  }

  public hide(): void {
    this.object.visible = false;
  }

  public attach(models: AbsObject[]): void {
    models.forEach((model) => {
      this.object.attach(model.getObject());
      this.attachedObjects.push(model);
    });
  }

  public detach(): void {
    let scene = this.object.parent;

    while (this.attachedObjects.length > 0) {
      let model = this.attachedObjects.shift();
      scene?.add(model?.getObject());
    }
  }

  public raiseTo(height: number): void {
    this.object.position.z = height;
  }

  public moveTo(position: Point3d, rotation: number): void {
    this.setPosition(position);
    this.setRotation(rotation);
  }
}
