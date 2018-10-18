
import Bot from './bots/Bot.js'
import settings from './bots/settings.js'

let { width, height } = settings

let canvasPixelBot = document.querySelector('canvas.pixel-bot')

canvasPixelBot.width = width
canvasPixelBot.height = height
canvasPixelBot.style.width = `${width * settings.canvasScaleRatio}px`
canvasPixelBot.style.height = `${height * settings.canvasScaleRatio}px`

let canvasGrid = document.querySelector('canvas.grid')

canvasGrid.width = width
canvasGrid.height = height
canvasGrid.style.width = `${width * settings.canvasScaleRatio}px`
canvasGrid.style.height = `${height * settings.canvasScaleRatio}px`
canvasGrid.style.display = 'none'

let ctx = canvasGrid.getContext('2d')


for (let y = 0; y < height; y++) {

    for (let x = 0; x < width; x++) {

        ctx.fillStyle = (x + y) % 2 ? '#0002' : '#fff2'

        ctx.fillRect(x, y, 1, 1)

    }

}

let canvasContainer = document.querySelector('.canvas-container')
canvasContainer.style.width = `${width * settings.canvasScaleRatio}px`
canvasContainer.style.height = `${height * settings.canvasScaleRatio}px`

window.addEventListener('keydown', event => {

    if (event.code === 'Space') {

        Bot.running = !Bot.running

    } else if (event.code === 'KeyG') {

        canvasGrid.style.display = canvasGrid.style.display === 'none' ? '' : 'none'

    } else {

        console.log(event.code)

    }

})

let updateUlSampling = () => {

    for (let li of document.querySelectorAll('ul.sampling li')) {

        li.classList.toggle('selected', li.textContent === `x${Bot.sampling}`)

    }

}

setTimeout(updateUlSampling, 100)

document.querySelector('ul.sampling').onclick = event => {

    Bot.sampling = Number(event.target.textContent.slice(1))

    updateUlSampling()

}

Object.assign(window, {
    Bot,
    settings,
})
