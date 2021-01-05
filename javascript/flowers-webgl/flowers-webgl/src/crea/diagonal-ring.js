import { makeRing } from '../makeRing.js'
import { scene } from '../setup.js'
import { rad } from '../utils/utils.js'

const container = new THREE.Object3D()
scene.add(container)

container.rotation.order = 'ZXY'
container.rotation.z = rad(60)
container.update = () => {
    container.rotation.y += rad(-0.1)
}

let objs = makeRing({
    // debug: true,
    count: 64,
    radius: 4,
})

const geometry = new THREE.IcosahedronGeometry(0.02)

for (const [index, obj] of objs.entries()) {

    const rest = index % 4
    const color = (
        rest === 0 ? '#F05F3C' :    // orange
        rest === 1 ? '#5886F2' :    // bleu
        '#42008E'                   // un genre de violet
    )

    const material = new THREE.MeshBasicMaterial({
        color,
        // wireframe: true,
    })

    const cube = new THREE.Mesh( geometry, material )
    obj.add(cube)

    container.add(obj)
}
