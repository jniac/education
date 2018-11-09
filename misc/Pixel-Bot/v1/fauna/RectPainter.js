
PixelBot.fillCanvas('#feb')
PixelBot.frameRate = 10

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

new RectPainter()

new RectPainter().set({

    x: 75,
    y: 75,
    angle: Math.random() * 360,
})

new RectPainter().set({

    x: 75,
    y: 75,
    color: '#c61b57',
    height: 40,
    angle: 90 * PixelBot.random({ type:'int', max:4 }),
})

for (let i = 0; i < 10; i++) {

    if (Math.random() < .75) {

        let size = PixelBot.random({ type:'int', min:10, max:20 })

        new RectPainter().set({

            x: PixelBot.random(PixelBot.settings.width),
            y: PixelBot.random(PixelBot.settings.height),
            color: '#c61b57',
            width: size,
            height: size,
            angle: 90 * PixelBot.random({ type:'int', max:4 }),
        })

    } else {

        new RectPainter().set({

            x: PixelBot.random(PixelBot.settings.width),
            y: PixelBot.random(PixelBot.settings.height),
            angle: PixelBot.random(360),

        })

    }

}
