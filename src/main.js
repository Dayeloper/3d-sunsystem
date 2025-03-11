import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;
camera.position.y = 60;
renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(10);
const texture = textureLoader.load('src/sun.jpg');
const material = new THREE.MeshBasicMaterial({ 
  transparent: true,
  color: 0xFF6347, 
  map: texture 
});

const sun = new THREE.Mesh(geometry, material);
scene.add(sun);
camera.lookAt(sun.position);


const ambientLight = new THREE.PointLight(0xffffff,500,210)
scene.add(ambientLight);

const planetGeometry = new THREE.SphereGeometry(2, 24, 24);
const planettexture = textureLoader.load('src/earth.jpg');
const planetMaterial = new THREE.MeshStandardMaterial({ map: planettexture, color: 0xffffff});
const planet = new THREE.Mesh(planetGeometry, planetMaterial);

const moonGeometry = new THREE.SphereGeometry(1);
const moontexture = textureLoader.load('src/moon.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ map: moontexture, color: 0xffffff});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon)
planet.add(moon)
moon.position.set(10,0,0)


const anker = new THREE.Group()
scene.add(anker)

anker.position.set(0,0,0)
anker.add(planet)
planet.position.set(59, 0, 0);





function animate() {
  const planetWorldPosition = new THREE.Vector3();
  planet.getWorldPosition(planetWorldPosition);
  camera.lookAt(planetWorldPosition);
  requestAnimationFrame(animate);
  sun.rotation.y += 0.005;
  anker.rotation.y+= 0.01;
  planet.rotation.y += 0.1;
  moon.rotation.y += 0.3;

  renderer.render(scene, camera);

}
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

function generateStar() {
  const form = new THREE.SphereGeometry(getRandomInRange(0.01,0.9), 24, 24);
  const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(form, material2);
  const x = getRandomInRange(-800, 800);
  const y = getRandomInRange(-500, 30);
  const z = getRandomInRange(-800, 800);
  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(generateStar); 
animate();
