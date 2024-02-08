import { Point3d } from "../Utils/Point";
import { Model } from "../Implementations/Three/Model";
import { AbsObject } from "./AbsObject";

export class SceneObject extends AbsObject {
  public constructor(model: Model, initialPosition: Point3d, initialRotation: number) {
    super(model, initialPosition, initialRotation);
  }
}
