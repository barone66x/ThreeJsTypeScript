import { Point3d } from "./Point";

export interface InitialConfigRequest {

}
export interface InitialConfigResponse {
  floors: {
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    p3: { x: number; y: number };
    p4: { x: number; y: number };
  }[];
  areas: {
    id: number;
    subLevel: number;
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    p3: { x: number; y: number };
    p4: { x: number; y: number };
  }[];
  sceneObjects: {
    type: string;
    position: { x: number; y: number; z: number };
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
    nearestUdms : NearestUdms[];
    collidedAreas : CollidedAreas[];
    highlightedUdms : HighLightedUdms[];
    loadedUdms : LoadedUdms[];

}

export interface NearestUdms{
  id : number;
  type : string;
  position : Point3d;
  size : Point3d;
  rotation : number
}

export interface CollidedAreas{
  id : number;
  name : string;
  description : string;
}

export interface HighLightedUdms{
  id : number;
  code : string;
  description : string;
  type : string;
  size : Point3d;
}

export interface LoadedUdms{
  id : number;
  code : string;
  description : string;
  type : string;
  size : Point3d;
}

export interface ServerPollingRequest {
    
}

//-------------------------------------------------------------------------------------

export interface RTLSPollingRequest {
    
}
export interface RTLSPollingResponse {
    
}
