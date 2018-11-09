
PixelBot.fillCanvas('#111')

let colors = ['#69c', '#fc6', '#f6a']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]

class Tron extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color = randomColor()

    }

    update() {

        let [hue, saturation, luminosity] = this.pixelColor.getHsl()

        if (luminosity > .1) {

            // crash

        }

        let desiredAngle = null

        if (PixelBot.keyboard.wasTriggered('ArrowUp')) {

            desiredAngle = -90

        }

        if (PixelBot.keyboard.wasTriggered('ArrowDown')) {

            desiredAngle = 90

        }

        if (PixelBot.keyboard.wasTriggered('ArrowRight')) {

            desiredAngle = 0

        }

        if (PixelBot.keyboard.wasTriggered('ArrowLeft')) {

            desiredAngle = 180

        }

        if (desiredAngle !== null) {

            let change = (this.angle - desiredAngle) % 180

            if (change !== 0) {

                this.angle = desiredAngle

            }

        }

        this.setPixelColor()
        this.move()

    }

}

new Tron()
