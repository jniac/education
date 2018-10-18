

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

        this.mode = 'roam'

        this.unitMax = 60
        this.lineMax = 30

        this.unitCount = 0
        this.lineCount = 0
        this.color = '#f39'
        this.turnCount = 0

    }

    sequenceTurn() {

        let n = this.turnCount % 4

        this.turn(n === 0 || n === 3)

        this.turnCount++

    }

    paint() {

        if (this.unitCount === 0) {

            this.sequenceTurn()

        }

        this.unitCount++

        if (this.unitCount === this.unitMax) {

            this.sequenceTurn()

            this.unitCount = 0
            this.lineCount++

        }

        if (this.lineCount === this.lineMax) {

            this.unitCount = 0
            this.lineCount = 0

            this.mode = 'roam'

        }

    }

    update() {

        // if (this.updateCount % 2) {
        if (Math.random() > .5) {

            this.setPixelColor(this.color)

        }

        if (this.mode === 'roam') {

            if (Math.random() > .95) {

                this.turn(Math.random() > .5)

            }

            if (Math.random() > .999) {

                this.mode = 'paint'

            }

        } else if (this.mode === 'paint') {

            this.paint()

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
new LangtonAnt(150, 150, '#09f')
new LangtonAnt(100, 100, '#096')
new LangtonAnt(100, 100, '#03f')
new LangtonAnt(200, 100, '#0ff')
new LangtonAnt(200, 100, '#0ff')

Bot.new('Line', '#fc0', .01, n => n % 3 < 2)
new Line('#ffdda2', .1)

new Painter().set({ color:'#ffbf9d' })
// new Painter().set({ color:'#764282' })
new Painter().set({ color:'#fc0' })

Bot.sampling = 100

export { Bot, LangtonAnt }
