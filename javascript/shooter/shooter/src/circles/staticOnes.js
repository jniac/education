import * as scene from '../core/scene.js'
import * as colors from '../colors.js'
import * as circles from '../core/circles.js'

const red1 = circles.create({
    name: 'red',
    color: colors.RED,
    life: 1000,
    radius: 250,
    positionX: 125,
    positionY: 75,
    collideWith: [colors.RED],
})

red1.onCollision.add(particle => {
    red1.fireToward(particle.position, colors.BLUE)
})



const red2 = circles.create({
    name: 'red',
    color: colors.RED,
    life: 20,
    radius: 100,
    positionX: scene.width * 0.48,
    positionY: scene.height * 0.38,
    collideWith: [colors.RED],
})

red2.onCollision.add(particle => {
    red2.fireToward(particle.position, colors.BLUE)
})



const blue = circles.create({
    name: 'blue',
    color: colors.BLUE,
    radius: 150,
    positionX: scene.width * .92,
    positionY: scene.height * 0.25,
    collideWith: [colors.BLUE],
})

blue.onCollision.add(particle => {
    blue.fireToward(particle.position, colors.YELLOW,)
})



circles.create({
    name: 'black',
    color: 'black',
    life: 20,
    radius: 80,
    positionX: scene.width * 0.33,
    positionY: scene.height * 0.62,
    collideWith: [colors.RED, colors.BLUE, colors.YELLOW]
})



circles.create({
    name: 'black',
    color: 'black',
    life: 20,
    radius: 80,
    positionX: scene.width * 0.68,
    positionY: scene.height * 0.48,
    collideWith: [colors.RED, colors.BLUE, colors.YELLOW]
})
