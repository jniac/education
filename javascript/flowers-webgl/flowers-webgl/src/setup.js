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
const setAutoPauseDelay = value => autoPauseDelay = parseFloat(value)

const dt = 1 / 60
let time = 0
let frame = 0

const loop = function () {
    requestAnimationFrame(loop)
    
    autoPauseTime += dt

    if (autoPauseTime <= autoPauseDelay) {

        const args = { time, frame }
        scene.traverse(child => {
            if(typeof child.update === 'function') {
                child.update(args)
            }
        })

        renderer.render(scene, camera)
        time += dt
        frame++
    }
}

loop()

window.addEventListener('pointermove', autoPauseReset, true)
window.addEventListener('keydown', autoPauseReset, true)
window.addEventListener('mousewheel', autoPauseReset, true)

export {
    scene,
    camera,
    renderer,
    getTexture,
    
    autoPauseReset,
    setAutoPauseDelay,
}
