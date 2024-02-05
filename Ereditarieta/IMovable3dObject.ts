import { Point3d } from "../CommonClasses/Point";
import { I3dObject } from "./I3dObject";

export interface IMovable3dObject extends I3dObject{
    moveTo(pos : Point3d, rotation: number) : void;
}