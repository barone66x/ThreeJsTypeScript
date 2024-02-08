import { AmbientLight, Color, Scene, Vector3, WebGLRenderer } from "three";
import { AbsObject } from "../../Objects/AbsObject";
import { CameraManager } from "./CameraManager";
import { ISceneManager } from "../../ISceneManager";

export class SceneManager implements ISceneManager{
  private scene: Scene;
  private renderer: WebGLRenderer;
  private cameraManager: CameraManager;

  public constructor(pixelRatio : number = 2) {
    this.cameraManager = new CameraManager();

    this.renderer = new WebGLRenderer({ powerPreference: "high-performance"});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(pixelRatio);

    this.scene = new Scene();
    this.scene.background = new Color(0x95ecfc);
    this.scene.add(new AmbientLight());
    this.scene.up = new Vector3(0, 0, 1);
  }

  public init(): void {
    this.startAnimating();
    document.body.appendChild(this.getHTMLCanvas());
    document.addEventListener("resize", () => {this.onWindowResize()})
  }

  public getHTMLCanvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public changeCamera(): void {
    this.cameraManager.changeCamera();
  }

  public addToScene(object: AbsObject): void {
    const object3D = object.getObject();
    this.scene.add(object3D);
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
    this.renderer.render(this.scene, this.cameraManager.getCurrentCamera());
    
    requestAnimationFrame(() => this.animate());
  }
}
