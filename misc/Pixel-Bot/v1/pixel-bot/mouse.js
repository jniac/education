
import PixelBot from './PixelBot.js'
import settings from './settings.js'

let downFrame = -1
let upFrame = -1
let mouse = { x:0, y:0 }

const isDown = () => downFrame > upFrame
const wasTriggered = () => downFrame === PixelBot.frame

const init = (canvas) => {

    canvas.addEventListener('mousemove', (event) => {

        let { x, y } = event
        let r = canvas.getBoundingClientRect()

        x += -r.x
        y += -r.y

        x *= settings.width / r.width
        y *= settings.height / r.height

        mouse.x = Math.floor(x)
        mouse.y = Math.floor(y)

    })

    canvas.addEventListener('mousedown', (event) => {

        mouse.shiftKey = event.shiftKey
        downFrame = PixelBot.frame

    })

    canvas.addEventListener('mouseup', (event) => {

        upFrame = PixelBot.frame

    })

}

Object.assign(mouse, {

    isDown,
    wasTriggered,
    init,

})

export default mouse
