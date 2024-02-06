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
    
}
