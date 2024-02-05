import { Scene } from "three";
import { AbsHaveModel } from "../Incapsulamento/AbsHaveModel";

export class SceneManager {
  private scene: Scene;

  public addToScene(object: AbsHaveModel): void {
    //fare casting
    this.scene.add(object.getObject3d());
  }
}
