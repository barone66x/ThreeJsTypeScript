import { Object3D, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three";
import { AbsHaveModel } from "../Incapsulamento/AbsHaveModel";
import { CameraManager } from "./CameraManager";

export class SceneManager {
  private scene: Scene;
  private renderer: Renderer;
  private cameraManager: CameraManager;

  public constructor() {
    this.renderer = new WebGLRenderer();
    this.scene = new Scene();
    this.cameraManager = new CameraManager([new PerspectiveCamera(75)]);
  }
  
  public getHTMLCanvas() : HTMLCanvasElement{
    return this.renderer.domElement;
  }   

  public changeCamera(): void {
    this.cameraManager.changeCamera();
  }

  public addToScene(object: AbsHaveModel): void {
    try {
      const object3D = object.getObject3d() as Object3D;
      this.scene.add(object3D);
    } catch (err) {
      console.log(err);
    }
  }
  
  public onWindowResize(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    
    this.renderer.setSize(width, height);
    this.cameraManager.onWindowResize();
  }
  
  public startAnimating(): void {
    requestAnimationFrame(this.animate);
  }
  private animate(): void {
    this.renderer.render(this.scene, this.cameraManager.getCurrentCamera());
    requestAnimationFrame(this.animate);
  }
}
