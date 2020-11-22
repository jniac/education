import * as scene from './scene.js'
import * as colors from '../colors.js'
import * as particles from './particles.js'
import * as keyboard from './keyboard.js'
import { distance } from './geom.js'
import { gameover } from '../UI.js'

const div = document.querySelector('div#player')
const divCore = document.querySelector('div#player div.player-core')

const radius = 5
const position = { x:0, y:0 }
const velocity = { x:0, y:0 }

position.x = scene.width / 2
position.y = scene.height - 100

const update = () => {

    const maxVelocity = 400

    if (keyboard.downKeys.has('ArrowLeft')) {
        velocity.x = -maxVelocity
    } else if (keyboard.downKeys.has('ArrowRight')) {
        velocity.x = maxVelocity
    } else {
        velocity.x = 0
    }

    if (keyboard.downKeys.has('ArrowUp')) {
        velocity.y = -maxVelocity
    } else if (keyboard.downKeys.has('ArrowDown')) {
        velocity.y = maxVelocity
    } else {
        velocity.y = 0
    }

    if (keyboard.downKeys.has(' ')) {
        if (scene.frame % 10 === 0) {
            fire()
        }
    }

    const dt = 1 / 60
    position.x += velocity.x * dt
    position.y += velocity.y * dt
    scene.clampPosition(position)

    div.style.transform = `translate(${position.x}px, ${position.y}px)`
    divCore.style.backgroundColor = (scene.frame % 30) < 15 ? colors.BLUE : colors.YELLOW

    for (const particle of particles.particles) {
        if (particle.type === 'basic') {
            const particleIsBlueOrYellow = particle.color === colors.BLUE || particle.color === colors.YELLOW
            if (particleIsBlueOrYellow) {
                const tolerance = 0.9
                const distanceMin = (radius + particle.radius) * tolerance
                if (distance(particle.position, position) < distanceMin) {
                    gameover(particle)
                }
            }
        }
    }
}

const fire = () => {
    return particles.create({ 
        color: colors.RED,
        positionX: position.x,
        positionY: position.y - (radius + 14 + 1),
        velocityX: 0,
        velocityY: -400,
    })
}

scene.onUpdate.add(update)

export {
    position,
    velocity,
    fire,
    update,
}