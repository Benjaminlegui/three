import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const canvas = document.querySelector('canvas');

// Textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    'textures/matcaps/8.png',
)

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
const fontLoader = new FontLoader();

fontLoader.load(
    '/font/helvetiker_regular.typeface.json',
    (font) => {
        const material = new THREE.MeshMatcapMaterial({ matcap: texture});
        const textGeometry = new TextGeometry('Benjamin Leguizamon', 
        {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        });
        const textMesh = new THREE.Mesh(textGeometry, material);

        // Center text
        textGeometry.center()

        scene.add(textMesh);

        const geometry = new THREE.TorusGeometry();
        
        for(let i = 0; i < 100; i++) {
            // Mesh
            const geometryMesh = new THREE.Mesh(geometry, material);

            // Object Transform
            // Scale
            const scale = Math.random() * 0.5;
            geometryMesh.scale.set(scale, scale, scale);

            // position
            geometryMesh.position.x = (Math.random() - 0.5) * 10
            geometryMesh.position.y = (Math.random() - 0.5) * 10
            geometryMesh.position.z = (Math.random() - 0.5) * 10

            // Rotate
            geometryMesh.rotation.x = (Math.random() * Math.PI);
            geometryMesh.rotation.y = (Math.random() * Math.PI);

            // Add Scene
            scene.add(geometryMesh);
        }
    }
)

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Camera
// PerspectiveCamera(Field of view, aspect ratio, near, far) object rendered out of the near/far ratio will be not seen
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 10;
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
