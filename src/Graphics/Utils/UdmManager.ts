import { ModelFactory } from "../Implementations/Three/ModelFactory";
import { UDM } from "../Objects/UDM";
import { HighLightedUdms, LoadedUdms, NearestUdms, ServerPollingResponse } from "./JsonResponses";
import { ModelTypes } from "./ModelTypes";

export class UdmManager{
    private udms : {
        [id : number] : UDM
    }
    private maxUdmsNumber : number;

    public constructor(maxUdmsNumber : number = 1000){
        this.maxUdmsNumber = maxUdmsNumber;
        this.udms = {}
    }

    public readNearest(response : NearestUdms[]) : void{
        response.forEach(jsonUdm => {
            if (this.udms[jsonUdm.id]){
                this.udms[jsonUdm.id].moveTo(jsonUdm.position,jsonUdm.rotation);
                this.udms[jsonUdm.id].setHightlightOff();
            }
            else{
                this.addUmd(jsonUdm);
            }
        })
    }

    //PENSARE
    //SE CHIAMO PRIMA NEAREST E POI HIGHLIGHTED POSSO AVERE LA STESSA BOBINA SIA NELLE NEAREST CHE NELL'ALTRA CATEGORIA PERCHé PRIMA NON LE EVIDENZIO E POI SI
    //OPPURE
    //CI FACCIAMO DARE LA POSIZIONE DI ENTRAMBE LE LISTE E NON ABBIAMO BOBINE DUPLICATE?

    public readHighlighted(response : HighLightedUdms[]) : void{ 
        response.forEach(jsonUdm => {
            if (this.udms[jsonUdm.id]){
                this.udms[jsonUdm.id].setHightlightOn();
            }
            
        })
    }

    public readLoaded(response : LoadedUdms[]) : void{

    }

    public addUmd(jsonUdm : NearestUdms){
        ModelFactory.makeObject(ModelTypes[jsonUdm.type.toUpperCase() as keyof typeof ModelTypes], jsonUdm.size).then(model => {
            const udm = new UDM(model,jsonUdm.id,jsonUdm.position,jsonUdm.rotation);
            this.udms[jsonUdm.id] = udm;
        })
    }
}