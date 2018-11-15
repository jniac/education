
class Mouse extends PixelBot {

    update() {

        this.x = PixelBot.mouse.x
        this.y = PixelBot.mouse.y

        this.setPixelColor('red')

    }

}

let globalColor = new PixelBot.Color()

class Random extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color = '#033'
        this.turnChance = 1 / 3
        this.paintChance = 1
        this.spireChance = 1 / 10000

    }

    set({ color, shiftColor = '#006', ...props }) {

        super.set(props)

        this.color = new PixelBot.Color(color || this.color)
        this.shiftColor = new PixelBot.Color(shiftColor || this.shiftColor)

    }

    update() {

        let r = Math.random()

        if (r < this.turnChance) {

            this.turnLeft()

        } else if (r < 2 * this.turnChance) {

            this.turnRight()

        }

        if (Math.random() < this.spireChance) {

            new Spire().set({

                angle: 2 * Math.PI * Math.random(),
                startX: this.x,
                startY: this.y,
                lifeMax: 200 + 200 * Math.random(),
                radiusGrowth: Math.random(),

            })

        }

        if (Math.random() < this.paintChance) {

            let c = Math.sin(this.updateCount / 100) * .5 + .5

            let { r, g, b } = this.color

            r += this.shiftColor.r * c
            g += this.shiftColor.g * c
            b += this.shiftColor.b * c

            globalColor.setRgb(r, g, b)

            this.setPixelColor(globalColor)

        }

        this.move()

    }

}

class Spire extends PixelBot {

    start() {

        this.startX = 150
        this.startY = 150
        // this.color = '#fd6'
        this.color = new Color().setHsl(.12 + .02 * Math.random(), 1, .6 + .3 * Math.random())
        this.angle = 0
        this.radius = 0
        this.lifeMax = 300
        this.radiusGrowth = 1

    }

    update() {

        this.angle += Math.PI * 2 / 100
        this.radius += this.radiusGrowth / 60

        this.x = Math.round(this.startX + this.radius * Math.cos(this.angle))
        this.y = Math.round(this.startY + this.radius * Math.sin(this.angle))

        this.setPixelColor(this.color)

        if (this.updateCount > this.lifeMax) {

            this.destroy()

        }

    }

}

new Spire()

// reds
new Random().set({ color:'#f00', spireChance:1/5000 })
new Random().set({ color:'#f02', spireChance:1/5000 })
// new Random().set({ color:'#f20', spireChance:1/5000 })

// greens
new Random().set({ spireChance:1/50 })
new Random().set({ spireChance:1/500 })
new Random().set({ spireChance:1/500 })
new Random().set({ color:'#043', spireChance:1/500 })
new Random().set({ color:'#043' })
new Random().set({ color:'#053' })
new Random().set({ color:'#063' })

// blues
new Random().set({ color:'#035' })
new Random().set({ color:'#06c' })
new Random().set({ color:'#03c' })
new Random().set({ color:'#03c' })

new Random().set({ color:'#fd6', turnChance:1/50, paintChance: 1/7 })
// new Random().set({ color:'#fd6', turnChance:1/20, paintChance:1/7, spireChance:1/20 })
