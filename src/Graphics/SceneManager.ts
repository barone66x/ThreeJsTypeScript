import { CameraManager } from "./Implementations/Three/CameraManager";
import { ForkLift } from "./Objects/ForkLift";
import { ModelFactory } from "./Implementations/Three/ModelFactory";
import { Scene } from "./Implementations/Three/Scene";
import { AbsObject } from "./Objects/AbsObject";
import { UdmManager } from "./Utils/UdmManager";
import { CollidedArea, HighLightedUdm, NearestUdm } from "./Utils/JsonResponses";

export class SceneManager{
 
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
    this.forklift.then(forklift => {
      this.addToScene(forklift);
    });

    window.addEventListener("resize", () => {this.onWindowResize()})
    let getCamera = (this.cameraManager.getCurrentCamera).bind(this.cameraManager);

    this.scene.init(getCamera);
  }

  public handleCollidedAreas(collidedAreas: CollidedArea[]): void {
    let collidedAreasInfo : string = "";
    let lineCarrier : string = "";
    
    collidedAreas.forEach((collidedArea : CollidedArea) => {
      collidedAreasInfo += lineCarrier + "Id: " + collidedArea.id + "\nNome: " + collidedArea.name + ((!collidedArea.description) ? "" : "\nDescrizione: " + collidedArea.description); 
      lineCarrier = "\n\n";
    });

    // console.log(collidedAreasInfo);
  }

  public handleNearestUdms(nearestUdms: NearestUdm[]) : void {    
    this.udmManager.readNearest(nearestUdms).then(udms => {
      udms.forEach(udm => {
        this.scene.addToScene(udm);
      });
    });
  }

  public handleHighlightedUdms(highlightedUdms: HighLightedUdm[]): void {
    
    this.udmManager.readHighlighted(highlightedUdms);

    let highlightedUdmsInfo : string = "";
    let lineCarrier : string = "";
    
    highlightedUdms.forEach((highLightedUdm : HighLightedUdm) => {
      highlightedUdmsInfo += lineCarrier + "\nCodice: " + highLightedUdm.code + "Tipo: " + highLightedUdm.type + "\nDimensioni: (" + highLightedUdm.size.x + ", " + highLightedUdm.size.y + ", " + highLightedUdm.size.z + ")" + ((!highLightedUdm.description) ? "" : "\nDescrizione: " + highLightedUdm.description); 
      lineCarrier = "\n\n";
    });

    // console.log(highlightedUdmsInfo);
    
  }

  public addToScene(object: AbsObject): void {
    this.scene.addToScene(object);
  }

  private onWindowResize(): void{
    this.cameraManager.onWindowResize();
    this.scene.onWindowResize();
  };
}
