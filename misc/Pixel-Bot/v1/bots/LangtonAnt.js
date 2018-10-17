
import Bot from './Bot.js'

export default class LangtonAnt extends Bot {

    start(x, y, color) {

        this.x = x
        this.y = y
        this.color = color

    }

    update() {

        if (this.pixelColor.r > .5) {

            this.turnLeft()
            this.setPixelColor('#00f')

        } else {

            this.turnRight()
            this.setPixelColor('#fff')

        }

        this.move()

    }

}
