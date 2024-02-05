import { Object3D, Vector3 } from "three";
import { Model } from "./Model";
import { Udm } from "./Udm";
import { ModelTypes } from "./ModelTypes";
import { Point3d } from "./Point";


export class ComposibleModel extends Model{
    private attachedUdms : Udm[];
    
    public constructor(object : Object3D, type : ModelTypes) {
        super(object, type);
        this.attachedUdms = [];
    }

    public attachUdm() : void {
        //implementazione
    }
    public detachUdm() : void {

    }
}

export class Forklift{
    private forkliftModel : Model;
    private forkModel : ComposibleModel;

    private id : number;

    public constructor(forkliftModel : Model, forkModel : ComposibleModel, id : number)
    public constructor(forkliftModel : Model, forkModel : ComposibleModel, id : number, position : Point3d, rotation : number)
    public constructor(forkliftModel : Model, forkModel : ComposibleModel, id : number, position? : Point3d, rotation? : number) {
        this.forkliftModel = forkliftModel;
        this.forkModel = forkModel;
        this.id = id;

        if(position) {
            //implementazione
        }

        if(rotation) {
            //implementazione
        }
    }

    public moveTo(pos : Point3d, rot : number ) : void {
        //implementazione
    }

    public getId() : number {
        return this.id
    }

    public changeForkHeight(height : number) : void {
        //implementazione
    }

    public attachUdm(/* implementazione */) : void { 
        this.forkModel.attachUdm();
    }

    public detachUdm(/* implementazione */) : void {
        this.forkModel.detachUdm();
    }

}

