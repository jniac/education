
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

class Tracer extends PixelBot {

    start() {

        this.turnChance = 1/300
        this.count = Infinity

    }

    update() {

        if (Math.random() < 1/1000) {

            new RectPainter().set({
                x: this.x,
                y: this.y,
                color: this.color,
                width: 12,
                height: 12,
                paintChance: 1,
                angle: this.angle,
            })

        }

        if (Math.random() < 1/200) {

            new RectPainter().set({
                x: this.x,
                y: this.y,
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

        if (this.pixelColor.hexString !== bgColor) {

            this.count = 1

        }

        if (this.count === 0) {

            this.turn(Math.random() < 1/2)

        }

        this.count--

        if (Math.random() < 1) {

            this.setPixelColor()

        }

        this.move()

    }

}

new Tracer().set({
    y: 100,
    color: '#106dd4'
})

new Tracer().set({
    y: 105,
    color: '#103dc4'
})

new Tracer().set({
    y: 110,
    color: '#fc0'
})

new Tracer().set({
    x: 150,
    angle: 90,
    color: '#10d4c5',
})
