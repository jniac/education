import THREE from './THREE.js'

import { scene } from './setup.js'

const img = new Image()
img.src = './assets/leave-1.svg'
const texture = new THREE.TextureLoader().load('./assets/leave-1.svg')

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    alphaMap: texture, 
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.onBeforeRender = () => cube.rotation.y += 0.01

