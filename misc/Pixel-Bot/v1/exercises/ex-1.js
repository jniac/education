
PixelBot.fillCanvas('#111')

PixelBot.setInstruction('cliquer pour faire apparaître une spirale')

let colors = ['#99f', '#e99968', '#88cdf6']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]

class Spiral extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.deltaAngle = .5
        this.count = 0
        this.turnOn = 1
        this.color = '#99f'
        this.lifeMax = 2000 + 1000 * Math.random()
        this.turnToRight = true

    }

    update() {

        if (this.count === this.turnOn) {

            this.turn(this.turnToRight)
            this.count = 0
            this.turnOn += 1

        }

        this.count++

        this.setPixelColor()
        this.move()

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

    })

}
