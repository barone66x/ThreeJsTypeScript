import { Point3d } from "../CommonClasses/Point";
import { Model } from "./Model";
import { AbsObject } from "./AbsObject";

export class SceneObject extends AbsObject {
  public constructor(model: Model, id: number, initialPosition: Point3d, initialRotation: number) {
    super(model, initialPosition, initialRotation);
  }
}
