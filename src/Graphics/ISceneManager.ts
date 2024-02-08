import { AbsObject } from "./Objects/AbsObject";

export interface ISceneManager {
      
    changeCamera(): void;
    
    addToScene(object: AbsObject): void;

    init(): void;
}
