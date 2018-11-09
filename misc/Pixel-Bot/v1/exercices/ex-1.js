
PixelBot.fillCanvas('#111')

let colors = ['#99f', '#e99968', '#88cdf6', '#111']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]

class Spiral extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.deltaAngle = .5
        this.count = 0
        this.turnOn = 1
        this.color = '#99f'

    }

    update() {

        if (this.count === this.turnOn) {

            this.turnLeft()
            this.count = 0
            this.turnOn += 1

        }

        this.count++

        this.setPixelColor()
        this.move()

    }

}

new Spiral()

PixelBot.canvas.onclick = () => {

    new Spiral().set({

        color: randomColor(),
        x: PixelBot.mouse.x,
        y: PixelBot.mouse.y,

    })

}
