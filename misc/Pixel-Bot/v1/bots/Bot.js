
import settings from './settings.js'
import { Color } from './color.js'

let { width, height } = settings

let bots = new Set()

let canvas, ctx

let init = () => {

    canvas = document.querySelector('canvas')

    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width * settings.canvasScaleRatio}px`
    canvas.style.height = `${height * settings.canvasScaleRatio}px`

    ctx = canvas.getContext('2d')

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)

}

let sampling = 1
let frame = 0

let update = () => {

    let sample = 0

    while (sample++ < sampling) {

        for (let bot of bots) {

            let { updateRate = 1 } = bot

            while (updateRate-- > 0) {

                let { x, y } = bot

                let [r, g, b] = ctx.getImageData(x, y, 1, 1).data

                bot.pixelColor.r = r / 0xff
                bot.pixelColor.g = g / 0xff
                bot.pixelColor.b = b / 0xff

                bot.update()

                bot.updateCount++

            }

        }

        frame++

    }

}

let loop = () => {

    try {

        update()

        requestAnimationFrame(loop)

    } catch (e) {

        console.log('oups')

        throw e

    }

}

init()
loop()

let orientations = 'NESW'



let namespace = {}

let define = (name, definition) => {

    let { constructor, ...prototype } = definition

    if (constructor !== Object.prototype.constructor) {

        console.warn(`Bot.define() Error, constructor must NOT be defined, use "start" instead`)

    }

    constructor = (new Function('newInstance', `return function ${name} (){ newInstance(this, arguments) }`))(newInstance)

    Object.setPrototypeOf(constructor.prototype, Bot.prototype)

    Object.assign(constructor.prototype, prototype)

    namespace[name] = constructor

    return constructor

}

let newInstance = (instance, args) => {

    instance.pixelColor = new Color()
    instance.x = 0
    instance.y = 0
    instance.orientation = 'E'
    instance.updateCount = 0

    if (!instance.constructor.instances) {

        instance.constructor.instances = new Set()
        instance.constructor.instancesCount = 0

    }

    instance.instanceId = instance.constructor.instancesCount++
    instance.constructor.instances.add(instance)
    instance.identifier = instance.constructor.name + '#' + instance.instanceId

    bots.add(instance)

    if (instance.start)
        instance.start(...args)

}


export default class Bot {

    static get init() { return init }

    static get update() { return update }

    static get define() { return define }

    static get namespace() { return namespace }

    static get sampling() { return sampling }
    static set sampling(value) { sampling = value }

    static new(name, ...args) {

        let constructor = namespace[name]

        if (constructor) {

            return new constructor(...args)

        }

    }

    constructor() {

        newInstance(this, arguments)

    }

    turnRight() {

        let index = orientations.indexOf(this.orientation)

        index++

        if (index > orientations.length - 1) {

            index = 0

        }

        this.orientation = orientations[index]

    }

    turnLeft() {

        let index = orientations.indexOf(this.orientation)

        index--

        if (index < 0) {

            index = orientations.length - 1

        }

        this.orientation = orientations[index]

    }

    move(distance = 1) {

        let { x, y, orientation } = this

        if (orientation === 'N') {

            y += -distance

        } else if (orientation === 'E') {

            x += distance

        } else if (orientation === 'S') {

            y += distance

        } else if (orientation === 'W') {

            x += -distance

        }

        if (x >= width)
            x += -width

        if (x < 0)
            x += width

        if (y >= height)
            y += -height

        if (y < 0)
            y += height

        Object.assign(this, { x, y })

    }

    setPixelColor(color) {

        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, 1, 1)

    }

}
