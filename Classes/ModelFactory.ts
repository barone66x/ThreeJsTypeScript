import { ModelTypes } from "./ModelTypes";
import { Model } from "./Model";
import * as THREE from "three";

export class ModelFactory{
    private modelDictionary : {
        [type: number] : THREE.Object3D  //type è un enum di ModelTypes
    }

    public constructor (){
        this.modelDictionary = {};
    }

    private loadFile (path : string) : THREE.Object3D {
        //carico il modello 3d a partire dalla stringa del percorso
        //mockup
        return new THREE.Object3D();
    }

    public addObject(type : ModelTypes, path : string) : void {
        let object = this.loadFile(path);
        this.modelDictionary[type] = object;

    }

    public makeObject (type : ModelTypes, scale : THREE.Vector3) : Model{
        let object = this.modelDictionary[type].clone();
        // modificare scala
        return new Model (object,type);
    }

    //da vedere
    public makeFork (){  //metodo che restituisce un oggetto ForkModel che deriva da Model

     }

   
}