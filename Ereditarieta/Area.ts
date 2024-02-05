import { I3dObject } from "./I3dObject";

export class Area implements I3dObject{
    private object3d: THREE.Object3D;

    // I3dObject 
    public get3dObject() {
        throw new Error("Method not implemented.");
    }
    public hide(): void {
        throw new Error("Method not implemented.");
    }
    public show(): void {
        throw new Error("Method not implemented.");
    }

}