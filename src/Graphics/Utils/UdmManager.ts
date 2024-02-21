import { ModelFactory } from "../Implementations/Three/ModelFactory";
import { UDM } from "../Objects/UDM";
import {  NearestUdm } from "./JsonResponses";
import { ModelTypes } from "./ModelTypes";

export class UdmManager {
  private udms: {
    [id: number]: UDM;
  };

  private highlightedUdms: {
    [id: number]: UDM;
  };

  private loadedUdms: {
    [id: number]: UDM;
  };

  private maxUdmNumber: number;
  private maxDistanceToRender: number;

  public constructor(maxUdmNumber: number = 1000, maxDistanceToRender: number = 1000) {
    this.maxUdmNumber = maxUdmNumber;
    this.maxDistanceToRender = maxDistanceToRender;

    this.udms = {};
    this.highlightedUdms = {};
    this.loadedUdms = {};
  }

  public getMaxUdmNumber(): number {
    return this.maxUdmNumber;
  }

  public getMaxDistanceToRender(): number {
    return this.maxDistanceToRender;
  }

  public async readNearest(response: NearestUdm[]): Promise<UDM[]> {
    const res: UDM[] = [];
    this.hideAllUdms();
    for await (const jsonUdm of response) {
      if (this.udms[jsonUdm.id]) {
        if (!this.loadedUdms[jsonUdm.id]) {
          this.udms[jsonUdm.id].moveTo(jsonUdm.position, jsonUdm.rotation);
        }
        this.udms[jsonUdm.id].show();
      } else {
        await this.addUmd(jsonUdm);
        res.push(this.udms[jsonUdm.id]);
      }
    }

    return res;
  }

  public readHighlighted(response: number[]): void {
    Object.keys(this.highlightedUdms).forEach((key) => {
      this.highlightedUdms[parseInt(key)].setHightlightOff();
      delete this.highlightedUdms[parseInt(key)];
    });

    response.forEach((jsonUdmId) => {
      if (this.udms[jsonUdmId]) {
        this.highlightedUdms[jsonUdmId] = this.udms[jsonUdmId];
        this.highlightedUdms[jsonUdmId].setHightlightOn();
      }
    });
  }

  public async readLoaded(response: number[]): Promise<UDM[]> {
    const udmsToLoad: UDM[] = [];

    Object.keys(this.loadedUdms).forEach((key) => {
      delete this.loadedUdms[parseInt(key)];
    });

    for await (const jsonUdmId of response) {
      if (this.udms[jsonUdmId]) {
        this.loadedUdms[jsonUdmId] = this.udms[jsonUdmId];
        udmsToLoad.push(this.udms[jsonUdmId]);
      }
    }

    return udmsToLoad;
  }

  public async addUmd(jsonUdm: NearestUdm): Promise<void> {
    const model = await ModelFactory.makeObject(ModelTypes[jsonUdm.type.toUpperCase() as keyof typeof ModelTypes], jsonUdm.size);

    const udm = new UDM(model, jsonUdm.id, jsonUdm.position, jsonUdm.rotation);
    this.udms[jsonUdm.id] = udm;
  }

  public removeUdm(udm: UDM): void {
    udm.remove();
    delete this.udms[udm.getId()];
  }

  private hideAllUdms(): void {
    Object.keys(this.udms).forEach((key) => {
      this.udms[parseInt(key)].hide();
    });
  }

  public getHiddenUdms(): UDM[] {
    let response: UDM[] = [];
    Object.keys(this.udms).forEach((key) => {
      if (!this.loadedUdms[parseInt(key)] && this.udms[parseInt(key)].getVisibility()) {
        response.push(this.udms[parseInt(key)]);
      }
    });
    return response;
  }
}
