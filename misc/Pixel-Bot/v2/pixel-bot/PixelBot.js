
import namespace from './namespace.js'
import settings from './settings.js'
import keyboard from './keyboard.js'
import mouse from './mouse.js'
import random from './random.js'
import hash from './hash.js'
import room from './room.js'
import BufferMap from './BufferMap.js'
import { Color } from './color.js'
import { globalize, readonly, getter, getterSetter, isIterable } from './utils.js'

let version = '1.0.0'

let { width, height } = settings

let instancesCount = 0
let instances = new Set()

let canvas, ctx

let init = () => {

    canvas = document.querySelector('canvas.pixel-bot')

    ctx = canvas.getContext('2d')

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)

    keyboard.init()
    mouse.init(canvas)

    if (hash.room)
        room.init(hash.room)

}

const fillCanvas = (color, x = 0, y = 0, width = settings.width, height = settings.height) => {

    if (typeof color !== 'string') {

        color = Color.ensure(color).rrggbbaa

    }

    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)

}

let pixelChangeBuffer = new BufferMap()
let pixelOutOfFrameBuffer = new BufferMap()

const setPixelColor = (index, color) => {

    if (typeof color !== 'number') {

        color = Color.ensure(color).getValue()

    }

    pixelChangeBuffer.addPixel(color, index)

    if (frameIsOpen) {

        setColor(color)
        fillPixel(index)

    } else {

        pixelOutOfFrameBuffer.addPixel(color, index)

    }

}

const setColor = (color) => {

    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`

}

const fillPixel = (index) => {

    let x = index % width | 0
    let y = index / width | 0

    ctx.fillRect(x, y, 1, 1)

}


let running = true
let frameRate = 1
let frame = 0
let frameIsOpen = false

const update = () => {

    frameIsOpen = true

    let t = -performance.now()
    let sample = 0

    for (let [color, indexes] of pixelOutOfFrameBuffer.entries()) {

        ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`

        for (let index of indexes) {

            let x = index % width | 0
            let y = index / width | 0

            ctx.fillRect(x, y, 1, 1)

        }

    }

    pixelOutOfFrameBuffer.clear()

    while (sample++ < frameRate) {

        for (let instance of instances) {

            let { updateRate = 1 } = instance

            while (updateRate-- > 0) {

                let { x, y } = instance

                let [r, g, b] = ctx.getImageData(x, y, 1, 1).data

                instance.pixelColor.r = r / 0xff
                instance.pixelColor.g = g / 0xff
                instance.pixelColor.b = b / 0xff

                instance.update()

                if (instance.onUpdate)
                    instance.onUpdate()

                instance.updateCount++
                instance.lifeMax = Math.floor(instance.lifeMax)

                if (instance.updateCount > instance.lifeMax) {

                    instance.destroy()
                    break

                }

            }

        }

        frame++

    }

    if (room.isConnected) {

        room.sendPixelChanges(pixelChangeBuffer)

    }

    pixelChangeBuffer.clear()

    t += performance.now()

    frameIsOpen = false

}

let loop = () => {

    try {

        if (running) {

            update()

        }

        requestAnimationFrame(loop)

    } catch (e) {

        console.log('oups')

        throw e

    }

}

setTimeout(() => {

    init()
    loop()

}, 0)

let orientations = 'NESW'

let orientationAngles = {
    N: -90,
    E: 0,
    S: 90,
    W: 180,
}

let orientationVectors = {

    N: { x:0, y:-1 },
    E: { x:1, y:0 },
    S: { x:0, y:1 },
    W: { x:-1, y:0 },

}



let define = (name, definition) => {

    let { constructor, ...prototype } = definition

    if (constructor !== Object.prototype.constructor) {

        console.warn(`PixelBot.define() Error, constructor must NOT be defined, use "start" instead`)

    }

    constructor = (new Function('initInstance', `return function ${name} (){ initInstance(this, arguments) }`))(initInstance)

    Object.setPrototypeOf(constructor.prototype, PixelBot.prototype)

    Object.assign(constructor.prototype, prototype)

    register(constructor)

    return constructor

}

let register = (constructor) => {

    let { name } = constructor

    console.log(`register "${name}"`)

    Object.defineProperties(constructor, {

        instances: {
            value: new Set(),
        },

        instancesCount: {
            value: 0,
            writable: true,
        },

    })

    namespace.add(name, constructor)

}

let initInstance = (instance, args) => {

    instance.destroyed = false
    instance.pixelColor = new Color()
    instance.color = '#333'
    instance.x = Math.floor(width / 2)
    instance.y = Math.floor(height / 2)
    instance.angle = 0
    instance.speed = 60
    instance.updateCount = 0
    instance.lifeMax = Infinity

    if (!instance.constructor.hasOwnProperty('instances')) {

        register(instance.constructor)

    }

    instance.uid = instancesCount++
    instance.instanceId = instance.constructor.instancesCount++
    instance.constructor.instances.add(instance)
    instance.identifier = instance.constructor.name + '#' + instance.instanceId

    instances.add(instance)

    if (instance.start)
        instance.start(...args)

}

let exportCode = () => {

    let definitions = []

    for (let name of Object.keys(namespace.dict)) {

        let Definition = namespace.get(name)

        let methods = Object.getOwnPropertyNames(Definition.prototype)
            .filter(v => v !== 'constructor')
            .map(v => '\t' + Definition.prototype[v].toString())
            .join('\n\n')

        let str = `class ${name} extends PixelBot {\n\n${methods}\n\n}`

        definitions.push(str)

    }

    let mapValue = (value) => {

    	if (typeof value === 'string')
    		return `'${value}'`

	    return value.toString()

    }

    let instances = Object.keys(namespace.dict).map((k) => {

    	let A = namespace.dict[k]

    	return `// ${k}\n\n` + [...A.instances.values()].map(bot => {

    		let str = Object.entries(bot)
    			.filter(([k]) => !/pixelColor|updateCount|identifier|instanceId/.test(k))
    			.map(([k, v]) => `\t${k}: ${mapValue(v)},`)
    			.join('\n')

    		return `new ${k}().set({\n${str}\n})`

        }).join('\n\n')

    })

    return definitions.join('\n\n') + instances.join('\n\n')

}


export default class PixelBot {

    static new(name, ...args) {

        let constructor = namespace.get(name)

        if (constructor) {

            return new constructor(...args)

        } else {

            console.warn(`PixelBot.new() Error, can not find definition for ${name}`)

        }

    }

    static clear(fillColor = null) {

        for (let bot of instances) {

            bot.destroy()

        }

        if (fillColor !== null) {

            ctx.fillStyle = fillColor
            ctx.fillRect(0, 0, width, height)

        }

    }

    static async load(url, wait = 5) {

        let response = await fetch(url)

        let code = await response.text()

        setTimeout(() => eval(code), 5)

    }

    static loadHashOr(url) {

        PixelBot.load(hash.art || url)

    }

    constructor() {

        initInstance(this, arguments)

    }

    destroy() {

        this.constructor.instances.delete(this)
        instances.delete(this)

        this.destroyed = true

        if (this.onDestroy)
            this.onDestroy()

    }

    set(props) {

        Object.assign(this, props)

        return this

    }

    turnRight() {

        this.angle += 90

        return this

    }

    turnLeft() {

        this.angle += -90

        return this

    }

    turn(toRightOrAngle) {

        if (typeof toRightOrAngle === 'boolean') {

            if (toRightOrAngle) {

                this.turnRight()

            } else {

                this.turnLeft()
            }

        }

        if (typeof toRightOrAngle === 'number') {

            this.angle += toRightOrAngle

        }

        return this

    }

    get orientation() {

        let { angle } = this

        angle = Math.round(angle) % 360

        if (angle <= -180)
            angle += 360

        for (let [key, value] of Object.entries(orientationAngles)) {

            if (angle === value)
                return key

        }

        return null

    }

    set orientation(value) {

        this.angle = orientationAngles[value] || 0

    }

    lookAt({ x, y }) {

        let dx = x - this.x
        let dy = y - this.y

        let a = Math.atan2(-dy, -dx) / 2 / Math.PI

        a *= 4

        a = Math.round(a)

        a += -1 + 4

        a %= 4

        this.orientation = orientations[a]

        return this

    }

    getOrientationVector() {

        let { angle } = this

        angle *= Math.PI / 180

        let x = Math.cos(angle)
        let y = Math.sin(angle)

        return { x, y }

    }

    move() {

        let { x, y, angle, speed } = this

        angle *= Math.PI / 180

        let distance = speed / 60

        x += distance * Math.cos(angle)
        y += distance * Math.sin(angle)

        if (Math.abs(x - Math.round(x)) < 1e-9)
            x = Math.round(x)

        if (Math.abs(y - Math.round(y)) < 1e-9)
            y = Math.round(y)

        if (x >= width)
            x += -width

        if (x < 0)
            x += width

        if (y >= height)
            y += -height

        if (y < 0)
            y += height

        Object.assign(this, { x, y })

        return this

    }

    setPixelColor(color = this.color) {

        let { x, y } = this

        let index = (y|0) * width + (x|0)

        setPixelColor(index, color)

        return this

    }

    update() {

        this.setPixelColor()
        this.move()

    }

}



readonly(PixelBot, {

    version,

    instances,

    orientations,
    orientationVectors,

    init,
    fillCanvas,
    setPixelColor,
    pixelChangeBuffer,
    setColor,
    fillPixel,

    define,
    update,
    namespace,
    exportCode,

    hash,
    room,

    mouse,
    keyboard,

    settings,
    random,
    Color,

    globalize,

})

getter(PixelBot, {

    frame: () => frame,
    ctx: () => ctx,
    canvas: () => canvas,
    instancesCount: () => instancesCount,

})

getterSetter(PixelBot, {

    frameRate: {
        get: () => frameRate,
        set: value => frameRate = value,
    },

    running: {
        get: () => running,
        set: value => running = value,
    },

})
