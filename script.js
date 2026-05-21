import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1';
document.body.style.margin = '0';
document.body.style.padding = '0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const loader = new GLTFLoader().setPath('public/solar system/');
let solarSystemMesh;
loader.load('SolarSystem.gltf', (gltf) => {
    solarSystemMesh = gltf.scene;
    solarSystemMesh.scale.set(0.15, 0.15, 0.15);
    solarSystemMesh.position.set(0, -0.9, 0);
    scene.add(solarSystemMesh);

}, undefined, (error) => {
    console.error('DEN LEITOURGEIIIIII:', error);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 128;
context.font = 'Bold 60px Arial';
context.fillStyle = 'white';
context.textAlign = 'center';
context.fillText('Solar System', canvas.width / 2, canvas.height / 2);

const texture = new THREE.CanvasTexture(canvas);
const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
const titleSprite = new THREE.Sprite(spriteMaterial);
titleSprite.position.set(0, 1.3, 0);
titleSprite.scale.set(6, 1.5, 1); 
scene.add(titleSprite);

 function animate() {
    requestAnimationFrame(animate);
    if (solarSystemMesh) {
        solarSystemMesh.rotation.y += 0.01; 
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();