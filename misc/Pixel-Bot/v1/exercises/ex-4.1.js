
PixelBot.fillCanvas('#111')
PixelBot.setInstruction('clique pour respawn')

let vividColors = ['#69c', '#fc6', '#f6a']
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
                angle: PixelBot.random(360),

            })

        }

        this.move()

        if (Math.random() < 1/4) {

            this.setPixelColor()

        }

    }

}

for (let i = 0; i < 10; i++) {

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

        this.x = PixelBot.random({ type:'int', max:PixelBot.settings.width })
        this.y = PixelBot.random({ type:'int', max:PixelBot.settings.height })
        this.color = randomVividColor()
        this.triggers = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']

    }

    update() {

        let [hue, saturation, luminosity] = this.pixelColor.getHsl()

        if (luminosity > .5) {

            this.destroy()

            boom(this.x, this.y, this.color)

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

    onDestroy() {

        setTimeout(() => {

            new Tron().set({

                triggers: this.triggers,
                color: this.color,

            })

        }, 5000)

    }

}

PixelBot.canvas.onclick = () => {

    new Tron().set({

        x: PixelBot.mouse.x,
        y: PixelBot.mouse.y,
        color: randomVividColor(),

    })

}



new Tron().set({ color:vividColors[0] })
new Tron().set({ color:vividColors[1], triggers:[...'dsqz'] })
