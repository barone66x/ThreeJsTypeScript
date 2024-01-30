import { ModelTypes } from "./ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";


export class Area {
    private model : Model;
    private id : number;

    // private parentArea : Area | undefined    ->> non ci serve la logica [?]

    public constructor(model : Model, id : number);
    public constructor(model : Model, id : number, parentArea : Area);
    public constructor(model : Model, id : number, parentArea? : Area){
        this.model = model;
        this.id = id;

        if (parentArea) {
            // this.parentArea = parentArea
        }
    }

    public getId() : number{
        return this.id
    }

    public getParentArea() : Area | undefined {
        return undefined;
    }
}