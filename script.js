import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// 3 things needed to create a scene:
// - a renderer
// - a camera
// - a scene object

// RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
// set the size of the renderer
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);
// add the renderer to the document
document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75; // field of view
const aspect = w / h; // aspect ratio
const near = 0.1; // near clipping plane
const far = 10; // far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// set the position of the camera
camera.position.z = 2;

// SCENE
const scene = new THREE.Scene();

// add the orbit controls to the camera
const controls = new OrbitControls(camera, renderer.domElement);
// disable controls to zoom in and out
controls.minDistance = 1.2
controls.maxDistance = 5

// an animation effect when you stop dragging
controls.enableDamping = true; 
// the speed of the animation effect
controls.dampingFactor = 0.05;

// create a geometry (primitive shape) to add it to the scene
const geo = new THREE.IcosahedronGeometry(1, 5)

// the basic material doesn't interact with light but the standard one does MeshBasicMaterial / MeshStandardMaterial
// also when using the standard material you need to add a light to the scene
const mat = new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
const wireMesh = new THREE.Mesh(geo, wireMat);
// scale the wireMesh a bit bigger than the mesh so it looks like a wireframe
wireMesh.scale.setScalar(1.05); 

// add the wireMesh to the mesh, so they both rotate together in the animate function
mesh.add(wireMesh);

// add a light to the scene (when you use the standard material you need to add a light)
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

const animate = () => {
    requestAnimationFrame(animate);
    // rotate the mesh (and the wireMesh)
    mesh.rotation.y += 0.001;
    controls.update(); // only needed when damping is enabled
    renderer.render(scene, camera);
}

animate()