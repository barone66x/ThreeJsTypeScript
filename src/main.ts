import "./style.css";
import * as THREE from "three";

// import { pointInPolygon } from "detect-collisions";
// import * as dc from "detect-collisions";

const res = {
  // imposto risoluzione iniziale
  width: window.innerWidth,
  height: window.innerHeight,
};

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

document.body.appendChild(renderer.domElement);
requestAnimationFrame(animate);

function animate(): void {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}




  

  