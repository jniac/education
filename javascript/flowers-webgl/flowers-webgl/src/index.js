import THREE from './THREE.js'

import { scene, getTexture } from './setup.js'
import { makeRing } from './makeRing.js'

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x00ff00,
//     alphaMap: getTexture('./assets/leaf-1.svg'), 
//     side: THREE.DoubleSide,
//     transparent: true,
//     depthWrite: false,
// })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
// cube.onBeforeRender = () => cube.rotation.y += 0.01

for (const obj of makeRing({
    count: 6,
    debug: true,
})) {
    
}