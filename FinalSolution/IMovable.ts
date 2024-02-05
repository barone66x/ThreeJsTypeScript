import { Point3d } from "../CommonClasses/Point";

export interface IMovable{
    moveTo(position : Point3d, rotation : number) : void;
}