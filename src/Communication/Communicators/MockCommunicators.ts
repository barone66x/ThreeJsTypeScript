import {
  InitialConfigRequest,
  InitialConfigResponse,
  RTLSPollingRequest,
  RTLSPollingResponse,
  ServerPollingRequest,
  ServerPollingResponse,
} from "../../Graphics/Utils/JsonResponses";
import { IRTLSCommunicator, IServerCommunicator } from "./Interfaces";
import Ajv from "ajv";

export class ServerCommunicator implements IServerCommunicator {
  private schema;
  private IsValid: (json: any) => boolean;

  public constructor() {
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

  public async initRequest(request: InitialConfigRequest): Promise<InitialConfigResponse> {
    const json = (await (await fetch("JsonExample/InitialConfigResponse.json")).json()) as InitialConfigResponse;

    if (this.IsValid(json)) {
      return json;
    }
    throw new Error("Not valid InitialConfigResponse Json");
  }

  public async pollingRequest(request: ServerPollingRequest): Promise<ServerPollingResponse> {
    const json = (await (await fetch("JsonExample/ServerPollingResponse.json")).json()) as ServerPollingResponse;

    return json;
  }
}

export class RTLSCommunicator implements IRTLSCommunicator {
  async pollingRequest(request: RTLSPollingRequest): Promise<RTLSPollingResponse> {
    const json = (await (await fetch("https://localhost:7157/Forklift/GetPosition")).json()) as RTLSPollingResponse;
    return json;
  }
}
