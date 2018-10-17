
import Bot from './bots/Bot.js'

window.addEventListener('keydown', event => {

    if (event.code === 'Space') {

        Bot.running = !Bot.running

    }

})
