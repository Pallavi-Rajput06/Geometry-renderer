import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth/window.innerHeight,
	0.1,
	100
);

camera.position.z = 6;

const geometry = new THREE.BoxGeometry(2,2,3);
const material = new THREE.MeshBasicMaterial({
	color:"white",
	// wireframe:true
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.maxAzimuthAngle = Math.PI/4;
controls.minAzimuthAngle = -Math.PI/4;
controls.minPolarAngle = Math.PI/4;
controls.maxPolarAngle = Math.PI/1.25;
controls.minZoom = 0.5;
controls.maxZoom = 8;
controls.minDistance = 5;

window.addEventListener("resize", function(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});


// ==========================
// 🎛 LIL-GUI CONTROLS
// ==========================

const gui = new GUI();

const cube = {
	width: 2,
	height: 2,
	depth: 3,
	color: "#ffffff"
	,rotationY : 0 
	,rotationX : 0 
	,rotationZ : 0 
    
};

// Function to update geometry
function updateGeometry() {
	mesh.geometry.dispose(); // remove old geometry
	mesh.geometry = new THREE.BoxGeometry(
		cube.width,
		cube.height,
		cube.depth
	);
}

// Size controls
gui.add(cube, "width", 0.5, 10).onChange(updateGeometry);
gui.add(cube, "height", 0.5, 10).onChange(updateGeometry);
gui.add(cube, "depth", 0.5, 10).onChange(updateGeometry);
gui.add(cube, "rotationY", -Math.PI, Math.PI).onChange(function(value){
	mesh.rotation.y = value;
});
gui.add(cube, "rotationX", -Math.PI, Math.PI).onChange(function(value){
	mesh.rotation.x = value;
});
gui.add(cube, "rotationZ", -Math.PI, Math.PI).onChange(function(value){
	mesh.rotation.z = value;
});

// Color control
gui.addColor(cube, "color").onChange(function(value){
	mesh.material.color.set(value);
});


// ==========================

function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene,camera);
}
animate();
