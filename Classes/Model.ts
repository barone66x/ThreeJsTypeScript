import * as THREE from "three";
import {ModelTypes} from "./ModelTypes.ts"


export class Model {
    private object : THREE.Object3D;
    private type : ModelTypes;

    public constructor(object : THREE.Object3D, type : ModelTypes ){
        this.object = object;
        this.type = type;
    }

    public getType() : ModelTypes{
        return this.type;
    }

    public setPosition(position : THREE.Vector3){
        this.object.position.copy(position);

    }
    public setRotation(rotation : number){
        this.object.rotation.y = THREE.MathUtils.degToRad(rotation);
        
    }

    public setHightlightOn() : void{

    }

    public setHightlightOff() : void{

    }

    public show() : void{
        this.object.visible = true;
    }

    public hide() : void{
        this.object.visible = false;
    }
}