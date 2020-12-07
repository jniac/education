import THREE from './THREE.js'

// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5;


const loop = function () {
    requestAnimationFrame(loop)
    renderer.render(scene, camera)
}

loop()

export {
    scene,
    camera,
    renderer,
}
