import * as THREE from "three";
import { AbsObject } from "../../Objects/AbsObject";
import { Point3d } from "../../Utils/Point";

export class CameraManager {
  private camerasList: Array<THREE.PerspectiveCamera>;
  private currentCameraIndex: number;

  public constructor();
  public constructor(camerasList: THREE.PerspectiveCamera[]);
  public constructor(camerasList?: THREE.PerspectiveCamera[]) {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.up = new THREE.Vector3(0,0,1);
    camera.position.z = 4;
    camera.position.y = 10;
    camera.lookAt(0,0,4);

    this.camerasList = [camera];
    this.currentCameraIndex = 0;
    if (camerasList && camerasList.length > 0) {
      this.camerasList = camerasList;
    }
  }

  public startSelfDestruct() {
    setInterval(() => {
      // this.camerasList[this.currentCameraIndex].rotation.y += 0.01;
    }, 10);
  }

  private addCamera(newCamera: THREE.PerspectiveCamera): void {
    this.currentCameraIndex = this.camerasList.push(newCamera) - 1;
  }

  public removeCurrentCamera(): void {
    this.camerasList.splice(this.currentCameraIndex, 1);
  }

  public changeCamera(): void {
    this.currentCameraIndex += 1;
    if (this.currentCameraIndex == this.camerasList.length) {
      this.currentCameraIndex = 0;
    }
  }

  public getCurrentCamera(): THREE.PerspectiveCamera {
    return this.camerasList[this.currentCameraIndex];
  }

  public addCameraToObject(object: AbsObject, positionOffset: Point3d, orientationOffset: number): void {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 100); 
    camera.up = new THREE.Vector3(0,0,1);

    const object3D = object.getObject() as THREE.Object3D;
    camera.position.copy(object3D.position);
    
    camera.lookAt(0,1,0);
    
    camera.position.x += positionOffset.x;
    camera.position.y += positionOffset.y;
    camera.position.z += positionOffset.z;
        
    camera.rotation.y = object3D.rotation.y + THREE.MathUtils.degToRad(orientationOffset);
    
    object3D.attach(camera);
    this.addCamera(camera);
  }

  public onWindowResize(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.camerasList.forEach((camera) => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }
}
