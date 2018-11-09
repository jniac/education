
PixelBot.fillCanvas('#111')

PixelBot.setInstruction('cliquer pour voir un peu')

class Mouse extends PixelBot {

    start() {

        this.color = '#222'

    }

    update() {

        this.x = PixelBot.mouse.x
        this.y = PixelBot.mouse.y

        this.setPixelColor()

    }

}

new Mouse()



let colors = ['#69c', '#fc6', '#f6a']
let randomColor = () => colors[Math.floor(colors.length * Math.random())]
let randomInRange = (min, max) => min + (max - min) * Math.random()

class Herb extends PixelBot {

    start() {

        this.color = randomColor()
        this.angle = -90
        this.lifeMax = randomInRange(5, 8)

    }

}

class Branch extends PixelBot {

    start() {

        this.x = 150
        this.y = 300
        this.angle = -90
        this.lifeMax = 128
        this.color = randomColor()

    }

    update() {

        if (this.updateCount >= this.lifeMax) {

            this.split()

        }

        this.setPixelColor()
        this.move()

    }

    split() {

        this.destroy()

        new Branch().set({

            x: this.x,
            y: this.y,
            angle: this.angle + 20,
            lifeMax: this.lifeMax / 2,
            color: this.color,

        })

        new Branch().set({

            x: this.x,
            y: this.y,
            angle: this.angle - 20,
            lifeMax: this.lifeMax / 2,
            color: this.color,

        })

    }

}

new Branch()

window.onclick = () => {

    let color = randomColor()

    new Branch().set({

        x: PixelBot.mouse.x,
        y: PixelBot.mouse.y,
        color: color,

    })

    for (let i = 0; i < 8; i++) {

        new Herb().set({

            x: PixelBot.mouse.x + randomInRange(-50, 50),
            y: PixelBot.mouse.y + randomInRange(-3, 3),
            color: color,

        })

    }

}
