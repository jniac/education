
PixelBot.fillCanvas('#111')

let masterColor = '#5672ff'
let vividColors = ['#c8365c', '#eb74a9', '#ff8830']
let randomVividColor = () => vividColors[Math.floor(vividColors.length * Math.random())]

let darkGreys = ['#111', '#141414', '#171717', '#191919']

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
                angle: PixelBot.random({ type:'int', max:4 }) * 90,

            })

        }

        if (Math.random() < 1/4) {

            this.setPixelColor()

        }

        this.move()

    }

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

        this.x = PixelBot.random({ type:'int', max:PixelBot.settings.width })
        this.y = PixelBot.random({ type:'int', max:PixelBot.settings.height })
        this.color = randomVividColor()
        this.triggers = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']

    }

    update() {

        let [hue, saturation, luminosity] = this.pixelColor.getHsl()

        if (luminosity > .5) {

            this.destroy()

            boom(this.x, this.y, this.color, 24)

        }

        let desiredAngle = null

        for (let [index, key] of this.triggers.entries()) {

            if (PixelBot.keyboard.wasTriggered(key)) {

                desiredAngle = 90 * index

            }

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

let player
let playerColor

canvas.onclick = () => {

    let { x, y } = PixelBot.mouse

    player = new Tron().set({ x, y, color:playerColor })

}

const initMaster = () => {

    for (let i = 0; i < 3; i++) {

        new Runner().set({

            color: darkGreys[i % darkGreys.length],

        })

    }

    playerColor = masterColor
    player = new Tron().set({ color:playerColor })

}

const initSlave = () => {

    playerColor = vividColors[PixelBot.room.socketId % vividColors.length]
    player = new Tron().set({ color:playerColor })

}

PixelBot.room.whenReady(() => PixelBot.room.isMaster ? initMaster() : initSlave())
