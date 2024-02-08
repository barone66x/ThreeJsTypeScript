import * as THREE from "three";
import { ModelTypes } from "../CommonClasses/ModelTypes.ts";
import { Point3d } from "../CommonClasses/Point.ts";
import { UDM } from "./UDM.ts";
import { ModelFactory } from "../CommonClasses/ModelFactory.ts";
import { AbsObject } from "./AbsObject.ts";

export class Model {
  private object: THREE.Object3D;
  private type: ModelTypes;
  private attachedObjects : AbsObject[];

  public constructor(object: THREE.Object3D, type: ModelTypes) {
    this.object = object;
    this.type = type;
    this.attachedObjects =  [];
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

    ModelFactory.getMaterialsByType(this.type).then((materials) => {
      let i = 0;
      this.object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = materials[i];
          i++;
        }
      });
    });
  }

  public show(): void {
    this.object.visible = true;
  }

  public hide(): void {
    this.object.visible = false;
  }

  public attach(models: AbsObject[]): void {
    models.forEach(model => {
      console.log(model);
      this.object.attach(model.getObject() as THREE.Object3D);
      this.attachedObjects.push(model);
    });
  }

  public detach(): void {
    let scene = this.object.parent;
    
    while(this.attachedObjects.length > 0)
    {
        let model = this.attachedObjects.shift() as AbsObject;
        scene?.add(model.getObject() as THREE.Object3D);
        
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
