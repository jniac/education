import THREE from './THREE.js'

import { scene, camera, getTexture } from './setup.js'
import { makeRing } from './makeRing.js'
import { rad } from './utils/utils.js'

camera.position.y = 2
camera.lookAt(0, 0, 0)

let objs = makeRing({
    // debug: true,
    count: 30,
    radius: 2,
})

let useOrange = true
for (const obj of objs) {
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)

    const purple = '#8E0047'
    const orange = '#F05F3C'
    const color = useOrange ? orange : purple
    useOrange = !useOrange

    const material = new THREE.MeshBasicMaterial({
        color,
        // wireframe: true,
    } )
    const cube = new THREE.Mesh( geometry, material )
    obj.add(cube)
}

for (const obj of makeRing({ 
    radius:1.5,
    count: 8, 
    // debug: true,
})) {
    const geometry = new THREE.PlaneGeometry()

    const material = new THREE.MeshBasicMaterial({
        color: '#fff',
        side: THREE.DoubleSide,
        map: getTexture('./assets/paper-grunge.jpg'),
        alphaMap: getTexture('./assets/leaf-2.png'),
        transparent: true,
        depthWrite: false,
        // wireframe: true,
    } )
    const cube = new THREE.Mesh( geometry, material )
    obj.add(cube)
}
