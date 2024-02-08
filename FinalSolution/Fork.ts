import { IComposable } from "./IComposable";
import { IRaisable } from "./IRaisable";
import { Model } from "./Model";
import { AbsObject } from "./AbsObject";
import { UDM } from "./UDM";

export class Fork extends AbsObject implements IComposable, IRaisable {
  public constructor(model: Model, initialHeight: number) {
    super(model);
    this.raiseTo(initialHeight);
  }

  public raiseTo(height: number): void {
    this.model.raiseTo(height);
  }

  public attach(udms: UDM[]): void {
    this.model.attach(udms);
  }
  public detach(): void {
    this.model.detach();
  }
}
