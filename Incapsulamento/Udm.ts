import { ModelTypes } from "../CommonClasses/ModelTypes";
import { Model } from "./Model";
import { Point3d } from "../CommonClasses/Point";
import { AbsHaveModel } from "./AbsHaveModel";

export class Udm extends AbsHaveModel {
  private id: number;

  public constructor(model: Model, id: number);
  public constructor(model: Model, id: number, position: Point3d, rotation: number);
  public constructor(model: Model, id: number, position?: Point3d, rotation?: number) {
    super(model);
    this.id = id;
    if (position) {
      this.model.setPosition(position);
    }
    if (rotation) {
      this.model.setRotation(rotation);
    }
  }

  public getId(): number {
    return this.id;
  }

  public MoveTo(position: Point3d, rotation: number): void {
    this.model.setPosition(position);
    this.model.setRotation(rotation);
  }

  public setHighlightOn(): void {
    this.model.setHightlightOn();
  }

  public setHighlightOff(): void {
    this.model.setHightlightOff();
  }

  public show(): void {
    this.model.show();
  }

  public hide(): void {
    this.model.hide();
  }
}
