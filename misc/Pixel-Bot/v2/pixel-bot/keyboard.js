
import PixelBot from './PixelBot.js'

let down = new Map()

const isDown = key => down.has(key)
const wasTriggered = key => down.get(key) === PixelBot.frame

const init = () => {

    window.addEventListener('keydown', (event) => {

        if (down.has(event.key) === false) {

            down.set(event.key, PixelBot.frame)

        }

    })

    window.addEventListener('keyup', (event) => {

        down.delete(event.key)

    })

}

export default {

    down,
    isDown,
    wasTriggered,
    init,

}
