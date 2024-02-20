import { Point2d, Point3d } from "./Point";

export interface InitialConfigRequest {}
export interface InitialConfigResponse {
  floors: {
    p1: Point2d;
    p2: Point2d;
    p3: Point2d;
    p4: Point2d;
  }[];
  areas: {
    id: number;
    subLevel: number;
    p1: Point2d;
    p2: Point2d;
    p3: Point2d;
    p4: Point2d;
  }[];
  sceneObjects: {
    type: string;
    position: Point3d;
    rotation: number;
  }[];
  modelsAndTextures: {
    models: {
      type: string;
      path: string;
    }[];
    areaTextures: {
      subLevel: number;
      path: string;
    }[];
  };
}
export interface ServerPollingResponse {
  nearestUdms: NearestUdm[];
  collidedAreas: CollidedArea[];
  highlightedUdms: HighLightedUdm[];
  loadedUdms: LoadedUdm[];
}

export interface NearestUdm {
  id: number;
  type: string;
  position: Point3d;
  size: Point3d;
  rotation: number;
}

export interface CollidedArea {
  id: number;
  name: string;
  description: string;
}

export interface HighLightedUdm {
  id: number;
  code: string;
  description: string;
  type: string;
  size: Point3d;
}

export interface LoadedUdm {
  id: number;
  code: string;
  description: string;
  type: string;
  size: Point3d;
}

export interface ServerPollingRequest {
  position: Point2d;
  rotation: number;
  forkHeight: number;
  isLoaded: boolean;
  loadDistance: number; // Distanza dell'udm caricato dalle forche --> (( Utile al server? )) 
}

//-------------------------------------------------------------------------------------

export interface RTLSPollingRequest {}
export interface RTLSPollingResponse {
  forkliftId: number,
  partnerKey: string,
  position: positionInformation
}

export interface positionInformation {
  valid: boolean,
  x: number,
  y: number,
  orientation: number,
  loaded: boolean,
  forkHeight: number,
  distance: number
} 