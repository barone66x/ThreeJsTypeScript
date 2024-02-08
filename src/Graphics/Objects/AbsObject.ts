import { ModelTypes } from "../Utils/ModelTypes";
import { Point3d } from "../Utils/Point";
import { Model } from "../Implementations/Three/Model";

export abstract class AbsObject{
    protected model : Model;
    //protected id : number;

    public constructor(model : Model);
    public constructor(model : Model, initialPosition : Point3d, initialRotation : number);
    public constructor(model : Model, initialPosition? : Point3d, initialRotation? : number){
        
        this.model = model;

        if((initialRotation != undefined) && (initialPosition != undefined)){
            this.model.moveTo(initialPosition, initialRotation);
        }        
    }

    public getObject() : any{
        return this.model.getObject();
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