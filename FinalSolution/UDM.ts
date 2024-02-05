import { Point3d } from "../CommonClasses/Point";
import { IHighlightable } from "./IHighlightable";
import { IMovable } from "./IMovable";
import { AbsObject } from "./AbsObject";
import { Model } from "./Model";

export class UDM extends AbsObject implements IMovable, IHighlightable {
  public constructor(model: Model, id: number, initialPosition: Point3d, initialRotation: number) {
    super(model, id, initialPosition, initialRotation);
  }

  public moveTo(position: Point3d, rotation: number): void {
    this.model.moveTo(position, rotation);
  }

  public setHightlightOn(): void {
    this.model.setHightlightOn();
  }

  public setHightlightOff(): void {
    this.model.setHightlightOff();
  }
}
