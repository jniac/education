

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

class Painter extends Bot {

    start() {

        this.x = 200
        this.y = 200
        this.count = 0
        this.count2 = 0
        this.color = '#f39'
        this.turnRightNext = true

    }

    update() {

        this.count++

        this.setPixelColor(this.color)

        if (this.count === 100) {

            this.turn(this.turnRightNext)

        }

        if (this.count === 101) {

            this.turn(this.turnRightNext)

            this.count = 0
            this.turnRightNext = !this.turnRightNext

            if (this.count2++ === 50) {

                this.count2 = 0

                this.turnLeft()
                this.move(Math.round(100 * Math.random()))

            }

        }

        this.move()

    }

}

new Painter().set({ color:'#7648ae' })
new Painter().set({ color:'#764282' })




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
new LangtonAnt(200, 100, '#0ff')

Bot.new('Line', '#fc0', .01, n => n % 3 < 2)
new Line('#ffdda2', .1)

export { Bot, LangtonAnt }
