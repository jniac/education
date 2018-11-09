
PixelBot.fillCanvas('#111')

PixelBot.setInstruction('cliquer pour faire apparaître une spirale')

let colors = ['#99f', '#e99968', '#88cdf6']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]

class Spiral extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.count = 0
        this.turnOn = 1
        this.color = '#99f'
        this.turnToRight = true

    }

    update() {

        if (this.count === this.turnOn) {

            this.turn(this.turnToRight)
            this.count = 0
            this.turnOn += this.inverted ? -1 : 1

        }

        if (this.inverted && this.turnOn === 0) {

            this.destroy()

        }

        this.count++

        this.setPixelColor()
        this.move()

    }

    onDestroy() {

        if (this.inverted !== true) {

            new Spiral().set({

                color: this.color,
                x: this.x,
                y: this.y,
                angle: this.angle,
                turnToRight: !this.turnToRight,
                inverted: !this.inverted,
                turnOn: Math.round(10 + this.turnOn * 2 * Math.random()),

            })

        }

    }

}

// new Spiral()

PixelBot.canvas.onclick = (event) => {

    let color = event.shiftKey ? '#111' : randomColor()

    new Spiral().set({

        color,
        turnToRight: Math.random() < .5,
        x: PixelBot.mouse.x,
        y: PixelBot.mouse.y,
        lifeMax: 200 + 200 * Math.random(),

    })

}
