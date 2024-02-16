import { Point2d, Point3d } from "../Utils/Point";
import { IHighlightable } from "./Interfaces/IHighlightable";
import { IMovable } from "./Interfaces/IMovable";
import { AbsObject } from "./AbsObject";
import { Model } from "../Implementations/Three/Model";

export class UDM extends AbsObject implements IMovable, IHighlightable {
  private id: number;

  public constructor(model: Model, id: number, initialPosition: Point3d, initialRotation: number) {
    super(model, initialPosition, initialRotation);
    this.id = id;
  }

  public setHightlightOn(): void {
    this.model.setHightlightOn();
  }
  public setHightlightOff(): void {
    this.model.setHightlightOff();
  }
  
  public getVisibility(): boolean {
    return this.model.getVisibility();
  }
  
  public get2DPosition(): Point2d {
    return this.model.get2DPosition();
  }
  
  public getId(): number {
    return this.id;
  }

  public moveTo(position: Point3d, rotation: number): void {
    this.model.moveTo(position, rotation);
  }

  public remove(): void {
    this.model.remove();
  }
}
