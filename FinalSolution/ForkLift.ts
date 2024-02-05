import { Point3d } from "../CommonClasses/Point";
import { Fork } from "./Fork";
import { IMovable } from "./IMovable";
import { Model } from "./Model";
import { AbsObject } from "./AbsObject";
import { UDM } from "./UDM";

export class ForkLift extends AbsObject implements IMovable {
  private fork: Fork;

  public constructor(model: Model, id: number, initialPosition: Point3d, initialRotation: number, fork: Fork) {
    super(model, id, initialPosition, initialRotation);
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
