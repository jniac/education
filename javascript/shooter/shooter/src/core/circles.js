import * as particles from './particles.js'
import { distance, normalize, subtract } from './geom.js'

const create = ({ 
    name = 'red',
    radius = 100,
    positionX = 0, 
    positionY = 0,
    color = '#d6001d',
    life = 100,
    collideWith = [],
} = {}) => {

    const innerParticle = particles.create({
        type : 'circle',
        radius,
        positionX,
        positionY,
        color,
    })

    innerParticle.div.classList.add(name)
    innerParticle.div.innerHTML = /* html */`
        <div class="name">${name}</div>
        <div class="life">${life}</div>
    `

    /**
     * @param {{ x:number, y:number }} target 
     * @param {string} color 
     */
    const fire = (direction, color) => {

        if (!direction || ('x' in direction && 'y' in direction) === false) {
            throw new Error(`invalid direction!`)
        }

        const distance = radius + 14 + 1
        const positionX = innerParticle.position.x + direction.x * distance
        const positionY = innerParticle.position.y + direction.y * distance
        const velocityX = direction.x * 250
        const velocityY = direction.y * 250
        return particles.create({
            color,
            positionX,
            positionY,
            velocityX,
            velocityY,
        })
    }

    /**
     * @param {{ x:number, y:number }} target 
     * @param {string} color 
     */
    const fireToward = (target, color) => {

        if (!target || ('x' in target && 'y' in target) === false) {
            throw new Error(`invalid target!`)
        }

        const v = subtract(innerParticle.position, target)
        const direction = normalize(v)
        fire(direction, color)
    }
    
    const onCollision = new Set()
    const collide = (particle) => {

        particle.destroy()

        life += -1
        innerParticle.div.querySelector('div.life').innerHTML = life
        
        if (life === 0) {
            innerParticle.destroy()
            return
        }
        
        for (const callback of onCollision) {
            callback(particle)
        }
    }

    const update = () => {
        for (const particle of particles.particles) {
            if (particle.type === 'basic' && collideWith.includes(particle.color)) {
                const collisionDistance = radius + particle.radius
                if (distance(innerParticle.position, particle.position) < collisionDistance) {
                    collide(particle)
                }
            }
        }
    }

    innerParticle.onUpdate.add(update)

    const circle = {
        ...innerParticle,
        onCollision,
        fire,
        fireToward,
    }

    return circle
}

export {
    create,
}