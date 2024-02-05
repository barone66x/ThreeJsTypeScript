import "./style.css";
import * as THREE from "three";

const res = {
  // imposto risoluzione iniziale
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
renderer.setPixelRatio(2);
renderer.setSize(res.width, res.height);

const scene = new THREE.Scene();
// scene.rotation.order = "YXZ";
// scene.rotation.y = Math.PI;
// scene.rotation.x = Math.PI / 2;
scene.background = new THREE.Color(0x95ecfc);
scene.add(new THREE.AmbientLight());
scene.up = new THREE.Vector3( 0, 0, 1 );

const camera = new THREE.PerspectiveCamera(90, res.width / res.height, 0.1, 500);
camera.position.z = 10;
camera.lookAt(0, 0, 0);

const box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
scene.add(box);

document.body.appendChild(renderer.domElement);
requestAnimationFrame(animate);

function animate(): void {
  renderer.render(scene, camera);
  // box.position.x = Math.sin(Date.now() / 1000) * 5;
  // box.position.y = Math.sin(Date.now() / 1000) * 5;
  // box.position.z = Math.sin(Date.now() / 1000) * 5;
  box.rotation.z += 0.0055;
  console.log(box.position.x + " " + box.position.z + " " + box.position.y);
  requestAnimationFrame(animate);
}
