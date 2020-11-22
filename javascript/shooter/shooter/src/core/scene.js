
const width = 1000
const height = 600

let frame = 0
let time = 0

const div = document.querySelector('div#scene')
div.style.width = `${width}px`
div.style.height = `${height}px`

let paused = false
const pause = () => paused = true
const play = () => paused = false

const onUpdate = new Set()
const onUpdateAddOnce = (callback) => {
    const callbackWrapper = () => {
        onUpdate.delete(callbackWrapper)
        callback()
    }
    onUpdate.add(callbackWrapper)
}

const update = () => {

    requestAnimationFrame(update)

    if (paused === false) {

        for (const callback of onUpdate) {
            callback()
        }
        
        time += 1 / 60
        frame++
    }
}

update()

const isOutside = (position) => {
    return (
        position.x < 0 || 
        position.y < 0 ||
        position.x > width ||
        position.y > height
    )
}

const clamp = (x, min, max) => x < min ? min : x > max ? max : x

const clampPosition = (position) => {
    position.x = clamp(position.x, 0, width)
    position.y = clamp(position.y, 0, height)
}

export {
    width,
    height,
    div,
    frame,
    time,
    onUpdate,
    onUpdateAddOnce,
    play,
    pause,
    isOutside,
    clampPosition,
}