// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Reusable function to create a sphere of white dots
function createPointsSphere(numPoints, radius, pointSize) {
    const group = new THREE.Group();
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: pointSize });
    const points = new THREE.Points(geometry, material);
    group.add(points);
    return group;
}

// Create three spheres with different parameters
const sphere1 = createPointsSphere(1000, 1, 0.01);
const sphere2 = createPointsSphere(2000, 3, 0.01);
const sphere3 = createPointsSphere(1500, 2, 0.01);

// Add the spheres to the scene
scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

// Define the rotation axis (from top right to bottom right)
const axis = new THREE.Vector3(1, 0, -1).normalize();
const rotationSpeed = 0.0007;

// Animation loop: rotate all spheres on the same axis
function animate() {
    requestAnimationFrame(animate);
    sphere1.rotateOnAxis(axis, rotationSpeed);
    sphere2.rotateOnAxis(axis, rotationSpeed);
    sphere3.rotateOnAxis(axis, rotationSpeed);
    renderer.render(scene, camera);
}
animate();

// Update renderer and camera on window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});