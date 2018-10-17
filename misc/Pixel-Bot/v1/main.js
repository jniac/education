
import Bot from './bots/Bot.js'
export { Color } from './bots/color.js'

import LangtonAnt from './bots/LangtonAnt.js'

export let ant = new LangtonAnt(150, 150, '#f90')

Bot.define('Line', {

    start(color = '#09f', threshold = .01) {

        this.x = 150
        this.y = 150
        this.color = color
        this.threshold = threshold

    },

    update() {

        this.setPixelColor(this.color)

        if (Math.random() > 1 - this.threshold) {

            this.turnLeft()

        }

        this.move()

    },

})

Bot.new('Line', '#fc0')
Bot.new('Line', 'red', .2)

export { Bot, LangtonAnt }
