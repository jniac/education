
class Mouse extends PixelBot {

    start() {

        this.color = '#eeeeee'

    }

    update() {

        this.x = PixelBot.mouse.x
        this.y = PixelBot.mouse.y

        this.setPixelColor()

    }

}

new Mouse()



let particles = []

class Particle extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.angle = 360 * Math.random()

        this.initSpeed = 60
        this.speed = 60

        particles.push(this)

    }

    update() {

        this.speed *= 0.99

        this.setPixelColor()
        this.move()

    }

    boom(numberOfNewParticles = 5) {

        this.destroy()

        for (let i = 0; i < numberOfNewParticles; i++) {

            new Particle().set({

                x: this.x,
                y: this.y,
                initSpeed: this.initSpeed / 2,
                speed: this.initSpeed / 2,

            })

        }

    }

}

new Particle()

window.onclick = () => {

    let particles2 = [...particles]

    for (let particle of particles2) {

        if (particle.destroyed === false) {

            particle.boom()

        }

    }

}
