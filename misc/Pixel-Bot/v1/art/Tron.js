
PixelBot.fillCanvas('#111')

let vividColors = ['#69c', '#fc6', '#f6a']
let randomVividColor = () => vividColors[Math.floor(vividColors.length * Math.random())]

let darkGreys = ['#111', '#141414', '#171717', '#191919']

class RectPainter extends PixelBot {

    start() {

        this.color = '#251b7a'
        this.width = 40
        this.height = 80

        this.countX = 0
        this.countY = 0

    }

    update() {

        if (this.countX < this.width) {

            this.move()
            this.countX++

        } else {

            if (this.countY % 2 == 0) {

                this.turnRight()
                this.move()
                this.turnRight()

            } else {

                this.turnLeft()
                this.move()
                this.turnLeft()

            }

            this.countX = 1
            this.countY++

        }

        if (this.countY === this.height) {

            this.destroy()

        } else {

            this.setPixelColor(this.color)

        }

    }

}

class Runner extends PixelBot {

    update() {

        if (Math.random() < 1/60) {

            this.turn(Math.random() < 1/2)

        }

        if (Math.random() < 1/300) {

            new RectPainter().set({

                color: this.color,
                x: this.x,
                y: this.y,
                angle: PixelBot.random({ type:'int', max:4 }) * 90,

            })

        }

        if (Math.random() < 1/4) {

            this.setPixelColor()

        }

        this.move()

    }

}




class Particle extends PixelBot {}

const boom = (x, y, color, n = 12) => {

    for (let i = 0; i < n; i++) {

        new Particle().set({

            x,
            y,
            color,
            angle: 360 * Math.random(),
            lifeMax: 5 + 15 * (Math.random() ** 3),

        })

    }

}

class Tron extends PixelBot {

    start() {

        this.x = PixelBot.random({ type:'int', max:PixelBot.settings.width })
        this.y = PixelBot.random({ type:'int', max:PixelBot.settings.height })
        this.color = randomVividColor()
        this.triggers = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']

    }

    update() {

        let [hue, saturation, luminosity] = this.pixelColor.getHsl()

        if (luminosity > .5) {

            console.log(luminosity)

            this.destroy()

            boom(this.x, this.y, this.color)

        }

        let desiredAngle = null

        for (let [index, key] of this.triggers.entries()) {

            if (PixelBot.keyboard.wasTriggered(key)) {

                desiredAngle = 90 * index

            }

        }

        if (desiredAngle !== null) {

            let change = (this.angle - desiredAngle) % 180

            if (change !== 0) {

                this.angle = desiredAngle

            }

        }

    }

}

const initMaster = () => {

    socket.onmessage = (event) => {

        let eventMessage = tryJson(event.data)
        let [type] = eventMessage.type.split(':')

        if (type === 'update') {

            let { data } = eventMessage
            let { x, y, r, g, b } = data

            PixelBot.setDefferedPixelColor(x, y, r, g, b)

        }

    }

    setInterval(() => {

        socket.send(JSON.stringify({ type:'info:@broadcast', data:`hello from master ${Date.now()}` }))

    }, 10000)

    PixelBot.onUpdateCallbackSet.add(() => {

        let map = PixelBot.frameChangeBufferMap

        let index = 0
        let data = new Uint8Array(map.size * 6)

        for (let [pixelIndex, color] of map.entries()) {

            data[index + 0] = pixelIndex >> 16
            data[index + 1] = pixelIndex >> 8 & 0xff
            data[index + 2] = pixelIndex & 0xff

            data[index + 3] = color >> 16
            data[index + 4] = color >> 8 & 0xff
            data[index + 5] = color & 0xff

            index += 6

        }

        socket.send(JSON.stringify({ type:'update:@broadcast', data:[...data] }))

    })

    for (let i = 0; i < 3; i++) {

        new Runner().set({

            color: darkGreys[i % darkGreys.length],

        })

    }

    Tron.prototype.onUpdate = function() {

        this.setPixelColor()
        this.move()

    }

    new Tron()

    PixelBot.canvas.onclick = () => {

        new Tron().set({

            x: PixelBot.mouse.x,
            y: PixelBot.mouse.y,
            color: randomVividColor(),

        })

    }

}

const initSlave = () => {

    socket.onmessage = (event) => {

        let eventMessage = tryJson(event.data)
        let [type] = eventMessage.type.split(':')

        if (type === 'update') {

            let { data } = eventMessage

            for (let index = 0, length = data.length; index < length; index += 6) {

                let pixelIndex = (data[index + 0] << 16) + (data[index + 1] << 8) + data[index + 2]

                let x = pixelIndex % PixelBot.settings.width
                let y = Math.floor(pixelIndex / PixelBot.settings.width)
                let r = data[index + 3], g = data[index + 4], b = data[index + 5]

                PixelBot.setPixelColor(x, y, r, g, b)

            }

        }

    }

    Tron.prototype.onUpdate = function() {

        this.move()

        let { x, y } = this
        let { r255:r, g255:g, b255:b } = PixelBot.Color.ensure(this.color)

        socket.send(JSON.stringify({ type:'update:@master', data:{ x, y, r, g, b } }))

    }

    new Tron()

}
