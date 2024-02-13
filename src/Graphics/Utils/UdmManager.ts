import { json } from "stream/consumers";
import { ModelFactory } from "../Implementations/Three/ModelFactory";
import { UDM } from "../Objects/UDM";
import { HighLightedUdm, LoadedUdm, NearestUdm, ServerPollingResponse } from "./JsonResponses";
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
  private maxUdmsNumber: number;

  public constructor(maxUdmsNumber: number = 1000) {
    this.maxUdmsNumber = maxUdmsNumber;
    this.udms = {};
    this.highlightedUdms = {};
    this.loadedUdms = {};
  }

  public async readNearest(response: NearestUdm[]): Promise<UDM[]> {
    const res: UDM[] = [];

    for await (const jsonUdm of response) {
      if (this.udms[jsonUdm.id]) {
        this.udms[jsonUdm.id].moveTo(jsonUdm.position, jsonUdm.rotation);
      } else {
        await this.addUmd(jsonUdm);
        res.push(this.udms[jsonUdm.id]);
      }
    }

    return res;
  }

  //PENSARE
  //SE CHIAMO PRIMA NEAREST E POI HIGHLIGHTED POSSO AVERE LA STESSA BOBINA SIA NELLE NEAREST CHE NELL'ALTRA CATEGORIA PERCHé PRIMA NON LE EVIDENZIO E POI SI
  //OPPURE
  //CI FACCIAMO DARE LA POSIZIONE DI ENTRAMBE LE LISTE E NON ABBIAMO BOBINE DUPLICATE?

  public readHighlighted(response: HighLightedUdm[]): void {
    Object.keys(this.highlightedUdms).forEach(key =>{
        this.highlightedUdms[parseInt(key)].setHightlightOff();
        delete this.highlightedUdms[parseInt(key)];
    });
    
    response.forEach((jsonUdm) => {
      if (this.udms[jsonUdm.id]) {
        this.highlightedUdms[jsonUdm.id] = this.udms[jsonUdm.id];
        this.highlightedUdms[jsonUdm.id].setHightlightOn();
      }
    });
  }

  public readLoaded(response: LoadedUdm[]): UDM[] {
    const udmsToLoad: UDM[] = [];
    Object.keys(this.loadedUdms).forEach(key =>{
        delete this.loadedUdms[parseInt(key)];
    });
    response.forEach((jsonUdm) => {
      this.loadedUdms[jsonUdm.id] = this.udms[jsonUdm.id];
      udmsToLoad.push(this.loadedUdms[jsonUdm.id]);
    });
    return udmsToLoad;
  }

  public async addUmd(jsonUdm: NearestUdm): Promise<void> {
    const model = await ModelFactory.makeObject(ModelTypes[jsonUdm.type.toUpperCase() as keyof typeof ModelTypes], jsonUdm.size);

    const udm = new UDM(model, jsonUdm.id, jsonUdm.position, jsonUdm.rotation);
    this.udms[jsonUdm.id] = udm;
  }
}
