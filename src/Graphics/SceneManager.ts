import { CameraManager } from "./Implementations/Three/CameraManager";
import { ForkLift } from "./Objects/ForkLift";
import { ModelFactory } from "./Implementations/Three/ModelFactory";
import { Scene } from "./Implementations/Three/Scene";
import { AbsObject } from "./Objects/AbsObject";
import { UdmManager } from "./Utils/UdmManager";
import { InformationToShow, NearestUdm, RTLSPollingResponse, ServerPollingResponse, positionInformation } from "./Utils/JsonResponses";
import { Point3d } from "./Utils/Point";
import { IRTLSPollingObserver, IServerPollingObserver } from "../Communication/Communicators/Interfaces";

export class SceneManager implements IRTLSPollingObserver, IServerPollingObserver {
  private scene: Scene;
  private cameraManager: CameraManager;

  private forklift!: Promise<ForkLift>;

  private udmManager: UdmManager;

  public constructor() {
    this.cameraManager = new CameraManager();
    this.scene = new Scene();
    this.udmManager = new UdmManager();
  }

  public onServerPolling(response: ServerPollingResponse): void {
    this.handleHighlightedUdms(response.highlightedUdms);  
    this.handleInformationToShow(response.informationToShow);
    this.handleLoadedUdms(response.loadedUdms);
    this.handleNearestUdms(response.nearestUdms);
  }

  public onRTLSPolling(response: RTLSPollingResponse): void {
    this.moveForklift(response.position);
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

  private handleNearestUdms(nearestUdms: NearestUdm[]): void {
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

  private handleHighlightedUdms(highlightedUdmIds: number[]): void {
    this.udmManager.readHighlighted(highlightedUdmIds);
  }

  private handleLoadedUdms(loadedUdmIds: number[]): void {
    this.udmManager.readLoaded(loadedUdmIds).then((udmToLoad) => {
      this.forklift.then((forklift) => {
        forklift.unloadFork();
        forklift.loadFork(udmToLoad);
      });
    });
  }

  private handleInformationToShow(informationToShow : InformationToShow[]) : void{
    
  }

  public addToScene(object: AbsObject): void {
    this.scene.addToScene(object);
  }

  private moveForklift(json: positionInformation): void {
    this.forklift.then(forklift => {
      forklift.setSmoothMoveTo(new Point3d(json.x, json.y, 0), json.orientation, json.forkHeight, 500);
    })
  }

  private onWindowResize(): void {
    this.cameraManager.onWindowResize();
    this.scene.onWindowResize();
  }
}
