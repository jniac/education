
class Mouse extends PixelBot {

    update() {

        this.x = PixelBot.mouse.x
        this.y = PixelBot.mouse.y

        this.setPixelColor('red')

    }

}

class Random extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color = '#033'
        this.turnChance = 1 / 3
        this.paintChance = 1
        this.spireChance = 1 / 10000

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

            this.setPixelColor(this.color)

        }

        this.move()

    }

}

class Spire extends PixelBot {

    start() {

        this.startX = 150
        this.startY = 150
        this.color = '#fd6'
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
