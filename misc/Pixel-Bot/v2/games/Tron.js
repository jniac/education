
PixelBot.fillCanvas('#111')

class LangtonAnt extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color1 = '#fc0'
        this.color2 = '#0cf'

    }

    update() {

        if (this.pixelColor.r > .5) {

            this.turnLeft()
            this.setPixelColor(this.color2)

        } else {

            this.turnRight()
            this.setPixelColor(this.color1)

        }

        this.move()

    }

}

PixelBot.room.whenReady(() => {

    if (PixelBot.room.isMaster) {

        new LangtonAnt()
        new LangtonAnt().set({

            x: 100,
            y: 200,

        })

    } else {

        new LangtonAnt().set({

            x: 200,
            y: 100,
            color1: '#c0f',
            color2: '#063',

        })

    }

})
