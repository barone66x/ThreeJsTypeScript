import { Object3D } from "three";
import { Model } from "./Model";
import { ModelTypes } from "../CommonClasses/ModelTypes";

export abstract class AbsHaveModel {
  protected model: Model;

  public constructor(model: Model) {
    this.model = model;
  }
  public getObject3d(): any {
    return this.model.getObject();
  }

  public getType(): ModelTypes {
    return this.model.getType();
  }
}
