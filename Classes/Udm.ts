import { ModelTypes } from "./ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";


export class Udm {
    private model : Model;
    private id : number;

    public constructor(model : Model, id : number);
    public constructor(model : Model, id : number,position : THREE.Vector3 , rotation : number);
    public constructor(model : Model, id : number, position? : THREE.Vector3 , rotation? : number){
        this.model = model;
        this.id = id;
        if (position)
        {
            this.model.setPosition(position);
        }
        if (rotation){
            this.model.setRotation(rotation);
        }
    }

    public  MoveTo(position : THREE.Vector3, rotation: number) : void{
        this.model.setPosition(position);
        this.model.setRotation(rotation);
    }

    public  setHighlightOn() : void{
        this.model.setHightlightOn();
    }

    public  setHighlightOff() : void{
        this.model.setHightlightOff();
    }

    public show() : void{
        this.model.show();
    }
    public hide() : void{
        this.model.hide();

    }
    
}

