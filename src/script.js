import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('canvas');

// Textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('door.jpg');

// Cursor
const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;
});

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const meshMaterial = new THREE.MeshBasicMaterial({map: texture});
const mesh = new THREE.Mesh(geometry, meshMaterial);
scene.add(mesh);

// Camera
// PerspectiveCamera(Field of view, aspect ratio, near, far) object rendered out of the near/far ratio will be not seen
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const tick = () => {
    // Update object
    controls.update()

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
