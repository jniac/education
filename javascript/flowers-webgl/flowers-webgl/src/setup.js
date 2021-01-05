import THREE from './THREE.js'
import { OrbitControls } from './utils/OrbitControls.js'

// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5

const controls = new OrbitControls(camera, renderer.domElement)

const textureLoader = new THREE.TextureLoader()
const textures = new Map()
const getTexture = url => {
    
    if (textures.has(url)) {
        return textures.get(url)
    }

    const texture = textureLoader.load(url)
    textures.set(url, texture)
    return texture
}

let autoPauseDelay = 1
let autoPauseTime = 0
const autoPauseReset = () => autoPauseTime = 0

const dt = 1 / 60

const loop = function () {
    requestAnimationFrame(loop)
    
    autoPauseTime += dt

    if (autoPauseTime <= autoPauseDelay) {
        renderer.render(scene, camera)
    }
}

loop()

window.addEventListener('pointermove', autoPauseReset)
window.addEventListener('keydown', autoPauseReset)
window.addEventListener('mousewheel', autoPauseReset)

export {
    scene,
    camera,
    renderer,
    getTexture,
}
