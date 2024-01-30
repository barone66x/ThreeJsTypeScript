import * as THREE from "three"

export class CameraManager{
    private camerasList : Array<THREE.Camera>;
    private currentCamera : THREE.Camera;
    private currentCameraIndex : number;

    public constructor(camerasList : THREE.Camera[] ) {
        this.camerasList = camerasList;
        this.currentCameraIndex = 0
        if (this.camerasList.length == 0) {
            throw new Error();
        }
    }

    public changeCamera() : void {
        this.currentCameraIndex += 1;
        if (this.currentCameraIndex == this.camerasList.length) {
            this.currentCameraIndex = 0;
        }
        this.currentCamera = this.camerasList[this.currentCameraIndex];
    }

    public getCurrentCamera() : THREE.Camera {
        return this.currentCamera;
    }

}
