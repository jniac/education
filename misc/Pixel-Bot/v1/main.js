
class LangtonAnt extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color1 = '#fc0'
        this.color2 = '#0cf'

    }

    update() {

        if (this.pixelColor.r < .5) {

            this.turnLeft()
            this.setPixelColor(this.color1)

        } else {

            this.turnRight()
            this.setPixelColor(this.color2)

        }

        this.move()

    }

}

new LangtonAnt()
new LangtonAnt().set({

    x: 100,
    y: 200,
    
})
