import { UDM } from "../UDM";

export interface IComposable{
    attach(udms : UDM[]) : void;
    detach() : void;
}