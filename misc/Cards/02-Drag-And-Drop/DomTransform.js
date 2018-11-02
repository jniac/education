
//  0 : 'x',
//  1 : 'y',
//  2 : 'z',
//  3 : 'offsetX',
//  4 : 'offsetY',
//  5 : 'offsetZ',
//  6 : 'rotation',
//  7 : 'rotationX',
//  8 : 'rotationY',
//  9 : 'rotationZ',
// 10 : 'scale',
// 11 : 'scaleX',
// 12 : 'scaleY',
// 13 : 'scaleZ',

const propIndexes = {

    x:          0,
    y:          1,
    z:          2,
    offsetX:    3,
    offsetY:    4,
    offsetZ:    5,
    rotation:   6,
    rotationX:  7,
    rotationY:  8,
    rotationZ:  9,
    scale:      10,
    scaleX:     11,
    scaleY:     12,
    scaleZ:     13,

}

let instances = new Set()
let dirtyInstances = new Set()

class DomTransform {

    constructor(element = null) {

        let x = 0
        let y = 0
        let z = 0
        let offsetX = 0
        let offsetY = 0
        let offsetZ = 0
        let rotation = 0
        let rotationX = 0
        let rotationY = 0
        let rotationZ = 0
        let scale = 1
        let scaleX = 1
        let scaleY = 1
        let scaleZ = 1

        let array = [x, y, z, offsetX, offsetY, offsetZ, rotation, rotationX, rotationY, rotationZ, scale, scaleX, scaleY, scaleZ]
        let isDirty = true

        Object.assign(this, {

            element,
            array,
            isDirty,

        })

        instances.add(this)
        dirtyInstances.add(this)

    }

    set(props) {

        Object.assign(this, props)

        return this

    }

    setDirty() {

        this.isDirty = true
        dirtyInstances.add(this)

    }

    setElement(element) {

        this.element = element
        this.setDirty()

        return this

    }

    update() {

        // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

        // matrix:
        // a, b, c, x
        // d, e, f, y
        // g, h, i, z
        // 0, 0, 0, 1

        let [x, y, z, offsetX, offsetY, offsetZ, rotation, rotationX, rotationY, rotationZ, scale, scaleX, scaleY, scaleZ] = this.array

        // combine position & offset
        x += offsetX
        y += offsetY
        z += offsetZ

        // combine rotation & rotationZ
        rotationZ += rotation

        // combine scale & scaleX|Y|Z
        scaleX *= scale
        scaleY *= scale
        scaleZ *= scale

        // NOTE: only rotationZ is supported
        // does full support (rotationX|Z|Z) need to multiply matrice?

        let a = Math.cos(rotationZ) * scaleX
        let b = -Math.sin(rotationZ) * scaleY
        let c = 0

        let d = Math.sin(rotationZ) * scaleX
        let e = Math.cos(rotationZ) * scaleY
        let f = 0

        let g = 0
        let h = 0
        let i = scaleZ

        this.matrix = [
            a, b, c, x,
            d, e, f, y,
            g, h, i, z,
            0, 0, 0, 1,
        ]

        let { element } = this

        if (element) {

            let transform = `matrix3d(${a},${d},${g},${0},${b},${e},${h},${0},${c},${f},${i},${0},${x},${y},${z},${1})`

            element.style.transform = transform

        }

    }

}

const simpleArrayProperties = (target, properties) => {

    properties.split(/\s*,\s*/).forEach((prop) => {

        let index = propIndexes[prop]

        let getter = function() {

            return this.array[index]

        }

        let setter = function(value) {

            if (this.array[index] === value)
                return this

            this.array[index] = value

            this.setDirty()

            return this

        }

        let getterName = `get${prop.slice(0,1).toUpperCase()}${prop.slice(1)}`
        let setterName = `set${prop.slice(0,1).toUpperCase()}${prop.slice(1)}`

        Object.defineProperty(target, prop, {

            enumerable: true,
            get: getter,
            set: setter,

        })

        Object.defineProperty(target, getterName, {

            value: getter,

        })

        Object.defineProperty(target, setterName, {

            value: setter,

        })

    })

}

const scaledArrayProperties = (target, properties, scalar) => {

    properties.split(/\s*,\s*/).forEach((prop) => {

        let index = propIndexes[prop]

        let getter = function() {

            return this.array[index] * scalar

        }

        let setter = function(value) {

            value /= scalar

            if (this.array[index] === value)
                return this

            this.array[index] = value

            this.setDirty()

            return this

        }

        let getterName = `get${prop.slice(0,1).toUpperCase()}${prop.slice(1)}`
        let setterName = `set${prop.slice(0,1).toUpperCase()}${prop.slice(1)}`

        Object.defineProperty(target, prop, {

            enumerable: true,
            get: getter,
            set: setter,

        })

        Object.defineProperty(target, getterName, {

            value: getter,

        })

        Object.defineProperty(target, setterName, {

            value: setter,

        })

    })

}

simpleArrayProperties(DomTransform.prototype, 'x,y,z,offsetX,offsetY,offsetZ,scale,scaleX,scaleY,scaleZ')
scaledArrayProperties(DomTransform.prototype, 'rotation,rotationX,rotationY,rotationZ', 180 / Math.PI)

const update = () => {

    for (let domTransform of dirtyInstances) {

        domTransform.update()
        domTransform.isDirty = false

    }

    dirtyInstances.clear()

}

const updateLoop = () => {

    requestAnimationFrame(updateLoop)

    update()

}

updateLoop()

export { DomTransform }
export default DomTransform
