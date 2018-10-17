

import Bot from './bots/Bot.js'
export { Color } from './bots/color.js'




class LangtonAnt extends Bot {

    start(x, y, color) {

        this.x = x
        this.y = y
        this.color = color

    }

    update() {

        if (this.pixelColor.r > .5) {

            this.turnLeft()
            this.setPixelColor(this.color)

        } else {

            this.turnRight()
            this.setPixelColor('#fc0')

        }

        this.move()

    }

}




let Line = Bot.define('Line', {

    start(color = '#09f', threshold = .01, painTest = () => true) {

        this.x = 150
        this.y = 150
        this.color = color
        this.threshold = threshold
        this.painTest = painTest

    },

    update() {

        if (this.painTest(this.updateCount)) {

            this.setPixelColor(this.color)

            if (Math.random() > 1 - this.threshold) {

                this.turnLeft()

            }

        }

        this.move()

    },

})

new LangtonAnt(150, 150, '#09f')
new LangtonAnt(100, 100, '#03f')

Bot.new('Line', '#fc0', .01, n => n % 3 < 2)
new Line('#ffdda2', .1)

export { Bot, LangtonAnt }
