import THREE from './THREE.js'
import { scene } from './setup.js'

export const makeRing = ({
    count = 6,
    radius = 2,
    angleOffset = 0,
    position = new THREE.Vector3(0, 0, 0),
    rotationX = 0,
    rotationZ = 0,
    scale = 1,
    parent = scene,
    debug = false,
} = {}) => {

    const objs = []

    for (let index = 0; index < count; index++) {

        const baseAngle = 2 * Math.PI * index / count
        const angle = baseAngle + angleOffset * Math.PI / 180

        const obj = new THREE.Object3D()
        obj.position.x = position.x + radius * Math.cos(angle)
        obj.position.y = position.y
        obj.position.z = position.z + radius * Math.sin(angle)

        obj.rotation.y = Math.PI / 2 - baseAngle
        obj.rotation.x = rotationX * Math.PI / 180
        obj.rotation.z = rotationZ * Math.PI / 180
        obj.rotation.order = 'YXZ'

        obj.scale.x = scale
        obj.scale.y = scale
        obj.scale.z = scale

        if (debug) {
            const axis = new THREE.AxesHelper(1)
            obj.add(axis)
        }

        parent.add(obj)
        objs.push(obj)
    }

    return objs
} 