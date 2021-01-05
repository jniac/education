import { makeRing } from '../makeRing.js'

let objs = makeRing({
    // debug: true,
    count: 32,
    radius: 2,
})

for (const [index, obj] of objs.entries()) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)

    const purple = '#42008E'
    const orange = '#F05F3C'
    const color = (index % 4) === 0 ? orange : purple

    const material = new THREE.MeshBasicMaterial({
        color,
        // wireframe: true,
    } )
    const cube = new THREE.Mesh( geometry, material )
    obj.add(cube)
}
