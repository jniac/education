import * as scene from './scene.js'

const particles = new Set()

// "une fonction pour les contrôler tous"
// à la différence de player.js, 'update()' met à jour plusieurs particules
const updateAll = () => {

    for (const particle of particles) {
        
        if (particle.div.parentElement === null) {
            scene.div.append(particle.div)
        }

        particle.update()
    }
}

scene.onUpdate.add(updateAll)

const create = ({ 
    type = 'basic',
    radius = 14,
    positionX = 0, 
    positionY = 0,
    velocityX = 0, 
    velocityY = 0,
    color = 'black',
} = {}) => {

    const div = document.createElement('div')
    div.classList.add('particle')
    div.classList.add(type)
    div.style.setProperty('background-color', color)
    div.style.setProperty('--radius', `${radius}px`)
    
    const position = { x:positionX, y:positionY }
    const velocity = { x:velocityX, y:velocityY }

    const onUpdate = new Set()
    const update = () => {

        const dt = 1 / 60
        position.x += velocity.x * dt
        position.y += velocity.y * dt
    
        for (const callback of onUpdate) {
            callback()
        }

        div.style.transform = `translate(${position.x}px, ${position.y}px)`

        if (scene.isOutside(position)) {
            destroy()
        }
    }

    const onDestroy = new Set()
    const destroy = () => {
        for (const callback of onDestroy) {
            callback()
        }
        div.remove()
        particles.delete(particle)
    }

    const particle = {
        type,
        color,
        radius,
        position,
        velocity,
        div,
        update,
        onUpdate,
        destroy,
        onDestroy,
    }

    particles.add(particle)

    return particle
}

export {
    create,
    updateAll,
    particles,
}