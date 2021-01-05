import THREE from './THREE.js'

import { scene, camera, getTexture } from './setup.js'
import { makeRing } from './makeRing.js'
import { rad } from './utils/utils.js'

// creations importées
import './crea/rotating.js'
import './crea/cube-ring.js'
import './crea/diagonal-ring.js'
import './crea/stem.js'




camera.position.y = 2
camera.lookAt(0, 0, 0)



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
    })

    const plane = new THREE.Mesh( geometry, material )
    plane.rotation.x = rad(30)
    obj.add(plane)
}
