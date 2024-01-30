import { ModelTypes } from "./ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";


export class SceneObject {
    private model : Model;
    private id : number;

    public constructor(model : Model, id : number,position : THREE.Vector3 , rotation : number){
        this.model = model;
        this.id = id;

        this.model.setPosition(position);
        this.model.setRotation(rotation);
    }

    public getId() : number{
        return this.id
    }
}