import { ModelTypes } from "../CommonClasses/ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";
import { Point3d } from "../CommonClasses/Point";
import { AbsHaveModel } from "./AbsHaveModel";

export class SceneObject extends AbsHaveModel {
  private id: number;

  public constructor(model: Model, id: number, position: Point3d, rotation: number) {
    super(model);
    this.id = id;

    this.model.setPosition(position);
    this.model.setRotation(rotation);
  }

  public getId(): number {
    return this.id;
  }
}
