import {
  InitialConfigRequest,
  InitialConfigResponse,
  RTLSPollingRequest,
  RTLSPollingResponse,
  ServerPollingRequest,
  ServerPollingResponse,
} from "../../Graphics/Utils/JsonResponses";

import {
  IRTLSConnectionObserver,
  IRTLSPollingObserver,
  IServerConnectionObserver,
  IServerInitialConfigObserver,
  IServerPollingObserver,
} from "./Interfaces";

import { IRTLSCommunicator, IServerCommunicator } from "./Interfaces";
import Ajv from "ajv";

export class ServerCommunicator implements IServerCommunicator {
  private schema;
  private isConnectionUp: boolean;
  private IsValid: (json: any) => boolean;
  private connectionObserver: IServerConnectionObserver[];
  private pollingObserver: IServerPollingObserver[];
  private initialObserver: IServerInitialConfigObserver[];

  public constructor() {
    this.isConnectionUp = true;
    this.connectionObserver = [];
    this.pollingObserver = [];
    this.initialObserver = [];

    this.schema = {
      type: "object",
      properties: {
        floors: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                p1: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p2: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p3: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p4: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
              },
              required: ["p1", "p2", "p3", "p4"],
            },
          ],
        },
        areas: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                subLevel: {
                  type: "number",
                },
                p1: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p2: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p3: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p4: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
              },
              required: ["id", "subLevel", "p1", "p2", "p3", "p4"],
            },
            {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                subLevel: {
                  type: "number",
                },
                p1: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p2: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p3: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p4: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
              },
              required: ["id", "subLevel", "p1", "p2", "p3", "p4"],
            },
            {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                subLevel: {
                  type: "number",
                },
                p1: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p2: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p3: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
                p4: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                  },
                  required: ["x", "y"],
                },
              },
              required: ["id", "subLevel", "p1", "p2", "p3", "p4"],
            },
          ],
        },
        sceneObjects: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                type: {
                  type: "string",
                },
                position: {
                  type: "object",
                  properties: {
                    x: {
                      type: "number",
                    },
                    y: {
                      type: "number",
                    },
                    z: {
                      type: "number",
                    },
                  },
                  required: ["x", "y", "z"],
                },
                rotation: {
                  type: "number",
                },
              },
              required: ["type", "position", "rotation"],
            },
          ],
        },
        modelsAndTextures: {
          type: "object",
          properties: {
            models: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["type", "path"],
                },
                {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["type", "path"],
                },
                {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["type", "path"],
                },
              ],
            },
            areaTextures: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    subLevel: {
                      type: "number",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["subLevel", "path"],
                },
                {
                  type: "object",
                  properties: {
                    subLevel: {
                      type: "number",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["subLevel", "path"],
                },
                {
                  type: "object",
                  properties: {
                    subLevel: {
                      type: "number",
                    },
                    path: {
                      type: "string",
                    },
                  },
                  required: ["subLevel", "path"],
                },
              ],
            },
          },
          required: ["models", "areaTextures"],
        },
      },
      required: ["floors", "areas", "sceneObjects", "modelsAndTextures"],
    };

    this.IsValid = new Ajv({ strictTuples: false }).compile(this.schema);
  }
  public subscribeToConnection(obs: IServerConnectionObserver): void {
    this.connectionObserver.push(obs);
  }
  subscribeToPolling(obs: IServerPollingObserver): void {
    this.pollingObserver.push(obs);
  }
  subscribeToInitialConfig(obs: IServerInitialConfigObserver): void {
    this.initialObserver.push(obs);
  }

  public async initRequest(request: InitialConfigRequest): Promise<InitialConfigResponse> {
    try {
      const json = (await (await fetch("JsonExample/InitialConfigResponse.json")).json()) as InitialConfigResponse;
      //controllare
      if (this.isConnectionUp == false) {
        this.notifyConnectionUpObserver();
        this.isConnectionUp = true;
      }

      if (this.IsValid(json)) {
        this.notifyInitialObserver(json);
        return json;
      }
      throw new Error("Not valid InitialConfigResponse Json");
    } catch (error) {
      console.log(error);
      //controllare
      if (this.isConnectionUp == true) {
        this.notifyConnectionDownObserver();
        this.isConnectionUp = false;
      }
      throw new Error("Connection Error");
    }
  }

  public async pollingRequest(request: ServerPollingRequest): Promise<ServerPollingResponse> {
    try {
      const json = (await (await fetch("JsonExample/ServerPollingResponse.json")).json()) as ServerPollingResponse;

      if (this.isConnectionUp == false) {
        this.notifyConnectionUpObserver();
        this.isConnectionUp = true;
      }

      this.notifyPollingObserver(json);
      return json;
    } catch (error) {
      //console.log(error);

      if (this.isConnectionUp == true) {
        this.notifyConnectionDownObserver();
        this.isConnectionUp = false;
      }

      throw new Error("Connection Error with Server ");
    }
  }

  public notifyConnectionUpObserver(): void {
    this.connectionObserver.forEach((observer) => {
      observer.onServerConnectionUp();
    });
  }

  public notifyConnectionDownObserver(): void {
    this.connectionObserver.forEach((observer) => {
      observer.onServerConnectionDown();
    });
  }

  public notifyInitialObserver(response: InitialConfigResponse): void {
    this.initialObserver.forEach((obsever) => {
      obsever.onInitialConfig(response);
    });
  }

  public notifyPollingObserver(response: ServerPollingResponse): void {
    this.pollingObserver.forEach((obsever) => {
      obsever.onServerPolling(response);
    });
  }
}

export class RTLSCommunicator implements IRTLSCommunicator {
  private pollingObservers: IRTLSPollingObserver[];
  private connectionObservers: IRTLSConnectionObserver[];
  private isConnectionUp: boolean;

  public constructor() {
    this.pollingObservers = [];
    this.connectionObservers = [];
    this.isConnectionUp = true;
  }
  subscribeToConnection(obs: IRTLSConnectionObserver): void {
    this.connectionObservers.push(obs);
  }
  public subscribeToPolling(obs: IRTLSPollingObserver): void {
    this.pollingObservers.push(obs);
  }
  notifyConnectionUp(): void {
    this.connectionObservers.forEach((obs) => {
      obs.onRTLSConnectionUp();
    });
  }
  notifyConnectionDown(): void {
    this.connectionObservers.forEach((obs) => {
      obs.onRTLSConnectionDown();
    });
  }
  notifyPolling(response: RTLSPollingResponse): void {
    this.pollingObservers.forEach((obs) => {
      obs.onRTLSPolling(response);
    });
  }

  async pollingRequest(request: RTLSPollingRequest): Promise<RTLSPollingResponse> {
    try {
      const json = (await (await fetch("https://localhost:7157/Forklift/GetPosition")).json()) as RTLSPollingResponse;
      this.notifyPolling(json);
      if (this.isConnectionUp == false) {
        this.notifyConnectionUp();
        this.isConnectionUp = true;
      }
      return json;
    } catch (error) {
      if (this.isConnectionUp == true) {
        this.notifyConnectionDown();
        this.isConnectionUp = false;
      }
      throw Error("Connection Error with RTLS");
    }
  }
}
