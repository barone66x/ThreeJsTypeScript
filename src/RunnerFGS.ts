import { IRTLSCommunicator, IServerCommunicator } from "./Communication/Communicators/Interfaces";
import { AreaFactory } from "./Graphics/Implementations/Three/AreaFactory";
import { ModelFactory } from "./Graphics/Implementations/Three/ModelFactory";
import { Area } from "./Graphics/Objects/Area";
import { SceneObject } from "./Graphics/Objects/SceneObject";
import { UDM } from "./Graphics/Objects/UDM";
import { SceneManager } from "./Graphics/SceneManager";
import {
  CollidedArea,
  HighLightedUdm,
  InitialConfigRequest,
  InitialConfigResponse,
  LoadedUdm,
  NearestUdm,
  RTLSPollingRequest,
  RTLSPollingResponse,
  ServerPollingRequest,
  ServerPollingResponse,
} from "./Graphics/Utils/JsonResponses";
import { ModelTypes } from "./Graphics/Utils/ModelTypes";
import { Point2d, Point3d } from "./Graphics/Utils/Point";

export class RunnerFGS {
  private rtlsCommunicator: IRTLSCommunicator;
  private serverCommunicator: IServerCommunicator;

  private sceneManager: SceneManager;

  private successfulConfiguration: boolean;
  private oneSecondTimer: number;

  constructor(rtlsCommunicator: IRTLSCommunicator, serverCommunicator: IServerCommunicator, sceneManager: SceneManager) {
    this.rtlsCommunicator = rtlsCommunicator;
    this.serverCommunicator = serverCommunicator;
    this.successfulConfiguration = false;
    this.sceneManager = sceneManager;

    this.oneSecondTimer = 9;
    setInterval(() => this.timerHandler(), 500);
  }

  public init(): void {
    const serverReq: InitialConfigRequest = {};

    this.serverCommunicator
      .initRequest(serverReq)
      .then((initialJson: InitialConfigResponse) => {
        // Load Textures
        initialJson.modelsAndTextures.areaTextures.forEach((area) => {
          AreaFactory.addAreaModel(area.subLevel, area.path);
        });

        // Load Models
        initialJson.modelsAndTextures.models.forEach((model) => {
          ModelFactory.addObject(ModelTypes[model.type.toUpperCase() as keyof typeof ModelTypes], model.path);
        });

        //inizializzazione scena
        this.sceneManager.init();

        // Load Floors
        initialJson.floors.forEach((floor) => {
          AreaFactory.makeArea(0, floor.p1, floor.p2, floor.p3, floor.p4).then((newFloor) => {
            this.sceneManager.addToScene(new Area(newFloor));
          });
        });

        // Load Areas
        initialJson.areas.forEach((area) => {
          AreaFactory.makeArea(area.subLevel, area.p1, area.p2, area.p3, area.p4).then((newArea) => {
            this.sceneManager.addToScene(new Area(newArea));
          });
        });

        // Load Scene Objects
        initialJson.sceneObjects.forEach((object) => {
          ModelFactory.makeObject(ModelTypes[object.type.toUpperCase() as keyof typeof ModelTypes]).then((model) => {
            this.sceneManager.addToScene(new SceneObject(model, object.position, object.rotation));
          });
        });

        ModelFactory.makeObject(ModelTypes.COIL).then((model) => {
          const bobina = new UDM(model, 1, new Point3d(-1, 0, 0), 0);
          this.sceneManager.addToScene(bobina);
          this.successfulConfiguration = true;
        });
      })
      .catch((error) => {
        console.log(error);
        this.successfulConfiguration = false;
      });
  }

  private timerHandler(): void {
    this.oneSecondTimer = (this.oneSecondTimer + 1) % 10;

    if (this.oneSecondTimer == 0 && !this.successfulConfiguration) {
      this.init();
    }

    if (this.successfulConfiguration) {
      const serverReq: ServerPollingRequest = {
        position: new Point2d(0, 0),
        rotation: 0,
        forkHeight: 0,
        isLoaded: false,
        loadDistance: 0,
      };
      this.serverCommunicator.pollingRequest(serverReq).then((res: ServerPollingResponse) => {
          this.handleCollidedAreas(res.collidedAreas);
          this.handleNearestUdms(res.nearestUdms);
          this.handleHighlightedUdms(res.highlightedUdms);
          this.handleLoadedUdms(res.loadedUdms);

        }).catch((error) => {
          console.log(error);
          this.successfulConfiguration = false;
        });

      const rtlsReq: RTLSPollingRequest = {};
      this.rtlsCommunicator.pollingRequest(rtlsReq).then((res: RTLSPollingResponse) => {
        this.sceneManager.moveForklift(res.position);
      }).catch((error) => {
        console.log(error);
      });;
    }
  }

  private handleCollidedAreas(collidedAreas: CollidedArea[]): void {
    this.sceneManager.handleCollidedAreas(collidedAreas);
  }

  private handleNearestUdms(nearestUdms: NearestUdm[]): void {
    this.sceneManager.handleNearestUdms(nearestUdms);
  }

  private handleHighlightedUdms(highlightedUdms: HighLightedUdm[]): void {
    this.sceneManager.handleHighlightedUdms(highlightedUdms);
  }

  private handleLoadedUdms(loadedUdms: LoadedUdm[]): void {
    this.sceneManager.handleLoadedUdms(loadedUdms);
  }
}
