import THREE from './THREE.js'

import { scene, getTexture } from './setup.js'

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    alphaMap: getTexture('./assets/leave-1.svg'), 
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.onBeforeRender = () => cube.rotation.y += 0.01

