import { Point3d } from "../Utils/Point";
import { Fork } from "./Fork";
import { IMovable } from "./Interfaces/IMovable";
import { Model } from "../Implementations/Three/Model";
import { AbsObject } from "./AbsObject";
import { UDM } from "./UDM";

export class ForkLift extends AbsObject implements IMovable {
  private fork: Fork;

  private speed: {
    x: number,
    y: number,
    rotation: number,
    forkHeight: number,
  };
  
  private oldPosition: {
    position: Point3d,
    rotation: number,
    forkHeight: number,
  }

  private currentAnimationFrame: number; 

  public constructor(model: Model, initialPosition: Point3d, initialRotation: number, fork: Fork) {
    super(model, initialPosition, initialRotation);
    this.fork = fork;
    this.currentAnimationFrame = 0;

    this.speed = {
      x: 0,
      y: 0,
      rotation: 0,
      forkHeight: 0,
    };
    
    this.oldPosition = {
      position: new Point3d(0, 0, 0),
      rotation: initialRotation,
      forkHeight: 0
    }
  }

  private smoothMovement(position: Point3d, rotation: number, forkHeight: number, oldTime : number): void {

    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    
    const nextPosition = new Point3d(position.x, position.y, position.z);

    nextPosition.x += this.speed.x * deltaTime;
    nextPosition.y += this.speed.y * deltaTime;
    rotation += this.speed.rotation * deltaTime;
    forkHeight += this.speed.forkHeight * deltaTime;
    
    this.moveTo(position, rotation);

    this.setForkHeight(forkHeight);

    this.currentAnimationFrame = requestAnimationFrame(() => {this.smoothMovement(nextPosition, rotation, forkHeight, newTime)});
  }

  public setSmoothMoveTo(position: Point3d, rotation: number, forkHeight: number, milliseconds: number): void {
    cancelAnimationFrame(this.currentAnimationFrame);

    this.moveTo(this.oldPosition.position, this.oldPosition.rotation);
    this.setForkHeight(this.oldPosition.forkHeight);

    this.speed.x = (position.x - this.oldPosition.position.x) / milliseconds;
    this.speed.y = (position.y - this.oldPosition.position.y) / milliseconds;

    const deltaRotation = rotation - this.oldPosition.rotation;

    if(deltaRotation < 180 && deltaRotation > -180) {
      this.speed.rotation = deltaRotation / milliseconds;
    }else if(deltaRotation < -180) {
      this.speed.rotation = (360 + rotation - this.oldPosition.rotation ) / milliseconds;
    }else {
      this.speed.rotation = -(360 + this.oldPosition.rotation - rotation) / milliseconds;
    }

    this.speed.forkHeight = (forkHeight - this.oldPosition.forkHeight) / milliseconds;

    this.smoothMovement(this.oldPosition.position, this.oldPosition.rotation, this.oldPosition.forkHeight, Date.now());
    
    this.oldPosition.position.x = position.x;
    this.oldPosition.position.y = position.y;
    this.oldPosition.position.z = position.z;

    this.oldPosition.rotation = rotation;
    
    this.oldPosition.forkHeight = forkHeight;

  }

  public moveTo(position: Point3d, rotation: number): void {
    this.model.moveTo(position, rotation);
  }

  public loadFork(udms: UDM[]): void {
    this.fork.attach(udms);
  }

  public unloadFork(): void {
    this.fork.detach();
  }

  public setForkHeight(height: number): void {
    this.fork.raiseTo(height);
  }

  public distanceToUdm(udm : UDM) : number {
    const udmPosition= udm.get2DPosition();
    const forkliftPosition = this.model.get2DPosition();

    const deltaX = udmPosition.x - forkliftPosition.x;
    const deltaY = udmPosition.y - forkliftPosition.y;
    
    const res = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return res;
  }
}
