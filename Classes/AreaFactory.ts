import { ModelTypes } from "./ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";

export class AreaFactory{
    private textureDictionary : {
        [type : number] : THREE.Material
    }

    public constructor (){
        this.textureDictionary = {};
    }

    private loadFile(path : string) : THREE.Material{
        //Caricamento da file della texture
        return new THREE.Material();
    }

    public addAreaModel(type : ModelTypes, path : string) : void{
        let texture = this.loadFile(path);
        this.textureDictionary[type] = texture;
    }

    public makeArea(type : ModelTypes, p1 : THREE.Vector2,p2 : THREE.Vector2,p3 : THREE.Vector2,p4 : THREE.Vector2) : Model{
        //mokup
        //andiamo a creare un modello 3d che ha come material la texture che abbiamo applicato
        //usiamo i 4 punti per geneare i vertici del modello 3d
        return new Model(new THREE.Object3D(), type);
    }
    
}