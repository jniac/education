
let bgColor = '#ddeeff'

PixelBot.fillCanvas(bgColor)

class RectPainter extends PixelBot {

    start() {

        this.color = '#ec4332'
        this.width = 100
        this.height = 50
        this.x = 150
        this.y = 150
        this.paintChance = 3 / 5

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

            if (Math.random() < this.paintChance) {

                this.setPixelColor(this.color)

            }

        }

    }

}

class EdgeBot extends PixelBot {

    start() {

        this.turnChance = 1/600
        this.count = Infinity
        this.previousColor = bgColor

    }

    update() {

        if (Math.random() < 1/2000) {

            new RectPainter().set({
                x: this.x,
                y: this.y,
                color: this.color,
                width: 12 * 2,
                height: 12 * 2,
                paintChance: 30/31,
                angle: this.angle,
            })

        }

        if (Math.random() < 1/200) {

            let v = this.getOrientationVector()

            new RectPainter().set({
                x: this.x - v.y * 2,
                y: this.y + v.x * 2,
                color: this.color,
                width: 4,
                height: 4,
                paintChance: 1,
                angle: this.angle,
            })

        }

        if (Math.random() < this.turnChance) {

            this.turn(Math.random() < 1/2)

        }

        if (this.pixelColor.hexString !== this.previousColor) {

            this.count = 1

        }

        this.previousColor = this.pixelColor.hexString

        if (this.count === 0) {

            this.turn(Math.random() < 1/2)

        }

        this.count--

        if (Math.random() < 15/16) {

            this.setPixelColor()

        }

        this.move()

    }

}

new EdgeBot().set({
    y: 100,
    turnChance: 0,
    color: '#106dd4'
})

PixelBot.fillCanvas('#fc0', 100, 50, 100, 100)

new EdgeBot().set({
    y: 105,
    color: '#103dc4'
})

new EdgeBot().set({
    y: 110,
    color: '#fc0'
})

new EdgeBot().set({
    x: 150,
    angle: 90,
    color: '#10d4c5',
})
