import * as colors from '../colors.js'
import * as scene from '../core/scene.js'
import * as circles from '../core/circles.js'

const initialPosition = {
    x: scene.width - 200,
    y:  scene.height - 75,
}

const movingBlue = circles.create({
    name: 'blue',
    color: colors.BLUE,
    collideWith: [colors.BLUE],
    radius: 150,
    positionX: initialPosition.x,
    positionY: initialPosition.y,
})

movingBlue.onCollision.add(particle => {
    movingBlue.fireToward(particle.position, colors.YELLOW)
})

movingBlue.onUpdate.add(() => {
    movingBlue.position.x = initialPosition.x + Math.sin(scene.time) * 50
    movingBlue.position.y = initialPosition.y - Math.sin(scene.time) * 50
})
