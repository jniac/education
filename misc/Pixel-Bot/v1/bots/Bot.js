
import namespace from './namespace.js'
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

let running = true
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

        if (running) {

            update()

        }

        requestAnimationFrame(loop)

    } catch (e) {

        console.log('oups')

        throw e

    }

}

init()
loop()

let orientations = 'NESW'



let define = (name, definition) => {

    let { constructor, ...prototype } = definition

    if (constructor !== Object.prototype.constructor) {

        console.warn(`Bot.define() Error, constructor must NOT be defined, use "start" instead`)

    }

    constructor = (new Function('initInstance', `return function ${name} (){ initInstance(this, arguments) }`))(initInstance)

    Object.setPrototypeOf(constructor.prototype, Bot.prototype)

    Object.assign(constructor.prototype, prototype)

    register(constructor)

    return constructor

}

let register = (constructor) => {

    let { name } = constructor

    constructor.instances = new Set()
    constructor.instancesCount = 0

    namespace.add(name, constructor)

}

let initInstance = (instance, args) => {

    instance.pixelColor = new Color()
    instance.x = 0
    instance.y = 0
    instance.orientation = 'E'
    instance.updateCount = 0

    if (!instance.constructor.instances) {

        register(instance.constructor)

    }

    instance.instanceId = instance.constructor.instancesCount++
    instance.constructor.instances.add(instance)
    instance.identifier = instance.constructor.name + '#' + instance.instanceId

    bots.add(instance)

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

        let str = `class ${name} extends Bot {\n\n${methods}\n\n}`

        definitions.push(str)

    }

    return definitions.join('\n\n')

}


export default class Bot {

    static get init() { return init }

    static get update() { return update }

    static get define() { return define }

    static get namespace() { return namespace }

    static get exportCode() { return exportCode }

    static get sampling() { return sampling }
    static set sampling(value) { sampling = value }

    static get running() { return running }
    static set running(value) { running = value }

    static get frame() { return frame }

    static new(name, ...args) {

        let constructor = namespace.get(name)

        if (constructor) {

            return new constructor(...args)

        } else {

            console.warn(`Bot.new() Error, can not find definition for ${name}`)

        }

    }

    constructor() {

        initInstance(this, arguments)

    }

    set(props) {

        Object.assign(this, props)

        return this

    }

    turnRight() {

        let index = orientations.indexOf(this.orientation)

        index++

        if (index > orientations.length - 1) {

            index = 0

        }

        this.orientation = orientations[index]

        return this

    }

    turnLeft() {

        let index = orientations.indexOf(this.orientation)

        index--

        if (index < 0) {

            index = orientations.length - 1

        }

        this.orientation = orientations[index]

        return this

    }

    turn(toRight) {

        if (toRight) {

            this.turnRight()

        } else {

            this.turnLeft()

        }

        return this

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

        return this

    }

    setPixelColor(color) {

        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, 1, 1)
        
        return this

    }

}
