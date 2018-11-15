
PixelBot.fillCanvas('#111')

class Particle extends PixelBot {

}

const boom = (x, y, color, n = 12) => {

    for (let i = 0; i < n; i++) {

        new Particle().set({

            x: x,
            y: y,
            color: color,
            angle: 360 * Math.random(),
            lifeMax: 5 + 15 * (Math.random() ** 3),

        })

    }

}

PixelBot.canvas.onclick = () => {

    boom(PixelBot.mouse.x, PixelBot.mouse.y, '#f9c', 30)

}
