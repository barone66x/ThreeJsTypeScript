import "./style.css";
import * as THREE from "three";
import {Bobina,JsonBobina} from  "../Classes/Bobina.ts";
import {Utilities} from "../Classes/Utilities.ts";

// import { pointInPolygon } from "detect-collisions";
// import * as dc from "detect-collisions";

const res = {
  // imposto risoluzione iniziale
  width: window.innerWidth,
  height: window.innerHeight,
};

let http = require('http')

http.createServer(function (req : any, res : any) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(8080);






const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
renderer.setPixelRatio(2);
renderer.setSize(res.width, res.height);

const scene = new THREE.Scene();
scene.rotation.z = Math.PI;
scene.background = new THREE.Color(0x95ecfc);
scene.add(new THREE.AmbientLight());

const camera = new THREE.PerspectiveCamera(
  90,
  res.width / res.height,
  0.1,
  500
);
camera.position.y += 10;
const x = new JsonBobina(JSON.parse('{ "id": 1,"floorId": 1,"position": { "x": 55, "y": 55 },"base": 0.5,"height": 0.5,"depth": 0.5,"rotation": 1,"isStanding": false}'));
const path : string = "./models/Bobina.glb";

const defaultBobinaModel: THREE.Object3D = await Utilities.loadGLTF(path);
const bobina = new Bobina(x,defaultBobinaModel.clone());
bobina.addToScene(scene);
console.log(bobina.getId());
camera.lookAt(bobina.getModelInformation().position)
document.body.appendChild(renderer.domElement);
requestAnimationFrame(animate);

function animate(): void {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}




  

  