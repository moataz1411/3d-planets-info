import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import {GLTFLoader} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
function createModel(containerId, modelPath,scale,cameraZ){
const scene = new THREE.Scene();
const container = document.getElementById(containerId);
const camera = new THREE.PerspectiveCamera(75,container.clientWidth/container.clientHeight,0.1,1000);
let object;
const loader=new GLTFLoader();
loader.load(modelPath,function(gltf){
    object=gltf.scene;
    object.scale.set(scale,scale,scale);
    scene.add(object);
},
function(xhr){
    console.log((xhr.loaded/xhr.total*100)+'% loaded');
},
function(error){
    console.error(error);
});
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
camera.position.z=cameraZ;
const controls = new OrbitControls(camera,renderer.domElement);
controls.autoRotate=true;
controls.autoRotateSpeed=3;
controls.enableZoom=false;
controls.enaplePin=false;
controls.addEventListener("start", ()=>{
controls.autoRotate=false;
});
controls.addEventListener("end",()=>{
controls.autoRotate=true;
});
const topLight=new THREE.DirectionalLight(0xffffff,1);
topLight.position.set(500,500,500);
const ambientLight= new THREE.AmbientLight(0xffffff,2);
scene.add(ambientLight);
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
window.addEventListener("resize", function(){
    const container = document.getElementById(containerId)
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
animate();
}
createModel("container3d", "planets/mars.glb", 0.6, 5);
createModel("container3d2", "planets/jupiter.glb", 0.009,4);
createModel("container3d3", "planets/saturn.glb", 0.01,4);
createModel("container3d4", "planets/uranus.glb",0.00004,4)
createModel("container3d5", "planets/blackhole.glb",0.002,4)

