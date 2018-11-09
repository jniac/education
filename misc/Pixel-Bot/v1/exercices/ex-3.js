
PixelBot.fillCanvas('#111')

let colors = ['#69c', '#fc6', '#f6a']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]

class Branch extends PixelBot {

    start() {

        this.x = 150
        this.y = 300
        this.angle = -90
        this.color = randomColor()

    }

    update() {

        if (this.updateCount > 10 && PixelBot.mouse.wasTriggered()) {

            this.split()

        }

        this.speed *= .99

        this.setPixelColor()
        this.move()

    }

    split() {

        this.destroy()

        let longLifeIndex = Math.floor(Math.random() * 12)

        for (let i = 0; i < 12; i++) {

            let lifeMax = 1000 / Branch.instances.size

            if (i == longLifeIndex) {

                lifeMax = Math.random() * 100 + 300

            }

            new Branch().set({

                x: this.x,
                y: this.y,
                angle: 360 * i / 12,
                lifeMax: lifeMax,

            })

        }

    }

}

new Branch()
