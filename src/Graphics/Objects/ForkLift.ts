import { Point3d } from "../Utils/Point";
import { Fork } from "./Fork";
import { IMovable } from "./Interfaces/IMovable";
import { Model } from "../Implementations/Three/Model";
import { AbsObject } from "./AbsObject";
import { UDM } from "./UDM";

export class ForkLift extends AbsObject implements IMovable {
  private fork: Fork;

  public constructor(model: Model, initialPosition: Point3d, initialRotation: number, fork: Fork) {
    super(model, initialPosition, initialRotation);
    this.fork = fork;
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
}
