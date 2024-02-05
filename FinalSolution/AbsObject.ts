import { ModelTypes } from "../CommonClasses/ModelTypes";
import { Point3d } from "../CommonClasses/Point";
import { Model } from "./Model";

export abstract class AbsObject{
    protected model : Model;
    protected id : number;

    public constructor(model : Model, id : number);
    public constructor(model : Model, id : number, initialPosition : Point3d, initialRotation : number);
    public constructor(model : Model, id : number, initialPosition? : Point3d, initialRotation? : number){
        
        this.model = model;
        this.id = id;

        if(initialPosition && initialRotation){
            this.model.moveTo(initialPosition, initialRotation);
        }        
    }

    public getObject() : any{
        return this.model.getObject();
    }
    public getId() : number{
        return this.id;
    }
    public getType() : ModelTypes{
        return this.model.getType();
    }

    public show() : void{
        this.model.show();
    }
    public hide() : void{
        this.model.hide();
    }
}