import { Object3D, Vector3 } from "three";
import { Model } from "./Model";
import { Udm } from "./Udm";
import { ModelTypes } from "./ModelTypes";


export class ForkModel extends Model{
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
    private forkModel : ForkModel;

    private id : number;

    public constructor(forkliftModel : Model, forkModel : ForkModel, id : number)
    public constructor(forkliftModel : Model, forkModel : ForkModel, id : number, position : Vector3, rotation : number)
    public constructor(forkliftModel : Model, forkModel : ForkModel, id : number, position? : Vector3, rotation? : number) {
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

    public moveTo(pos : Vector3, rot : number ) : void {
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

export class AltForklift extends Model{
    
    private forkObject : Object3D;
    private id : number;

    public constructor(object : Object3D, type : ModelTypes, id : number, forkObject : Object3D) {
        super(object, type);
        this.forkObject = forkObject;
        this.id = id;
    }

    public getId() : number {
        return this.id
    }

    public moveTo(pos : Vector3, rot : number ) : void {
        //implementazione
    }
    public changeForkHeight(height : number) : void {
        //implementazione
    }

    public attachUdm(/* implementazione */) : void { 
        //implementazione
    }

    public detachUdm(/* implementazione */) : void {
        //implementazione
    }

}