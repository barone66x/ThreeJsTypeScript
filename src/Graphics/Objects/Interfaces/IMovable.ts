import { Point3d } from "../../Utils/Point";

export interface IMovable{
    moveTo(position : Point3d, rotation : number) : void;
}