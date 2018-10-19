
let DN = (max) => Math.ceil(Math.random() * max)

let colors = ['#342ba0', '#ff81cc', '#b8d8ee', '#ffd000']

let getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

class Stupid extends PixelBot {

    start() {

        this.color = getRandomColor()
        this.lifeMax = Infinity

    }

    update() {

        this.setPixelColor(this.color)

        if (DN(100) === 1 && PixelBot.instances.size < 200) {

            new Stupid().set({

                x: this.x,
                y: this.y,
                lifeMax: 100,
                orientation: this.orientation,

            }).turnLeft()

        }

        this.move()

        if (DN(100) == 1) {

            this.turnLeft()

        }

        if (this.updateCount > this.lifeMax) {

            this.destroy()

        }

    }

}

new Stupid().set({ x:100, y:100 })
new Stupid().set({ x:200, y:200 })

Object.assign(window, { Stupid })
