
let DN = (max) => Math.ceil(Math.random() * max)

let colors = ['#342ba0', '#ff81cc', '#b8d8ee', '#342ba0', '#342ba0', '#ffd000']

let getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

class Stupid extends PixelBot {

    start() {

        this.color = getRandomColor()
        this.lifeMax = Infinity
        this.spawnChance = 1 / 100

    }

    update() {

        if (DN(8) > 1) {

            this.setPixelColor(this.color)

        }

        if (Math.random() < this.spawnChance && PixelBot.instances.size < 200) {

            let v = this.getOrientationVector()
            let color = getRandomColor()

            let n = DN(50)
            let lifeMax = DN(80)

            for (let i = 0; i < n; i++) {

                new Stupid().set({

                    x: this.x - v.x * i,
                    y: this.y - v.y * i,
                    color,
                    lifeMax: lifeMax + DN(10),
                    spawnChance: 0,
                    angle: this.angle,

                }).turnLeft()

            }

        }

        this.move()

        if (DN(500) == 1) {

            this.turn(Math.random() < .5)

        }

        if (this.updateCount > this.lifeMax) {

            this.destroy()

        }

    }

}

new Stupid().set({ x:100, y:100 })
new Stupid().set({ x:200, y:200 })
new Stupid().set({ x:100, y:100 })
new Stupid().set({ x:200, y:200 })

Object.assign(window, { Stupid })
