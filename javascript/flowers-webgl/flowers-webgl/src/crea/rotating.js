import THREE from '../THREE.js'
import { makeRing } from '../makeRing.js'
import { scene, getTexture, setAutoPauseDelay } from '../setup.js'
import { rad } from '../utils/utils.js'

const container = new THREE.Object3D()
scene.add(container)

container.update = () => {
    container.rotation.y += rad(0.1)
}

setAutoPauseDelay(60) // auto-pause au bout d'une minute (et non plus 1 seconde)

for (const obj of makeRing({
    // debug: true,
    radius: 3,
    scale: 1.5,
    count: 12,
})) {

    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ 
        color: '#C3D5FF', 
        side: THREE.DoubleSide,
        transparent: true,
        alphaMap: getTexture('./assets/leaf-1-handdrawing.png'),
    })
    
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = rad(80)
    obj.add(plane)

    container.add(obj)
}
