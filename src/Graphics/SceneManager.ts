import { CameraManager } from "./Implementations/Three/CameraManager";
import { ForkLift } from "./Objects/ForkLift";
import { ModelFactory } from "./Implementations/Three/ModelFactory";
import { Scene } from "./Implementations/Three/Scene";
import { AbsObject } from "./Objects/AbsObject";
import { UdmManager } from "./Utils/UdmManager";
import { InformationToShow, NearestUdm, positionInformation } from "./Utils/JsonResponses";
import { Point3d } from "./Utils/Point";

export class SceneManager {
  private scene: Scene;
  private cameraManager: CameraManager;

  private forklift!: Promise<ForkLift>;

  private udmManager: UdmManager;

  public constructor() {
    this.cameraManager = new CameraManager();
    this.scene = new Scene();
    this.udmManager = new UdmManager();
  }

  public init(): void {
    this.forklift = ModelFactory.makeForkLift();
    this.forklift.then((forklift) => {
      this.addToScene(forklift);
      this.cameraManager.addCameraToObject(forklift, new Point3d(0, -2.2, 3), 0);
    });

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });
    let getCamera = this.cameraManager.getCurrentCamera.bind(this.cameraManager);

    this.scene.init(getCamera);
  }

  public handleNearestUdms(nearestUdms: NearestUdm[]): void {
    this.udmManager.readNearest(nearestUdms).then((udms) => {
      udms.forEach((udm) => {
        this.scene.addToScene(udm);
      });

      this.forklift.then((forklift) => {
        this.udmManager.getHiddenUdms().forEach((udm) => {
          if (forklift.distanceToUdm(udm) > this.udmManager.getMaxDistanceToRender()) {
            this.udmManager.removeUdm(udm);
          }
        });
      });
    });
  }

  public handleHighlightedUdms(highlightedUdmIds: number[]): void {
    this.udmManager.readHighlighted(highlightedUdmIds);

  }

  public handleLoadedUdms(loadedUdmIds: number[]): void {
    this.udmManager.readLoaded(loadedUdmIds).then((udmToLoad) => {
      this.forklift.then((forklift) => {
        forklift.unloadFork();
        forklift.loadFork(udmToLoad);
      });
    });
  }

  public handleInformationToShow(informationToShow : InformationToShow[]) : void{
    
  }

  public addToScene(object: AbsObject): void {
    this.scene.addToScene(object);
  }

  public moveForklift(json: positionInformation): void {
    this.forklift.then(forklift => {
      forklift.setSmoothMoveTo(new Point3d(json.x, json.y, 0), json.orientation, json.forkHeight, 500);
    })
  }

  private onWindowResize(): void {
    this.cameraManager.onWindowResize();
    this.scene.onWindowResize();
  }
}
