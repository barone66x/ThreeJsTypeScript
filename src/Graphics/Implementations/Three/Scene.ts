import * as THREE from "three";
import { AbsObject } from "../../Objects/AbsObject";


interface CameraDelegate{
    () : THREE.PerspectiveCamera;
}

export class Scene{
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;

    public constructor(pixelRatio: number = 1.5) {

        this.renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance"});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(pixelRatio);
    
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x95ecfc);
        this.scene.add(new THREE.AmbientLight());
        this.scene.up = new THREE.Vector3(0, 0, 1);       
    }

    public init(camera: () => THREE.PerspectiveCamera): void {
        document.body.appendChild(this.getHTMLCanvas());
        requestAnimationFrame(() => this.animate(camera));
    }

    public getHTMLCanvas(): HTMLCanvasElement {
        return this.renderer.domElement;
    }
      
    public addToScene(object: AbsObject): void {
        const object3D = object.getObject();
        this.scene.add(object3D);
    }

    public onWindowResize(): void {
        const height = window.innerHeight;
        const width = window.innerWidth;
    
        this.renderer.setSize(width, height);
    }

    private animate(camera: Function): void {
        this.renderer.render(this.scene, camera());    
        requestAnimationFrame(() => this.animate(camera));
    }
}