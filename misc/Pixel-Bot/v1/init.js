
import PixelBot from './pixel-bot/PixelBot.js'
import { Color } from './pixel-bot/Color.js'
import settings from './pixel-bot/settings.js'

let { width, height } = settings

let canvasPixelBot = document.querySelector('canvas.pixel-bot')

canvasPixelBot.width = width
canvasPixelBot.height = height

let canvasGrid = document.querySelector('canvas.grid')

canvasGrid.width = width
canvasGrid.height = height
canvasGrid.style.display = 'none'

let ctx = canvasGrid.getContext('2d')


for (let y = 0; y < height; y++) {

    for (let x = 0; x < width; x++) {

        ctx.fillStyle = (x + y) % 2 ? '#0002' : '#fff2'

        ctx.fillRect(x, y, 1, 1)

    }

}

let canvasContainer = document.querySelector('.canvas-container')

let updateLayout = () => {

    // NOTE: this is not homotetic

    let h = canvasContainer.offsetHeight

    canvasContainer.style.width = `${h}px`
    canvasPixelBot.style.width = `${h}px`
    canvasPixelBot.style.height = `${h}px`
    canvasGrid.style.width = `${h}px`
    canvasGrid.style.height = `${h}px`

}

updateLayout()

window.addEventListener('resize', () => updateLayout())



window.addEventListener('keydown', event => {

    if (event.code === 'Space') {

        PixelBot.running = !PixelBot.running

    } else if (event.code === 'KeyG') {

        canvasGrid.style.display = canvasGrid.style.display === 'none' ? '' : 'none'

    } else {

        // console.log(event.code)

    }

})

const updateUlSampling = () => {

    for (let li of document.querySelectorAll('.frameRate ul li')) {

        li.classList.toggle('selected', li.textContent === `x${PixelBot.frameRate}`)

    }

}

setTimeout(updateUlSampling, 100)

const updateFrameCount = () => {

    for (let element of document.querySelectorAll('.frameCount .count div')) {

        let number = PixelBot.frame.toString()
        let heading = '0'.repeat(7 - number.length)

        element.querySelector('.light').textContent = heading
        element.querySelector('.plain').textContent = number

    }

}

setInterval(updateFrameCount, 100)

document.querySelector('.frameRate ul').onclick = event => {

    PixelBot.frameRate = Number(event.target.textContent.slice(1))

    updateUlSampling()

}

Object.assign(window, {
    PixelBot,
    settings,
    Color,
})
