
import { readonly, getter, globalize } from './utils.js'
import settings from './settings.js'
import PixelBot from './PixelBot.js'
import BufferView from './BufferView.js'

let isConnected = false
let isReady = false
let socket
let socketId
let name
let isMaster
let isSlave
let bufferInAverage
let bufferOutAverage

const HEAD_BYTE_LENGTH =
    + 4     // receiver id
    + 4     // frame

const PAINT_FRAME = 0   // data for the whole frame (ctx.getImageData)
const PAINT_PIXEL = 1
const PAINT_BATCH = 2

const whenReadySet = new Set()
const whenReady = (callback) => {

    if (isReady) {

        callback()

    } else {

        whenReadySet.add(callback)

    }

}

class Average {

    constructor(length = 30) {

        this.array = []

        for (let i = 0; i < length; i++)
            this.array[i] = 0

        this.index = 0
        this.average = 0
        this.sum = 0
        this.length = length

    }

    setNewValue(value) {

        this.sum += value - this.array[this.index]
        this.average = this.sum / this.length
        this.array[this.index++] = value

        if (this.index === this.length)
            this.index = 0

    }

}

const onJson = (json) => {

    let { type } = json

    console.log(json)

    if (type === 'master') {

        isMaster = json.isMaster
        isSlave = !json.isMaster
        isReady = true
        socketId = json.socketId

        console.log(`room:${name} this client is ${isMaster ? 'the master' : 'a slave'}`)

        for (let callback of whenReadySet)
            callback()

        whenReadySet.clear()

    }

    if (type === 'slave-open') {

        let { slaveSocketId } = json

        let { width, height } = settings

        let byteLength =
            + HEAD_BYTE_LENGTH
            + 1                         // paintAction
            + width * height * 4        // image data (width * height * (r + g + b + a))

        let imageData = PixelBot.ctx.getImageData(0, 0, width, height).data

        let data = new Uint8Array(byteLength)
        new DataView(data.buffer).setInt32(0, slaveSocketId)
        data[HEAD_BYTE_LENGTH] = PAINT_FRAME
        data.set(imageData, HEAD_BYTE_LENGTH + 1)

        socket.send(data.buffer)

    }

}

const init = (roomName) => {

    name = roomName

    socket = new WebSocket(`wss://node.josephm.fr/room/${name}:master`)

    socket.binaryType = 'arraybuffer'

    socket.onopen = (event) => {

        isConnected = true

    }

    socket.onclose = (event) => {

        isConnected = false
        isReady = false

        console.log(event)

        PixelBot.running = false

    }

    socket.onmessage = (event) => {

        if (typeof event.data === 'string') {

            let json

            try {

                json = JSON.parse(event.data)

            } catch (e) {

                console.log(`room.socket has received a message: "${event.data}"`)

            }

            onJson(json)

        } else {

            // data is binary

            // tryReceivePixels(event.data)
            receivedBuffers.add(event.data)

        }

    }

    bufferInAverage = new Average()
    bufferOutAverage = new Average()

    window.socket = socket

}

const computeChunkByteLength = size => (

    + 1                     // paint instruction (PAINT_PIXEL, PAINT_BATCH)
    + 3                     // color
    + (size > 1 ? 2 : 0)    // size (for batches)
    + 3 * size              // 3 bytes by index

)

let bufferMaps = []

globalize({ bufferMaps })

const sendPixelChanges = (bufferMap) => {

    bufferMaps.push({ frame:PixelBot.frame, map:new Map(bufferMap) })

    let byteLength = HEAD_BYTE_LENGTH

    for (let [color, indexes] of bufferMap.entries()) {

        byteLength += computeChunkByteLength(indexes.size)

    }

    let buffer = new ArrayBuffer(byteLength)

    let view = new BufferView(buffer, HEAD_BYTE_LENGTH)

    view.headView.setUint16(4, PixelBot.frame)

    for (let [color, indexes] of bufferMap.entries()) {

        let { size } = indexes
        let chunkByteLengthSize = computeChunkByteLength(size)
        let paintAction = size === 1 ? PAINT_PIXEL : PAINT_BATCH

        view.setUint8(paintAction)
        view.setUint24(color)

        if (size > 1) {

            view.setUint16(size)

        }

        for (let index of indexes) {

            view.setUint24(index)

        }

    }

    bufferOutAverage.setNewValue(buffer.byteLength)

    socket.send(buffer)

}

const debugBuffer = (buffer) => {

    let view = new BufferView(buffer, HEAD_BYTE_LENGTH)

    let frame = view.headView.getUint16(4)

    console.log({frame})

    while (view.hasFinished() === false) {

        let paintAction = view.getUint8()

        if (paintAction === PAINT_PIXEL || paintAction === PAINT_BATCH) {

            let color = view.getUint24()

            let size = paintAction === PAINT_PIXEL ? 1 : view.getUint16()

            console.log({color, size})

            for (let i = 0; i < size; i++) {

                let index = view.getUint24()

                console.log({index})

            }

        }

    }

}

const receivedBuffers = new Set()

const paintBuffer = (buffer) => {

    let view = new BufferView(buffer, HEAD_BYTE_LENGTH)

    bufferInAverage.setNewValue(buffer.byteLength)

    while (view.hasFinished() === false) {

        let paintAction = view.getUint8()

        if (paintAction === PAINT_PIXEL || paintAction === PAINT_BATCH) {

            let color = view.getUint24()

            // PixelBot.setColor(color)

            let size = paintAction === PAINT_PIXEL ? 1 : view.getUint16()

            for (let i = 0; i < size; i++) {

                let index = view.getUint24()

                // PixelBot.fillPixel(index)
                PixelBot.setPixelColor(index, color)

            }

        } else if (paintAction === PAINT_FRAME) {

            console.log('PAINT_FRAME')

            let data = new Uint8Array(view.buffer, view.headByteLength + view.offset)
            let { width, height } = settings

            let imageData = PixelBot.ctx.createImageData(width, height)
            imageData.data.set(data)

            PixelBot.ctx.putImageData(imageData, 0, 0)

            break

        }

    }

}

const update = () => {

    for (let buffer of receivedBuffers) {

        try {

            paintBuffer(buffer)

        } catch (e) {

            PixelBot.running = false
            socket.close()

            console.log('receivePixels: oups')
            console.log(e)
            console.log(debugBuffer(buffer))

        }

    }

    receivedBuffers.clear()

}

let room = {}

readonly(room, {

    init,
    sendPixelChanges,
    whenReady,
    update,

})

getter(room, {

    isConnected: () => isConnected,
    isReady: () => isReady,
    isMaster: () => isMaster,
    isSlave: () => isSlave,
    socket: () => socket,
    socketId: () => socketId,
    bufferInAverage: () => bufferInAverage,
    bufferOutAverage: () => bufferOutAverage,

})

export default room
