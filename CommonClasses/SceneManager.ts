import { AmbientLight, Color, Group, Mesh, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { AbsObject } from "../FinalSolution/AbsObject";
import { CameraManager } from "./CameraManager";

export class SceneManager {
  private scene: Scene;
  private renderer: WebGLRenderer;
  private cameraManager: CameraManager;

  public constructor(pixelRatio : number = 2) {
    this.cameraManager = new CameraManager();

    this.renderer = new WebGLRenderer({ logarithmicDepthBuffer: true ,powerPreference: "high-performance"});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(pixelRatio);

    this.scene = new Scene();
    this.scene.background = new Color(0x95ecfc);
    this.scene.add(new AmbientLight());
    this.scene.up = new Vector3(0, 0, 1);
  }

  public getHTMLCanvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public changeCamera(): void {
    this.cameraManager.changeCamera();
  }

  public addToScene(object: AbsObject): void {
    try {
      const object3D = object.getObject() as Object3D;
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
    requestAnimationFrame(() => this.animate());
  }
  private animate(): void {
    console.log(this.renderer.info.render.calls);
    this.renderer.render(this.scene, this.cameraManager.getCurrentCamera());
    
    requestAnimationFrame(() => this.animate());
  }

  public write(){
    console.log(this.scene.children);
  }
}
