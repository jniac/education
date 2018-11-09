
PixelBot.fillCanvas('#111')
PixelBot.setInstruction('clique pour respawn')

let vividColors = ['#69c', '#fc6', '#f6a']
let randomVividColor = () => vividColors[Math.floor(vividColors.length * Math.random())]

let darkGreys = ['#111', '#191919', '#202020', '#242424']

class RectPainter extends PixelBot {

    start() {

        this.color = '#251b7a'
        this.width = 40
        this.height = 80

        this.countX = 0
        this.countY = 0

    }

    update() {

        if (this.countX < this.width) {

            this.move()
            this.countX++

        } else {

            if (this.countY % 2 == 0) {

                this.turnRight()
                this.move()
                this.turnRight()

            } else {

                this.turnLeft()
                this.move()
                this.turnLeft()

            }

            this.countX = 1
            this.countY++

        }

        if (this.countY === this.height) {

            this.destroy()

        } else {

            this.setPixelColor(this.color)

        }

    }

}

class Runner extends PixelBot {

    update() {

        if (Math.random() < 1/60) {

            this.turn(Math.random() < 1/2)

        }

        if (Math.random() < 1/300) {

            new RectPainter().set({

                color: this.color,
                x: this.x,
                y: this.y,
                angle: PixelBot.random(360),

            })

        }

        this.move()

        if (Math.random() < 1/4) {

            this.setPixelColor()

        }

    }

}

for (let i = 0; i < 3; i++) {

    new Runner().set({

        color: darkGreys[i % darkGreys.length],

    })

}

class Particle extends PixelBot {}

const boom = (x, y, color, n = 12) => {

    for (let i = 0; i < n; i++) {

        new Particle().set({

            x,
            y,
            color,
            angle: 360 * Math.random(),
            lifeMax: 5 + 15 * (Math.random() ** 3),

        })

    }

}

class Tron extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color = randomVividColor()

    }

    update() {

        let [hue, saturation, luminosity] = this.pixelColor.getHsl()

        if (luminosity > .5) {

            this.destroy()

            boom(this.x, this.y, this.color)

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

PixelBot.canvas.onclick = () => {

    new Tron().set({

        x: PixelBot.mouse.x,
        y: PixelBot.mouse.y,
        color: randomVividColor(),

    })

}



class TronBot extends PixelBot {



}

new Tron()
