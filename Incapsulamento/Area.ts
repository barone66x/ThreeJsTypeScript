import { ModelTypes } from "../CommonClasses/ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";
import { AbsHaveModel } from "./AbsHaveModel";

export class Area extends AbsHaveModel {
  private id: number;

  // private parentArea : Area | undefined    ->> non ci serve la logica [?]

  public constructor(model: Model, id: number) {
    super(model);
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }
}
