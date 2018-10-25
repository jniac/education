
let colors = ['#036', '#c06', 'white']

class Tracer extends PixelBot {

    start() {

        this.x = PixelBot.settings.width / 2
        this.y = PixelBot.settings.height / 2
        this.color = new PixelBot.Color('#036')
        this.angle = -31

    }

    update() {

        // if (Math.random() < 1 / 100) {
        //
        //     this.turn(PixelBot.random(-90, 90))
        //     let color = PixelBot.random(colors)
        //     this.set({ color })
        //
        // }

        this.color.r = Math.sin(this.updateCount / 100) * .5 + .5

        let { x, y, color } = this

        new Hair().set({ x, y, color, angle:this.angle + 90 })
        new Hair().set({ x, y, color, angle:this.angle - 90 })

        this.setPixelColor()

        this.move()

    }

}

class Hair extends PixelBot {

    start() {

        this.lifeMax = 500

    }

    update() {

        this.setPixelColor()
        this.move()

    }

}

new Tracer()
