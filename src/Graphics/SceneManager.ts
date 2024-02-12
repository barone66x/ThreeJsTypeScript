import { CameraManager } from "./Implementations/Three/CameraManager";
import { ForkLift } from "./Objects/ForkLift";
import { ModelFactory } from "./Implementations/Three/ModelFactory";
import { Scene } from "./Implementations/Three/Scene";
import { AbsObject } from "./Objects/AbsObject";

export class SceneManager{
 
  private scene: Scene;
  private cameraManager: CameraManager;

  private forklift!: Promise<ForkLift>;

  public constructor() {
    this.cameraManager = new CameraManager();
    this.scene = new Scene();
  }

  public init(): void {
    this.forklift = ModelFactory.makeForkLift();
    this.forklift.then(forklift => {
      this.addToScene(forklift);
    });

    window.addEventListener("resize", () => {this.onWindowResize()})
    let getCamera = (this.cameraManager.getCurrentCamera).bind(this.cameraManager);

    this.scene.init(getCamera);
  }

  public addToScene(object: AbsObject): void {
    this.scene.addToScene(object);
  }

  private onWindowResize(): void{
    this.cameraManager.onWindowResize();
    this.scene.onWindowResize();
  };
}
